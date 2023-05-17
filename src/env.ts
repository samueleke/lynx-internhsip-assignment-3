import { z } from "zod"
import { config } from "dotenv"

config();

const envSchema = z.object({
    MONGODB_URI: z.string().nonempty()
});

export const envResult = envSchema.safeParse(process.env);