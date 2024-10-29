import express from "express";
import { lstatSync, readdirSync } from "node:fs";
import path from "node:path";
import { ZodObject } from "zod";

const basePath = path.join(__dirname, "../../../packages/mx-schema/src/lib");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});
const files = readdirSync(basePath, { recursive: true });

for (const file of files) {
  if (lstatSync(`${basePath}/${file}`).isFile()) {
    const j = require("jiti")(__filename);
    const zodSchema = j(`${basePath}/${file}`)["Z_user"];

    if (zodSchema instanceof ZodObject<any>) {
      console.log(zodSchema);
    }

    //   if (zodSchema) {
    //     const jsonSchema = zodToJsonSchema(zodSchema, data.zodSchema);
    //     schemaDefinition = jsonSchema.definitions[data.zodSchema];
    //   }
  }
}

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
