import * as express from 'express';
import { serveSwaggerDocs } from './swaggerOptions';

export function setupSwagger(app: express.Application) {
    serveSwaggerDocs(app);
}
