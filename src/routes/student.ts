import { Router } from "express";
import * as studentController from "../controllers/studentController";
import { checkParamsExistence } from "../middleware/checkParams";
import { checkRequiredBodyFields } from "../middleware/checkBodyFields";

const router = Router();
//add middleware to check parameters
router.route("/")
    .get(studentController.getAllStudents)
    .post(checkRequiredBodyFields(['firstName','lastName']),studentController.createStudent)

router.route("/:id")
    .get(checkParamsExistence(['id']),studentController.getStudentById)
    .delete(checkParamsExistence(['id']), studentController.deleteStudentById)

router.route("/:studentId/subject/:subjectId")
    .post(checkParamsExistence(['studentId', 'subjectId']), studentController.assignExistingSubjectToStudent)


export default router;