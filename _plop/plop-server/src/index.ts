import express from "express";
import { lstatSync, readdirSync } from "node:fs";
import fsPromise from "node:fs/promises";
import path from "node:path";
import { is, Table, getTableName } from "drizzle-orm";
import { createSelectSchema } from "drizzle-zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import cors from "cors";
import nodePlop from "node-plop";

const basePath = path.join(__dirname, "../../../packages/mx-schema/src/lib");

const app = express();

app.use(express.json());

app.use(cors());

async function writeJson(data: any) {
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
  // parse JSON object
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

  res.json({ data: results, existingData: await readJson() });
});

app.post("/save-schema-details", async (req, res) => {
  await writeJson({
    [req.body?.name]: {
      config: req.body.fieldConfig,
      pageSettings: req.body.pageSettings,
    },
  });
  res.json({ message: "Data saved successfully" });
});

app.post("/generate-crud/:id", async (req, res) => {
  // const config = req.body.fieldConfig;
  // const plop = await nodePlop("./plop/plop.js");
  // const generator = plop.getGenerator("crud");
  // generator.runActions({ generator: "crud-api-only" }).then(() => {
  //   res.json({ message: "CRUD generated successfully" });
  // });
});

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
