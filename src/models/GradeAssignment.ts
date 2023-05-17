import { Schema, Model, model } from "mongoose";
import { IGradeAssignment } from "../types";

const GradeAssignmentSchema: Schema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    assignment: { type: Schema.Types.ObjectId, ref: 'Assignment', required: true },
    grade: { type: String, required: true, enum: ['A', 'B', 'C', 'D', 'E'] }
});

export const GradeAssignment: Model<IGradeAssignment> = model<IGradeAssignment>("GradeAssignment", GradeAssignmentSchema);
