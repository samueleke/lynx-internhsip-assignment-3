import * as path from 'path';
import * as yaml from 'js-yaml';
import * as express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Your API Description',
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Local server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/*.ts', './controllers/*.ts','./models/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function serveSwaggerDocs(router: express.Router) {
    router.use('/api-docs', express.static(path.join(__dirname, '../../docs/swagger-ui')));
    router.get('/swagger.yaml', (req, res) => {
        res.setHeader('Content-Type', 'application/yaml');
        res.send(yaml.dump(swaggerSpec));
    });
}
