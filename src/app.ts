import express, {  NextFunction, Request, Response } from "express";
import { config } from "dotenv";
import dbConnect from "./middleware/dbConnect";
import studentRouter from "./routes/student";
import subjectRouter from "./routes/subject";
import assignmentRouter from "./routes/assignment";
import mediaRouter from "./routes/media";
// import { setupSwagger } from './swagger.ts';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Assignment_III',
            version: '1.0.0',
            description: 'Create CRUD api',
        },
        servers: [
            {
                url: `http://localhost:${process.env.SERVER_PORT}`,
                description: 'Local server',
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const specs = swaggerJSDoc(options);
const app = express();
// setupSwagger(app);

app.use(express.json());

app.use("/student", studentRouter)
app.use("/subject", subjectRouter)
app.use("/assignment", assignmentRouter)
app.use("/media", mediaRouter)



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true
}));

//catch-all error handling
app.use((err:Error, req:Request, res:Response, next:NextFunction) => {
    console.error(err);
    res.status(500).send("Internal server error");
});

const port = process.env.SERVER_PORT || 3000;
dbConnect()
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});