import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import bcrypt from "bcryptjs";
import { pool } from "./config/usersdb.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "data")));

// POST /api/check-user
// Body: { username: string }  (can be a username or email)
// Returns: { exists: boolean }
app.post("/api/check-user", async (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ error: "username is required" });

  try {
    const result = await pool.query(
      "SELECT uid, username, password FROM users WHERE username = $1 OR email = $1",
      [username],
    );
    if (result.rows.length === 0) return res.json({ exists: false });

    const match = await bcrypt.compare(password, result.rows[0].password);
    if (!match) return res.json({ exists: true, passwordWrong: true });

    res.json({
      exists: true,
      passwordWrong: false,
      username: result.rows[0].username,
      uid: result.rows[0].uid,
    });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/check-signup
// Body: { username: string, email: string }
// Returns: { usernameTaken: boolean, emailTaken: boolean }
app.post("/api/check-signup", async (req, res) => {
  const { username, email } = req.body;
  if (!username || !email)
    return res.status(400).json({ error: "username and email are required" });

  try {
    const [usernameResult, emailResult] = await Promise.all([
      pool.query("SELECT uid FROM users WHERE username = $1", [username]),
      pool.query("SELECT uid FROM users WHERE email = $1", [email]),
    ]);
    res.json({
      usernameTaken: usernameResult.rows.length > 0,
      emailTaken: emailResult.rows.length > 0,
    });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/create-user
// Body: { username: string, email: string, password: string }
// Returns: 201 on success
app.post("/api/create-user", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res
      .status(400)
      .json({ error: "username, email and password are required" });

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING uid, username",
      [username, email, passwordHash],
    );
    res.status(201).json({
      created: true,
      uid: result.rows[0].uid,
      username: result.rows[0].username,
    });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// GET /api/tasks/:useruid — load all tasks for a user
app.get("/api/tasks/:useruid", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users_tasks WHERE useruid = $1 ORDER BY taskuid",
      [req.params.useruid],
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// POST /api/tasks — create a new task
app.post("/api/tasks", async (req, res) => {
  const { useruid, task, datetime } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users_tasks (useruid, task, datetime, isdone) VALUES ($1, $2, $3, false) RETURNING taskuid",
      [useruid, task, datetime || null],
    );
    res.status(201).json({ taskuid: result.rows[0].taskuid });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// PATCH /api/tasks/:taskuid — toggle isdone
app.patch("/api/tasks/:taskuid", async (req, res) => {
  const { isdone } = req.body;
  try {
    await pool.query("UPDATE users_tasks SET isdone = $1 WHERE taskuid = $2", [
      isdone,
      req.params.taskuid,
    ]);
    res.json({ updated: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE /api/tasks/:taskuid — remove a task
app.delete("/api/tasks/:taskuid", async (req, res) => {
  try {
    await pool.query("DELETE FROM users_tasks WHERE taskuid = $1", [
      req.params.taskuid,
    ]);
    res.json({ deleted: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// GET /api/user/:useruid — get current user info
app.get("/api/user/:useruid", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT username, email FROM users WHERE uid = $1",
      [req.params.useruid],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// PATCH /api/user/username — change username
app.patch("/api/user/username", async (req, res) => {
  const { useruid, username } = req.body;
  try {
    const taken = await pool.query(
      "SELECT uid FROM users WHERE username = $1 AND uid != $2",
      [username, useruid],
    );
    if (taken.rows.length > 0)
      return res.status(409).json({ error: "Username already taken" });
    await pool.query("UPDATE users SET username = $1 WHERE uid = $2", [
      username,
      useruid,
    ]);
    res.json({ updated: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// PATCH /api/user/email — change email
app.patch("/api/user/email", async (req, res) => {
  const { useruid, email } = req.body;
  try {
    const taken = await pool.query(
      "SELECT uid FROM users WHERE email = $1 AND uid != $2",
      [email, useruid],
    );
    if (taken.rows.length > 0)
      return res.status(409).json({ error: "Email already registered" });
    await pool.query("UPDATE users SET email = $1 WHERE uid = $2", [
      email,
      useruid,
    ]);
    res.json({ updated: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// PATCH /api/user/password — change password
app.patch("/api/user/password", async (req, res) => {
  const { useruid, currentPassword, newPassword } = req.body;
  try {
    const result = await pool.query(
      "SELECT password FROM users WHERE uid = $1",
      [useruid],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    const match = await bcrypt.compare(
      currentPassword,
      result.rows[0].password,
    );
    if (!match)
      return res.status(401).json({ error: "Current password is incorrect" });
    const hash = await bcrypt.hash(newPassword, 10);
    await pool.query("UPDATE users SET password = $1 WHERE uid = $2", [
      hash,
      useruid,
    ]);
    res.json({ updated: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

// DELETE /api/user — delete account and all tasks
app.delete("/api/user", async (req, res) => {
  const { useruid, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT password FROM users WHERE uid = $1",
      [useruid],
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "User not found" });
    const match = await bcrypt.compare(password, result.rows[0].password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });
    await pool.query("DELETE FROM users_tasks WHERE useruid = $1", [useruid]);
    await pool.query("DELETE FROM users WHERE uid = $1", [useruid]);
    res.json({ deleted: true });
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
