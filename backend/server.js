
import express from "express";
import { db } from "./db.js";
import tasksRoutes from './src/routes/tasksRoutes.js'

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/tasks', tasksRoutes);

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.get("/test-db", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json(result.rows[0]);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});