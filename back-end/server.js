import express from 'express';
import { configDotenv } from 'dotenv';
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"
import connectToMongoDb from './db/connectToMongoDB.js';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)
app.get("/", (req, res) => {
    res.send("404 error");
})


app.listen(PORT, () => {
    connectToMongoDb()
        .then(() => {
            console.log("Server is running at port " + PORT)
        })
})