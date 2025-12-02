import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";
import fs from "fs";

const docsPath = path.join(__dirname, "./docs/swagger");

const swaggerDocument = fs
  .readdirSync(docsPath)
  .filter((file) => file.endsWith(".json"))
  .map((file) =>
    JSON.parse(fs.readFileSync(path.join(docsPath, file), "utf-8"))
  )
  .reduce(
    (acc, doc) => {
      acc.paths = { ...acc.paths, ...(doc.paths || {}) };

      acc.components = {
        schemas: {
          ...(acc.components.schemas || {}),
          ...(doc.components?.schemas || {})
        }
      };

      acc.tags = [
        ...(acc.tags || []),
        ...(doc.tags || [])
      ];

      return acc;
    },
    {
      openapi: "3.0.3",
      info: {
        title: "Penaareia API",
        version: "1.0.0",
        description: "Documentação completa da API Penaareia"
      },
      servers: [
        {
          url: "http://localhost:5000",
          description: "Servidor local"
        }
      ],
      paths: {},
      components: {
        schemas: {}
      },
      tags: []
    } as any
  );

export default (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        docExpansion: "none",
        defaultModelsExpandDepth: -1,
        displayRequestDuration: true,
        filter: true,
        supportedSubmitMethods: ["get", "post", "put", "delete", "patch"]
      },
      customSiteTitle: "Documentação da API - Quiosque"
    })
  );
};
