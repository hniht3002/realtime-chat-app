import express from 'express';
import { configDotenv } from 'dotenv';
import authRoutes from "./routes/auth.routes.js"

const app = express();

configDotenv()
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Ready")
})

app.use("/api/auth", authRoutes)

app.listen(PORT, () => {
    console.log("Server is running at port " + PORT)
})