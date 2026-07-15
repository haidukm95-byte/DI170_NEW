-- Reference/lookup tables must be created first (no FK dependencies)

CREATE TABLE IF NOT EXISTS operation_codes (
    operation_code INTEGER PRIMARY KEY,
    operation_name TEXT NOT NULL
);

INSERT INTO operation_codes (operation_code, operation_name) VALUES
    (10, 'RECEIVED FROM THE OUTSIDE SUPPLIER'),
    (11, 'REFUSED RECEIVING BY INCOMPATIBILITY'),
    (12, 'REFUSED RECEIVING BY EXPIRY'),
    (13, 'REFUSED RECEIVING BY DAMAGE'),
    (14, 'REFUSED RECEIVING BY HAZARD'),
    (20, 'DEPARTED'),
    (21, 'DEPARTURE RETURNED BY INCOMPATIBILITY'),
    (22, 'DEPARTURE RETURNED BY EXPIRY'),
    (23, 'DEPARTURE RETURNED BY DAMAGE'),
    (24, 'DEPARTURE RETURNED BY HAZARD'),
    (32, 'UTILIZED BY EXPIRY'),
    (33, 'UTILIZED BY DAMAGE'),
    (34, 'UTILIZED BY HAZARD'),
    (35, 'UTILIZED BY THEFT'),
    (36, 'UTILIZED BY OTHER REASON (EXPLANATION MANDATORY!)')
ON CONFLICT (operation_code) DO NOTHING;

REVOKE ALL ON operation_codes FROM PUBLIC;
GRANT SELECT ON operation_codes TO PUBLIC;

CREATE TABLE IF NOT EXISTS occupation_codes (
    occupation_code INTEGER PRIMARY KEY,
    occupation_name TEXT NOT NULL,
    auth_receive BOOLEAN NOT NULL,
    auth_edit_personnel BOOLEAN NOT NULL,
    auth_edit_goods_registry BOOLEAN NOT NULL
);

INSERT INTO occupation_codes (occupation_code, occupation_name, auth_receive, auth_edit_personnel, auth_edit_goods_registry) VALUES
    (1, 'Manager', true, true, true),
    (2, 'Receiver', true, false, false),
    (3, 'General worker', false, false, false)
ON CONFLICT (occupation_code) DO NOTHING;

-- Master goods registry

CREATE TABLE IF NOT EXISTS goods_registry (
    code INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    is_food BOOLEAN NOT NULL,
    measuring_unit TEXT NOT NULL,
    CONSTRAINT chk_code_6digit CHECK (code BETWEEN 100000 AND 999999)
);

-- Inventory tables

CREATE TABLE IF NOT EXISTS foods_inventory (
    code INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    measuring_unit TEXT NOT NULL,
    quantity NUMERIC(12,3) NOT NULL DEFAULT 0,
    FOREIGN KEY (code) REFERENCES goods_registry(code),
    CONSTRAINT chk_code_6digit CHECK (code BETWEEN 100000 AND 999999)
);

CREATE TABLE IF NOT EXISTS general_inventory (
    code INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    measuring_unit TEXT NOT NULL,
    quantity NUMERIC(12,3) NOT NULL DEFAULT 0,
    FOREIGN KEY (code) REFERENCES goods_registry(code),
    CONSTRAINT chk_code_6digit CHECK (code BETWEEN 100000 AND 999999)
);

-- Personnel depends on occupation_codes

CREATE TABLE IF NOT EXISTS personnel (
    personnel_id SERIAL PRIMARY KEY,
    gov_id INTEGER NOT NULL,
    full_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    occupation_code INTEGER NOT NULL,
    isActive BOOLEAN NOT NULL DEFAULT true,
    working_start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    working_end_date DATE,
    auth_receive BOOLEAN NOT NULL,
    auth_edit_personnel BOOLEAN NOT NULL,
    auth_edit_goods_registry BOOLEAN NOT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (occupation_code) REFERENCES occupation_codes(occupation_code)
);

-- Refresh token sessions, one row per issued refresh token, depends on personnel

CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id UUID PRIMARY KEY,
    personnel_id INTEGER NOT NULL,
    revoked BOOLEAN NOT NULL DEFAULT false,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (personnel_id) REFERENCES personnel(personnel_id)
);

-- Logistics depends on goods_registry, operation_codes, and personnel

CREATE TABLE IF NOT EXISTS logistics (
    operation_id SERIAL PRIMARY KEY,
    code INTEGER NOT NULL,
    name TEXT NOT NULL,
    is_food BOOLEAN NOT NULL,
    measuring_unit TEXT NOT NULL,
    quantity NUMERIC(12,3) NOT NULL,
    operation_code INTEGER NOT NULL,
    operation_name TEXT NOT NULL,
    report_id SERIAL,
    report TEXT,
    responsible_id INTEGER NOT NULL,
    date_and_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (code) REFERENCES goods_registry(code),
    FOREIGN KEY (operation_code) REFERENCES operation_codes(operation_code),
    FOREIGN KEY (responsible_id) REFERENCES personnel(personnel_id),
    CONSTRAINT chk_code_6digit CHECK (code BETWEEN 100000 AND 999999)
);

-- -------------------------------------------------------
-- TRIGGER: block duplicate code in goods_registry
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION check_goods_registry_duplicate()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM goods_registry WHERE code = NEW.code) THEN
        RAISE EXCEPTION 'Item already exists!';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_goods_registry_insert
BEFORE INSERT ON goods_registry
FOR EACH ROW EXECUTE FUNCTION check_goods_registry_duplicate();

-- -------------------------------------------------------
-- TRIGGER: block unauthorized personnel from receiving operations (10-14)
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION check_receive_authorization()
RETURNS TRIGGER AS $$
DECLARE
    v_auth_receive BOOLEAN;
BEGIN
    IF NEW.operation_code BETWEEN 10 AND 14 THEN
        SELECT auth_receive INTO v_auth_receive
        FROM personnel
        WHERE personnel_id = NEW.responsible_id;

        IF v_auth_receive = FALSE THEN
            RAISE EXCEPTION 'Personnel % is not authorized to perform receiving operations', NEW.responsible_id;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_check_auth
BEFORE INSERT ON logistics
FOR EACH ROW EXECUTE FUNCTION check_receive_authorization();

-- -------------------------------------------------------
-- TRIGGER: verify code exists in goods_registry before insert
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION check_goods_registry_exists()
RETURNS TRIGGER AS $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM goods_registry WHERE code = NEW.code) THEN
        RAISE EXCEPTION 'Item does not exist in registry';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_check_registry
BEFORE INSERT ON logistics
FOR EACH ROW EXECUTE FUNCTION check_goods_registry_exists();

-- -------------------------------------------------------
-- TRIGGER: auto-fill is_food, name, measuring_unit from goods_registry
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION fill_logistics_goods_info()
RETURNS TRIGGER AS $$
BEGIN
    SELECT is_food, name, measuring_unit
    INTO NEW.is_food, NEW.name, NEW.measuring_unit
    FROM goods_registry
    WHERE code = NEW.code;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_set_goods_info
BEFORE INSERT OR UPDATE OF code ON logistics
FOR EACH ROW EXECUTE FUNCTION fill_logistics_goods_info();

-- -------------------------------------------------------
-- TRIGGER: auto-fill operation_name from operation_codes
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION fill_logistics_operation_name()
RETURNS TRIGGER AS $$
BEGIN
    SELECT operation_name INTO NEW.operation_name
    FROM operation_codes
    WHERE operation_code = NEW.operation_code;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_set_operation_name
BEFORE INSERT OR UPDATE OF operation_code ON logistics
FOR EACH ROW EXECUTE FUNCTION fill_logistics_operation_name();

-- -------------------------------------------------------
-- TRIGGER 1: update inventory tables after a logistics insert
-- -------------------------------------------------------
-- operation 10             → insert item or increment quantity
-- operations 20, 32-36     → decrement quantity
-- operations 11-14, 21-24  → no change (refused/returned, goods never moved)

CREATE OR REPLACE FUNCTION handle_logistics_operation()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.is_food = TRUE THEN

        IF NEW.operation_code = 10 THEN
            INSERT INTO foods_inventory (code, name, measuring_unit, quantity)
            VALUES (NEW.code, NEW.name, NEW.measuring_unit, NEW.quantity)
            ON CONFLICT (code) DO UPDATE
                SET quantity = foods_inventory.quantity + NEW.quantity;

        ELSIF NEW.operation_code = 20 OR NEW.operation_code BETWEEN 32 AND 36 THEN
            UPDATE foods_inventory SET quantity = quantity - NEW.quantity WHERE code = NEW.code;
        END IF;

    ELSE

        IF NEW.operation_code = 10 THEN
            INSERT INTO general_inventory (code, name, measuring_unit, quantity)
            VALUES (NEW.code, NEW.name, NEW.measuring_unit, NEW.quantity)
            ON CONFLICT (code) DO UPDATE
                SET quantity = general_inventory.quantity + NEW.quantity;

        ELSIF NEW.operation_code = 20 OR NEW.operation_code BETWEEN 32 AND 36 THEN
            UPDATE general_inventory SET quantity = quantity - NEW.quantity WHERE code = NEW.code;
        END IF;

    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER after_logistics_insert
AFTER INSERT ON logistics
FOR EACH ROW EXECUTE FUNCTION handle_logistics_operation();

-- -------------------------------------------------------
-- TRIGGER 2: remove item from inventory when quantity = 0
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION remove_if_zero_quantity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity <= 0 THEN
        IF TG_TABLE_NAME = 'foods_inventory' THEN
            DELETE FROM foods_inventory WHERE code = NEW.code;
        ELSIF TG_TABLE_NAME = 'general_inventory' THEN
            DELETE FROM general_inventory WHERE code = NEW.code;
        END IF;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_zero_quantity_food
AFTER UPDATE OF quantity ON foods_inventory
FOR EACH ROW EXECUTE FUNCTION remove_if_zero_quantity();

CREATE OR REPLACE TRIGGER check_zero_quantity_general
AFTER UPDATE OF quantity ON general_inventory
FOR EACH ROW EXECUTE FUNCTION remove_if_zero_quantity();

-- -------------------------------------------------------
-- TRIGGER: auto-fill auth columns in personnel from occupation_codes
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION fill_personnel_auth()
RETURNS TRIGGER AS $$
BEGIN
    SELECT auth_receive, auth_edit_personnel, auth_edit_goods_registry
    INTO NEW.auth_receive, NEW.auth_edit_personnel, NEW.auth_edit_goods_registry
    FROM occupation_codes
    WHERE occupation_code = NEW.occupation_code;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'occupation_code % does not exist', NEW.occupation_code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_personnel_set_auth
BEFORE INSERT OR UPDATE OF occupation_code ON personnel
FOR EACH ROW EXECUTE FUNCTION fill_personnel_auth();

-- -------------------------------------------------------
-- TRIGGER: block occupation_code=3 from receiving operations (10-14)
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION check_general_worker_receive_restriction()
RETURNS TRIGGER AS $$
DECLARE
    v_occupation_code INTEGER;
BEGIN
    IF NEW.operation_code BETWEEN 10 AND 14 THEN
        SELECT occupation_code INTO v_occupation_code
        FROM personnel
        WHERE personnel_id = NEW.responsible_id;

        IF v_occupation_code = 3 THEN
            RAISE EXCEPTION 'General workers (occupation_code=3) are not authorized to perform receiving operations';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_check_general_worker_restriction
BEFORE INSERT ON logistics
FOR EACH ROW EXECUTE FUNCTION check_general_worker_receive_restriction();

-- -------------------------------------------------------
-- TRIGGER: block negative quantity on logistics insert/update
-- -------------------------------------------------------

CREATE OR REPLACE FUNCTION check_non_negative_quantity()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.quantity < 0 THEN
        RAISE EXCEPTION 'Quantity cannot be negative. Value: %', NEW.quantity;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER check_logistics_quantity
BEFORE INSERT OR UPDATE OF quantity ON logistics
FOR EACH ROW EXECUTE FUNCTION check_non_negative_quantity();

-- -------------------------------------------------------
-- TRIGGER: block departure (operation_code=20) if amount exceeds
-- available inventory, or the item isn't present in inventory
-- (quantity = 0 or no inventory row exists)
-- -------------------------------------------------------
-- is_food is looked up directly from goods_registry (not NEW.is_food)
-- since trigger firing order is alphabetical and this must not depend
-- on before_logistics_set_goods_info having run first.

CREATE OR REPLACE FUNCTION check_departure_availability()
RETURNS TRIGGER AS $$
DECLARE
    v_is_food BOOLEAN;
    v_quantity NUMERIC(12,3);
BEGIN
    IF NEW.operation_code = 20 THEN
        SELECT is_food INTO v_is_food
        FROM goods_registry
        WHERE code = NEW.code;

        IF NOT FOUND THEN
            RAISE EXCEPTION 'Item % does not exist in goods registry', NEW.code;
        END IF;

        IF v_is_food THEN
            SELECT quantity INTO v_quantity FROM foods_inventory WHERE code = NEW.code;
        ELSE
            SELECT quantity INTO v_quantity FROM general_inventory WHERE code = NEW.code;
        END IF;


        IF v_quantity IS NULL OR v_quantity = 0 THEN
            RAISE EXCEPTION 'Item % is not present in inventory (quantity is zero or does not exist)', NEW.code;
        END IF;

        IF NEW.quantity > v_quantity THEN
            RAISE EXCEPTION 'Departure quantity % exceeds available inventory quantity % for item %', NEW.quantity, v_quantity, NEW.code;
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER before_logistics_check_departure_availability
BEFORE INSERT ON logistics
FOR EACH ROW EXECUTE FUNCTION check_departure_availability();

-- -------------------------------------------------------
-- TRIGGER: propagate goods_registry edits (name/is_food/measuring_unit)
-- to foods_inventory, general_inventory and logistics
-- -------------------------------------------------------
-- name/measuring_unit changes: overwrite the denormalized copies
-- is_food flips: move the inventory row between foods_inventory <-> general_inventory

CREATE OR REPLACE FUNCTION propagate_goods_registry_update()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE logistics
    SET name = NEW.name,
        is_food = NEW.is_food,
        measuring_unit = NEW.measuring_unit
    WHERE code = NEW.code;

    IF OLD.is_food = NEW.is_food THEN
        IF NEW.is_food THEN
            UPDATE foods_inventory
            SET name = NEW.name, measuring_unit = NEW.measuring_unit
            WHERE code = NEW.code;
        ELSE
            UPDATE general_inventory
            SET name = NEW.name, measuring_unit = NEW.measuring_unit
            WHERE code = NEW.code;
        END IF;
    ELSIF OLD.is_food THEN
        INSERT INTO general_inventory (code, name, measuring_unit, quantity)
        SELECT code, NEW.name, NEW.measuring_unit, quantity
        FROM foods_inventory WHERE code = NEW.code
        ON CONFLICT (code) DO UPDATE
            SET quantity = general_inventory.quantity + EXCLUDED.quantity,
                name = EXCLUDED.name,
                measuring_unit = EXCLUDED.measuring_unit;
        DELETE FROM foods_inventory WHERE code = NEW.code;
    ELSE
        INSERT INTO foods_inventory (code, name, measuring_unit, quantity)
        SELECT code, NEW.name, NEW.measuring_unit, quantity
        FROM general_inventory WHERE code = NEW.code
        ON CONFLICT (code) DO UPDATE
            SET quantity = foods_inventory.quantity + EXCLUDED.quantity,
                name = EXCLUDED.name,
                measuring_unit = EXCLUDED.measuring_unit;
        DELETE FROM general_inventory WHERE code = NEW.code;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER after_goods_registry_update
AFTER UPDATE OF name, is_food, measuring_unit ON goods_registry
FOR EACH ROW EXECUTE FUNCTION propagate_goods_registry_update();
