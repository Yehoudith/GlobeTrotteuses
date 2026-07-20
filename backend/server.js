
import express from "express";
import { db } from "./src/db.js";

import Tasksrouter from './src/routes/tasksRoutes.js'

import travelRouter from "./src/routes/travel.js";
import cors from 'cors';



const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/tasks', Tasksrouter);


app.use(cors()) 



app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.get("/test-db", async (req, res) => {
  const result = await db.query("SELECT NOW()");
  res.json(result.rows[0]);
});

// routes travels
app.use("/travel", travelRouter)


app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);


});