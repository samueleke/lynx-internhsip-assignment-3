import { Router } from "express";
const router = Router();
import * as mediaController from "../controllers/mediaController";
import { checkParamsExistence } from "../middleware/checkParams";

router.route("/avatar/:id")
    .get(checkParamsExistence(['id']), mediaController.getAvatar);

export default router;