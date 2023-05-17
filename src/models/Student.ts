import { Schema, Model, model } from "mongoose";
import { IStudent } from "../types";

const StudentSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String},
    subjects: [{ type: Schema.Types.ObjectId, ref: 'Subject'}]
});

export const Student: Model<IStudent> = model<IStudent>("Student", StudentSchema);