import { z } from 'zod';

// Define a Zod schema for the title property
export const subjectSchema = z.object({
    title: z.string().min(1).max(100),
});