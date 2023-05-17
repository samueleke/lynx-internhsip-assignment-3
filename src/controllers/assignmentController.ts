import { Request, Response } from "express";
import { assignmentSchema } from "../helpers/validators/assignmentValidation";
import z from "zod";
import { Assignment } from "../models/Assignment";
import { Student } from "../models/Student";
import { GradeAssignment } from "../models/GradeAssignment";

/**
 * @swagger
 * components:
 *   schemas:
 *     Assignment:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the student
 *         title:
 *           type: string
 *           description: The title of the assignment
 *       example:
 *         title: Assignment 1
 *     GradeAssignment:
 *       type: object
 *       required:
 *         - studentId
 *         - subjectId
 *         - assignmentId
 *         - grade
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the
 *         studentId:
 *           type: string
 *           description: The id of the student
 *         subjectId:
 *           type: string
 *           description: The id of the subject
 *         assignmentId:
 *           type: string
 *           description: The id of the assignment
 *         grade:
 *           type: string
 *           description: The grade of the student
 *       example:
 *         studentId: 643d1890246eb83bba2ca5c3
 *         subjectId: 643d8a681aef7b69a9cae13b
 *         assignmentId: 643d8a3a1aef7b69a9cae139
 *         grade: A
 * 
 * tags:
 *   - name: Assignment
 *     description: The assignment managing API
 *   - name: GradeAssignment
 *     description: The grade assignment managing API
 * 
 * /assignment:
 *   post:
 *     summary: Create a new assignment
 *     tags: [Assignment]
 *     requestBody:    
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Assignment'
 *     responses:
 *       200:
 *         description: The assignment was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Internal server error
 */
export async function createAssignment(req: Request, res: Response) {
    //create a new assignment by providing a title
    try {
        const { title } = req.body;
        const assignment = await Assignment.create({ title });
        res.status(200).send({ msg: "New assignment created !", assignment });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send((error.message));
        } else {
            throw error;
        }
    }
}


/**
 * @swagger
 * /assignment/grade:
 *   post:
 *     summary: Grade an assignment for a particular student
 *     tags: [GradeAssignment]
 *     requestBody:    
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GradeAssignment'          
 *     responses:
 *       200:
 *         description: The assignment was successfully graded
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Assignment'
 *       500:
 *         description: Internal server error   
 */
export async function gradeAssignment(req: Request, res: Response) {
    //grade an assignment for a particular student
    try {
        const { studentId, subjectId, assignmentId, grade } = req.body

        const gradeAssignment = await GradeAssignment.create({ student: studentId, subject: subjectId, assignment:assignmentId, grade });

        if (gradeAssignment) {
            console.log(gradeAssignment)
            res.status(200).send({ msg: "Assignment graded !", gradeAssignment });
        } else {
            res.status(400).send({ msg: "Assignment not graded !" });
        }

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues)
        } else {
            throw error;
        }
    }
}