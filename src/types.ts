import { Types } from 'mongoose';

export interface IAssignment {
    title: string;
}

export interface ISubject {
    title: string;
    assignment: Types.ObjectId[] | IAssignment[];
}

export interface IStudent {
    firstName: string;
    lastName: string;
    avatar: string;
    subjects: Types.ObjectId[] | ISubject[];
}

export interface IGradeAssignment {
    student: Types.ObjectId | IStudent;
    subject: Types.ObjectId | ISubject;
    assignment: Types.ObjectId | IAssignment;
    grade: 'A' | 'B' | 'C' | 'D' | 'E';
}

export interface IAssignmentDocument extends IAssignment, Document {}

export interface ISubjectDocument extends ISubject, Document {
    assignment: Types.ObjectId[] | IAssignmentDocument[];
}

export interface IStudentDocument extends IStudent, Document {
    subjects: Types.ObjectId[] | ISubjectDocument[];
}

export interface IGradeAssignmentDocument extends IGradeAssignment, Document {
    student: Types.ObjectId | IStudentDocument;
    subject: Types.ObjectId | ISubjectDocument;
    assignment: Types.ObjectId | IAssignmentDocument;
}