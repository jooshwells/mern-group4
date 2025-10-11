import { normalize_system_error_response } from "../../custom.middleware.js";
import User from "./auth.model.js";
import jsonwebtoken from "jsonwebtoken";

export const register_user = async (request, response, next) => {
    try {
        const { first_name, last_name, email, password } = request.body;
        const user = new User({ first_name, last_name, email, password });
        await user.save();
        return response.success({ user: { first_name, last_name, email } }, "User registered!", 201);
    }
    catch (error)
    {
        return normalize_system_error_response(error);
    }
}

export const log_in_user = async (request, response) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
        const token = jsonwebtoken.sign({ user_id: user._id, email: user.email }, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        response.cookie("nanta-jsonwebtoken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 1000
        });

        return response.success({ user: { id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email } }, "User logged in!", 200);
    } catch (error) {
        return normalize_system_error_response(error, response);
    }
}

export const log_out_user = (request, response) => {
    response.cookie("nanta-jsonwebtoken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: new Date(0)
    });

    return response.success({}, "User logged out", 200);
}

export const get_user = async (request, response) => {
    const { email } = request.user;
    const user = await User.findOne({ email });

    return response.success({ user: { id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email } }, "User authenticated!", 200);
}