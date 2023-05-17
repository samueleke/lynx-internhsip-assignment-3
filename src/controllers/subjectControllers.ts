import { Request, Response } from "express";
import { subjectSchema } from "../helpers/validators/subjectValidation";
import z from "zod";
import { Subject } from "../models/Subject";
import { Assignment } from "../models/Assignment";

/**
 * @swagger
 * components:
 *   Schemas:
 *     Subject:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: The title of the subject
 *       example:
 *         title: Math
 * tags:
 *   name: Subject
 *   description: The subject managing API
 * 
 * /subject:
 *   post:
 *     summary: Create a new subject
 *     tags: [Subject]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/Schemas/Subject'
 *     responses:
 *       200:
 *         description: The subject was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Schemas/Subject'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 * /subject/{subjectId}/assignment/{assignmentId}:
 *   put:
 *     summary: Add an existing assignment to a subject
 *     tags: [Subject]
 *     parameters:
 *       - in: path
 *         name: subjectId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the subject
 *       - in: path
 *         name: assignmentId
 *         schema:
 *           type: string
 *           required: true
 *           description: The id of the assignment
 *     responses:
 *       200:
 *         description: The assignment was successfully added to the subject
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/Schemas/Subject'
 * 
 */
export async function createSubject(req: Request, res: Response) {
    //create a new subject by providing a title
    try {
        const { title } = subjectSchema.parse(req.body);
        const subject = await Subject.create({ title });
        res.status(200).send({ msg: "New subject created !", subject });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send((error.message));
        } else {
            throw error;
        }
    }
}

export async function addAssignmentToSubject(req: Request, res: Response) {
    //add an existing assignment to a subject
    const { subjectId, assignmentId } = req.params;
    try {
        const assignment = await Assignment.findOne({ _id: assignmentId});
        const subject = await Subject.findOne({ _id: subjectId });
        if (assignment && subject) {
            const updatedSubject = await Subject.findOneAndUpdate(
                { _id: subjectId },
                { $push: { assignment: { $each: [assignmentId] } } },
                { new: true }
            );
            res.status(200).send({ msg: "Assignment added to subject", updatedSubject });
        } else {
            res.status(404).send({ msg: "Assignment or subject not found", assignment, subject });
        }
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send((error.message));
        } else {
            throw error;
        }
    }
}
