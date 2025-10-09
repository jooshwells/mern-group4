import express from "express";
import { rate_limit, validate_registration } from "./auth.middleware.js";
import { register_user, log_in_user } from "./auth.controller.js";

const router = express.Router();

router.post('/register', rate_limit, validate_registration, register_user);
// router.post('/register', rate_limit, register_user);
router.post('/login', rate_limit, log_in_user);

export default router;