import express from "express";
import { rate_limit, validate_registration, validate_log_in, validate_token } from "./auth.middleware.js";
import { register_user, log_in_user, log_out_user, get_user } from "./auth.controller.js";

const router = express.Router();

router.post('/register', rate_limit, validate_registration, register_user);
router.post('/login', rate_limit, validate_log_in, log_in_user);
router.post('/logout', log_out_user);

router.get('/user', validate_token, get_user);

export default router;