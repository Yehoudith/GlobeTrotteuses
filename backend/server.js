import express from "express";
import { db } from "./db.js";
import travelRouter from "./src/routes/travel.js";
import usersRoutes from "./src/routes/users.js";

const app = express();
const PORT = 3000;

// dotenv.config();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.get("/test-db", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json(result.rows[0]);
});

// routes travels
app.use("travel/", travelRouter)

// routes users
app.use("/Users", usersRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});