import { Request, Response } from "express";
import { Student } from "../models/Student";
import { studentSchema, studentID } from "../helpers/validators/studentValidation";
import z from "zod";
import axios from "axios";
import fs from "fs";
import { Subject } from "../models/Subject";
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *       properties:
 *         studentId:
 *           type: string
 *           description: The auto-generated id of the student
 *         firstName:
 *           type: string
 *           description: The first name of the student  
 *         lastName:
 *           type: string
 *           description: The last name of the student 
 *       example:
 *         firstName: John
 *         lastName: Doe
 * tags:
 *   name: Student
 *   description: The student managing API
 */


/**
 * @swagger
 * /student:
 *   get:
 *     summary: Returns the list of all the students
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: The list of the students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 *   post:
 *     summary: Create a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *     responses:
 *       200:
 *         description: The student was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 */
export async function getAllStudents(req: Request, res: Response) {

    const students = await Student.find();
    if (students.length === 0) return res.status(404).send({ msg: "No students found" });
    res.status(200).send(students);
}

export async function createStudent(req: Request, res: Response) {
    try {
        //create a new student, adding first name, last name, avatar
        const { firstName, lastName } = studentSchema.parse(req.body);
        const { _id } = await Student.create({ firstName, lastName });
        const avatarLocation = `/media/avatar/${_id}.jpg`;
        await Student.updateOne({ _id }, { $set: { avatar: avatarLocation } })

        res.status(200).send({ msg: "New student created !" });

    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues)
        } else {
            throw error;
        }
    }
}

/**
 * @swagger
 * /student/{studentId}:
 *   get:
 *     summary: Get a student by id
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the student
 *     responses:
 *      200:
 *        description: The student was successfully found
 *        content:
 *         application/json:
 *          schema:
 *            type: array
 *          items:
 *            $ref: '#/components/schemas/Student'
 *          example:
 *            id: 60a1c1b0b0b5a8a0b0b5a8a0
 *            firstName: John
 *            lastName: Doe
 *            avatar: media/avatar/2084398334.jpg
 *            subjects: ["Maths", "English"]
 *      500:
 *        description: Internal server error
 *      400:
 *        description: Bad request
 *      404:
 *        description: Student not found
 *   delete:
 *     summary: Delete a student by id
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the student
 *     responses:
 *       200:
 *         description: The student was successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
*/
export async function getStudentById(req: Request, res: Response) {
    try {
        //get a student by providing an id
        const { id } = studentID.parse(req.params);
        const student = await Student.findById(id);
        res.status(200).send(student);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues)
        } else {
            throw error;
        }
    }
}

export async function deleteStudentById(req: Request, res: Response) {
    try {
        //delete a student by providing an id
        const { id } = studentID.parse(req.params);
        const student = await Student.findByIdAndDelete(id);
        if (student) {
            fs.unlink(`./data/${id}.jpg`, (err) => {
                if (err) {
                    console.error(err)
                    res.status(500).send("Error when deleting student avatar")
                    return
                }
            });
        }
        res.status(200).send(student);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues)
        } else {
            throw error;
        }
    }
}


/**
 * @swagger
 *   /student/{studentId}/subject/{subjectId}:
 *   post:
 *     summary: Assign an existing subject to a student
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: studentId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the student
 *       - in: path
 *         name: subjectId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the subject          
 *     responses:
 *       200:
 *         description: The student was successfully graded 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 *       404:
 *         description: Student not found
 * */
export async function assignExistingSubjectToStudent(req: Request, res: Response) {
    //assign an existing subject to a student
    try {
        const { studentId, subjectId } = req.params
        const subject = await Subject.findById(subjectId)
        const student = await Student.findById(studentId)
        if (subject && student) {

            const updatedStudent = await Student.findOneAndUpdate(
                { _id: studentId },
                { $push: { subjects: { $each: [subjectId] } } },
                { new: true }
            )
            res.status(200).send({ msg: "Subject assigned to student!", updatedStudent })
        } else {
            res.status(404).send({ msg: "Student or subject not found", student, subject })
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send(error.issues)
        } else {
            throw error;
        }
    }
}