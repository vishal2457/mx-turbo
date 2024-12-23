import express from "express";
import { lstatSync, readdirSync } from "fs";
import fsPromise from "fs/promises";
import path from "path";
import { is, Table, getTableName } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import cors from "cors";
import { createJiti } from "jiti";
import nodePlop from "./plop/lib/index.js";

const basePath = path.join(path.resolve(), "../../packages/mx-schema/src/lib");

const app = express();

app.use(express.json()).use(cors());

async function writeJson(data) {
  try {
    const existingData = await readJson();

    await fsPromise.writeFile(
      "./data.json",
      JSON.stringify({ ...existingData, ...data }, null, 2),
      "utf8"
    );
    console.log("File has been saved.");
  } catch (err) {
    console.error("Error writing the file:", err);
  }
}

async function readJson() {
  try {
    const data = await fsPromise.readFile("./data.json", "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.log("Error reading the file:", error);
  }
}

const files = readdirSync(basePath, { recursive: true });

app.get("/get-all-schema", async (req, res) => {
  const results = [];
  for (const file of files) {
    if (lstatSync(`${basePath}/${file}`).isFile()) {
      const j = createJiti(import.meta.url);
      const zodSchema = await j.import(`${basePath}/${file}`);
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

  res.json({ data: results, existingData: await readJson() });
});

app.post("/save-schema-details", async (req, res) => {
  await writeJson({
    [req.body?.name]: {
      config: req.body.fieldConfig,
      pageSettings: req.body.pageSettings,
    },
  });

  let generateResult = null;

  if(req.query.generate) {
    const plop = await nodePlop("./plop/index.js");
    generateResult = await plop
      .getGenerator("crud")
      .runActions({
        generator: "crud-api-only",
        name: req.body.name,
        dbSchema: req.body.name,
      });
  }

  res.json({ message: "Data saved successfully", generateResult });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});

