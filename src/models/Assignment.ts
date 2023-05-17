import { Schema, Model, model } from "mongoose";
import { IAssignment } from "../types";


const AssignmentSchema: Schema = new Schema({
    title: { type: String, required: true },
});

export const Assignment: Model<IAssignment> = model<IAssignment>('Assignment', AssignmentSchema);
