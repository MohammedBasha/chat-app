import express from "express";
import dotenv from "dotenv";

const app = express();

// load environment variables
dotenv.config();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
    // root route http://localhost:${PORT}/
    res.send("Hello, World!!");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
