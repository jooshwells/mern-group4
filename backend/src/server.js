import { auth_routes } from "./modules/auth/index.js";
import connect_database from "./config/database.js";
import { normalize_response, normalize_system_error_response, normalize_response_404 } from "./custom.middleware.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import helmet from "helmet";

import express from "express";
const app = express()
const port = process.env.PORT || 8080;

app.use(cookieParser());

app.use(normalize_response);

app.use(helmet());
app.use(express.json());

app.get("/", (request, response) => {
  response.send("Hello World!");
});

app.use("/api/auth", auth_routes);

app.use(normalize_response_404);

if (process.env.NODE_ENV === 'production') {
    app.use(normalize_system_error_response);
}

const start_server = async () => {
    await connect_database();

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

start_server();