import { Router } from "express";
const router = Router();
import * as subjectController from "../controllers/subjectControllers";
import { checkParamsExistence } from "../middleware/checkParams";
import { checkRequiredBodyFields } from "../middleware/checkBodyFields";

//add middleware to check parameters
router.route("/")
    .post(checkRequiredBodyFields(['title']), subjectController.createSubject)

router.route("/:subjectId/assignment/:assignmentId")
    .put(checkParamsExistence(['subjectId', 'assignmentId']), subjectController.addAssignmentToSubject)

export default router;
