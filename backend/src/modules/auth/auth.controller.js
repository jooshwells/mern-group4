import User from "./auth.model.js";

export const register_user = async (request, response, next) => {
    try {
        const { first_name, last_name, email, password } = request.body;
        const user = new User({ first_name, last_name, email, password });
        await user.save();
        response.success({ user: { first_name, last_name, email } }, "User registered!", 201);
    }
    catch (error)
    {
        console.log("Am I here?")
        // next(error);
    }
}

export const log_in_user = async (request, response) => {
    response.send("User logged in!")
}