import { Schema, Model, model } from "mongoose";
import { ISubject } from "../types";


const SubjectSchema: Schema = new Schema({
    title: { type: String, required: true },
    assignment: [{ type: Schema.Types.ObjectId, ref: 'Assignment' }],
});

export const Subject: Model<ISubject> = model<ISubject>("Subject", SubjectSchema);