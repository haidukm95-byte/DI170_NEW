CREATE DATABASE Weather_tracker;

CREATE TABLE history(
	location_id INTEGER NOT NULL,
	city VARCHAR(100) NOT NULL,
	country VARCHAR(200) NOT NULL,
	date_of_query DATE NOT NULL,
	temperature_C SMALLINT NOT NULL,
	min_temperature_C SMALLINT NOT NULL, 
	max_temperature_C SMALLINT NOT NULL,
	humidity_percent INTEGER NOT NULL,
	atm_pressure_mbar INTEGER NOT NULL,
	wind_azimuth INTEGER NOT NULL,
	wind_dir VARCHAR(15) NOT NULL,
	wind_speed_m_s INTEGER NOT NULL,
	cloudiness_rate INTEGER NOT NULL,
	visibility_m INTEGER NOT NULL
);

CREATE TABLE favorites(
    location_id INTEGER NOT NULL,
	city VARCHAR(100) NOT NULL,
	country VARCHAR(200) NOT NULL
);
