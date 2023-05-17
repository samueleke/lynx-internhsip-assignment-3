import { Router } from "express";
const router = Router();
import * as assignmentController from "../controllers/assignmentController";
import { checkRequiredBodyFields } from "../middleware/checkBodyFields";

router.route("/")
    .post(checkRequiredBodyFields(['title']),assignmentController.createAssignment)

router.route("/grade")
    .post(checkRequiredBodyFields(['studentId', 'subjectId', 'assignmentId', 'grade']), assignmentController.gradeAssignment)

export default router;