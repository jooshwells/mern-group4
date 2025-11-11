import bcrypt from "bcryptjs";
import User from "./auth.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import ejs from "ejs";
import fs from "fs";
import { normalize_system_error_response } from "../../../custom.middleware.js";

/**
 * @Precondition
 * The request body contains a JSON object with validated registration fields:
 * - first_name
 * - last_name
 * - email
 * - password
 * 
 * These fields have already passed validation via `validate_registration_input`.
 * 
 * @Condition
 * - Hashes the password using bcrypt with a salt round of 10.
 * - Creates a new User document with the registration field inputs and the hashed password.
 * - Saves the user to the database.
 * - Sends a verification email to the registered email address.
 * 
 * @Postcondition   
 * - A new user is persisted in the database with a hashed password.
 * - A verification email is sent.
 * - Responds with status `200` and a success message on success.
 * - If an error occurs, the error is passed to the error-handling middleware.
*/
export const register_user = async (req, res, next) => {
    try {
        const { first_name, last_name, email, password } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const user = new User({ first_name, last_name, email, password: hash });
        user.verification_token = jwt.sign(
            { type: "email-verification-token", user: { _id: user._id, email: user.email } }, 
            process.env.JWT_SECRET, 
            {expiresIn: '12h'}
        );
        await user.save();
        req.body.user = user;
        
        if (process.env.NODE_ENV != "test")
            await send_verification_email(req, res, next);
        
        
        return res.status(200).send("User registered successfully!");
    } catch (err) {
        next(err);
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const login_user = (req, res) => {
    try {
        const { user } = req.body; 
        const session_token = jwt.sign(
            { type: "session-token", user: { _id: user._id, email: user.email } },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        initialize_session_cookie(req, res, session_token);
        // console.log(res);
        return res.status(200).send("User logged in successfully!");
    } catch (error) {
        
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const logout_user = (req, res) => {
    response.cookie("nanta-session", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0)
    });

    return response.success({}, "User logged out", 200);
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const get_user_data = (req, res) => {
    try {
        const { user } = req.body; 

        return res.status(200).send({user, message: "User retrieved successfully!"});
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const authenticate_user = (req, res) => {
    try {
        return res.status(200).send({ authorization_status: "Authorized" });
    } catch (err) {
        next(err);
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const verify_user_email = (req, res) => {
    try {
        const { user } = req.body;

        user.verification_token = null;
        user.is_verified = true;

        return res.status(200).send({ verification_status: "Verified" });
    } catch (error) {
        
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const send_verification_email = async (req, res, next) => {
    try {
        const { user } = req.body;

        const verification_token = jwt.sign({ type: "email_verification", user_id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '12h'});

        user.verification_token = verification_token;
        user.save();

        const verification_link = "http://aedogroupfour-lamp.xyz/api/auth/verify-email/" + verification_token;

        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        const html_template = fs.readFileSync("./src/modules/auth/v2/auth.verification-email.html", "utf8");

        const rendered_html = ejs.render(
            html_template, 
            { first_name: user.first_name, last_name: user.last_name, verification_link: verification_link }
        );

        const info = await transporter.sendMail({
            from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM}>`,
            to: `${user.email}`,
            subject: "Verification Email",
            html: rendered_html
        });

        console.log(info);

        return info;
    } catch (err) {
        // console.log(err);
        next(err);
    }
}

/**
 * @Precondition  
 * @Condition     
 * @Postcondition  
*/
export const initialize_session_cookie = async (req, res, session_token) => {
    try {
        res.cookie("nanta-session", session_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });
    } catch (err) {
        next(err);
    }
}