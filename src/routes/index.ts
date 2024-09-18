import { Router } from "express";
import { home } from "../controllers";

export const router: Router = Router();

router.get("/", home);
