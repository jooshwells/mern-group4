import rateLimit from "express-rate-limit";
import { body, checkSchema, validationResult } from "express-validator";
import User from "./auth.model.js";
import { response } from "express";

export const rate_limit = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        error: "Too many requests, please try again later."
    }
});

export const validate_registration = [
    checkSchema({
        email: {
            escape: true,
            notEmpty: {
                errorMessage: "Please enter your email"
            },
            isEmail: { 
                bail: true,
                errorMessage: "Please enter a valid email"
            },
            normalizeEmail: true,
            custom: { 
                options: async (value) => {
                    const user = await User.findOne({ email: value });
                    if (user)
                        throw new Error("Email is already registered");

                    return true;
                },
            }
        },
        first_name: {
            notEmpty: {
                errorMessage: "Please enter your first name"
            },
            trim: true,
            escape: true
        },
        last_name: {
            notEmpty: {
                errorMessage: "Please enter your last name"
            },
            trim: true,
            escape: true
        },
        password: {
            notEmpty: {
                errorMessage: "Please enter your password"
            },
            isLength: {
                options: { min: 8 },
                errorMessage: 'Password must be at least 8 characters'
              }
        },
        confirm_password: {
            custom: { 
                options: (value, {req}) => {
                    if (value !== req.body.confirm_password)
                        throw new Error("Passwords do not match");

                    return true;
                },
            }
        }
    }),

    (request, response, next) => {
        const errors_array = validationResult(request).array();

        if (errors_array.length) {
            const errors_object = errors_array.reduce((object, error) => {
                object[error.path] = error.msg;
                return object;
            }, {});
            response.error(errors_object, "Validation Error", 200);
        };

        next();
    }
];