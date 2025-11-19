import mongoose from 'mongoose';
import { describe, it, beforeAll, afterAll, afterEach, expect } from 'vitest';
import request from "supertest";
import app from "../../../app.js";
import User from '../../auth/v2/auth.model.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

describe("/api/profile/update-info", () => {

    beforeAll(async () => {
        try 
        {
            if (process.env.NODE_ENV === "test")
            {
                await mongoose.connect(process.env.MONGO_URI);
                console.log("Connected to production database `" + process.env.MONGO_URI + "`. Ready for testing!");
            }
            else
            {
                await mongoose.connect("mongodb://mongo:27017/test");
                console.log("Connected to test database `mongodb://mongo:27017/test`. Ready for testing!");
            }
        } 
        catch (error) 
        {
            console.error(error);
            process.exit(1);
        }

        await User.deleteMany();

        /* Direct database insert */
        const user = await User.create({
            first_name: "John",
            last_name: "Doe",
            email: "johndoe@example.com",
            password: await bcrypt.hash("password123", 10)
        });
    });

    afterAll(async () => {
            await User.deleteMany();
    });

    it("Update Profile \| First Name Updated Successfully \(ok\)", async () => {
        const user = await User.findOne({ email: "johndoe@example.com" });

        const login_response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(login_response.statusCode).toBe(200);

        const session_token = jwt.sign(
            { type: "session-token", user: { _id: user._id, email: user.email } },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );
        
        const cookie = "nanta-session=" + session_token;

        const update_response = await request(app)
        .put("/api/profile/update-info")
        .send({
            first_name : "NewFirst"
        })
        .set("Cookie", cookie);

        expect(update_response.statusCode).toBe(200);
        expect("First name updated successfully!");
    });

    it("Update Profile \| Multiple Fields Updated Successfully \(ok\)", async () => {
        const user = await User.findOne({ email: "johndoe@example.com" });

        const login_response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(login_response.statusCode).toBe(200);

        const session_token = jwt.sign(
            { type: "session-token", user: { _id: user._id, email: user.email } },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );
        
        const cookie = "nanta-session=" + session_token;

        const update_response = await request(app)
        .put("/api/profile/update-info")
        .send({
            first_name : "NewFirst",
            last_name : "NewLast"
        })
        .set("Cookie", cookie);

        expect(update_response.statusCode).toBe(200);
        expect("Multiple fields updated successfully!");
    });

    it("Update Profile \| Password Updated Successfully \(ok\)", async () => {
        const user = await User.findOne({ email: "johndoe@example.com" });

        const login_response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "johndoe@example.com",
            password: "password123",
        });

        expect(login_response.statusCode).toBe(200);

        const session_token = jwt.sign(
            { type: "session-token", user: { _id: user._id, email: user.email } },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );
        
        const cookie = "nanta-session=" + session_token;

        const update_response = await request(app)
        .put("/api/profile/update-info")
        .send({
            password : "new_awesome_password",
            old_password : "password123"
        })
        .set("Cookie", cookie);

        expect(update_response.statusCode).toBe(200);
        expect("Password updated successfully!");
    });

    it("Update Profile \| Duplicate Email Rejected \(err\)", async () => {
        const user = await User.findOne({ email: "johndoe@example.com" });

        /* Direct database insert */
        const dupe = await User.create({
            first_name: "Duplicate",
            last_name: "Guy",
            email: "existing@example.com",
            password: await bcrypt.hash("password123", 10)
        });

        const login_response = await request(app)
        .post("/api/auth/login")
        .send({
            email: "johndoe@example.com",
            password: "new_awesome_password",
        });
        // console.log(login_response.body);
        expect(login_response.statusCode).toBe(200);

        const session_token = jwt.sign(
            { type: "session-token", user: { _id: user._id, email: user.email } },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );
        
        const cookie = "nanta-session=" + session_token;

        const update_response = await request(app)
        .put("/api/profile/update-info")
        .send({
            email : "existing@example.com"
        })
        .set("Cookie", cookie);

        expect(update_response.statusCode).toBe(409);
        expect("Invalid email detected!");
    });
})