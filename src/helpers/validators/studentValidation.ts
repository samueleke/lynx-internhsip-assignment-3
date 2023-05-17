import { z } from "zod";

export const studentSchema = z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50)
});

export const studentID = z.object({
    id: z.string().min(2).max(50)
});