import express from "express";
import { lstatSync, readdirSync } from "node:fs";
import path from "node:path";
import { is, Table, getTableName } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import cors from "cors";

const basePath = path.join(__dirname, "../../../packages/mx-schema/src/lib");

const app = express();

app.use(cors());

const files = readdirSync(basePath, { recursive: true });

app.get("/get-all-schema", (req, res) => {
  const results = [];
  for (const file of files) {
    if (lstatSync(`${basePath}/${file}`).isFile()) {
      const j = require("jiti")(__filename);
      const zodSchema = j(`${basePath}/${file}`);
      const values = Object.values(zodSchema);
      for (const value of values) {
        if (is(value, Table)) {
          const zodSchema = createSelectSchema(value);
          const tableName = getTableName(value);
          const jsonSchema = zodToJsonSchema(zodSchema, tableName);
          if (jsonSchema.definitions) {
            results.push({
              ...jsonSchema.definitions[tableName],
              name: tableName,
            });
          }
        }
      }
    }
  }
  res.json({ data: results });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
