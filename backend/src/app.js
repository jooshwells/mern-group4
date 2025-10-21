import express from "express";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

// Middleware Imports
import cookieParser from "cookie-parser";
// import helmet from "helmet";

// Route Imports
import { auth_routes } from "./modules/auth/v2/auth.index.js";

const app = express();

// Middleware for parsing cookies attached to request object.
app.use(cookieParser());

// Middleware for enhancing security by setting various HTTP headers.
// app.use(helmet());

// Middleware for parsing JSON data attached to request object.
app.use(express.json());

// Routes
app.use("/api/auth", auth_routes);

// 404 response
app.use((req, res) => {
    return res.status(404).json({
        message: "Not found",
        ok: false   
    });
});

// Custom error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something broke!");
});

export default app;
