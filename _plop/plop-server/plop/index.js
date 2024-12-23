export default (plop) => {
  plop.setGenerator("crud", {
    description: "Add an unconnected component",
    prompts: [
      {
        type: "list",
        name: "generator",
        message: "What do you want to generate",
        choices: ["crud", "crud-with-file-upload", "crud-api-only"],
      },
      {
        type: "input",
        name: "name",
        message: "What should it be called?",
        default: "test",
      },
      {
        type: "input",
        name: "zodSchema",
        message: "Zod schema name",
      },
      {
        type: "input",
        name: "dbSchema",
        message: "Db schema name",
      },
    ],
    actions: (data) => {
      if (data.generator === "crud-api-only") {
        return getApiActions(data.schemaDefinition);
      }
      return getAllActions(data.schemaDefinition);
    },
  });
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
  plop.addHelper("eq", function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
};

function getAllActions(schemaDefinition) {
  return [
    ...getApiActions(schemaDefinition),
    ...getAngularActions(schemaDefinition),
  ];
}

function getApiActions(schemaDefinition) {
  const apiPath = "../../../apps/api/src/routes/v1";
  return [
    // api service file
    {
      type: "add",
      path: `${apiPath}/{{name}}/{{name}}.service.ts`,
      templateFile: "./express/data.service.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get all list api
    {
      type: "add",
      path: `${apiPath}/{{name}}/get-all-{{name}}s.api.ts`,
      templateFile: "./express/get-all-list.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // create api
    {
      type: "add",
      path: `${apiPath}/{{name}}/create-{{name}}.api.ts`,
      templateFile: "./express/create.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //delete api
    {
      type: "add",
      path: `${apiPath}/{{name}}/id/delete-{{name}}.api.ts`,
      templateFile: "./express/id/delete.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get by id api
    {
      type: "add",
      path: `${apiPath}/{{name}}/id/get-{{name}}.api.ts`,
      templateFile: "./express/id/get.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // update api

    {
      type: "add",
      path: `${apiPath}/{{name}}/id/update-{{name}}.api.ts`,
      templateFile: "./express/id/update.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Modify api routing file
    {
      type: "modify",
      path: `${apiPath}/router.ts`,
      pattern: /(\/\/ APPEND API ROUTES)/g,
      templateFile: "./express/router.ts.hbs",
    },
    // modiy routing file
    {
      type: "modify",
      path: `${apiPath}/router.ts`,
      pattern: /(\/\/ IMPORT GENERATED FILES)/g,
      templateFile: "./express/import-routes.ts.hbs",
    },
  ];
}

function getAngularActions(schemaDefinition) {
  const angularPath = "../../../apps/admin/src";

  return [
    // angular module file
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/{{name}}.module.ts`,
      templateFile: "./angular/module.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // angular routing file
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/{{name}}-routing.module.ts`,
      templateFile: "./angular/routing.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // List component
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/{{name}}-list/{{name}}-list.component.ts`,
      templateFile: "./angular/list.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component HTML
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.html`,
      templateFile: "./angular/form/form.html.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component TS
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.ts`,
      templateFile: "./angular/form/form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Create form component
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/modify-{{name}}/create-{{name}}.component.ts`,
      templateFile: "./angular/form/add-form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Edit form component
    {
      type: "add",
      path: `${angularPath}/app/features/{{name}}/modify-{{name}}/update-{{name}}.component.ts`,
      templateFile: "./angular/form/edit-form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // modify routing file
    {
      type: "modify",
      path: `${angularPath}/app/app-routing.module.ts`,
      pattern: /(\/\/ APPEND ANGULAR ROUTES)/g,
      templateFile: "./angular/append-route.ts.hbs",
    },
  ];
}
