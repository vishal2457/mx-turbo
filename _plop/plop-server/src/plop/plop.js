
const mainGenerator = {
  description: "Create crud",
  actions: function (data) {
    const { generator, schemaDefinition } = data;
    if (generator === "crud-api-only") {
      return getApiActions(schemaDefinition);
    }
    return [
      ...getAngularActions(schemaDefinition),
      ...getApiActions(schemaDefinition),
    ];
  },
};

export default function (plop) {
  plop.setGenerator("crud", mainGenerator);
  plop.addHelper("curly", (object, open) => (open ? "{" : "}"));
  plop.addHelper("eq", function (v1, v2, options) {
    if (v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });
  plop.setActionType("prettify", (answers, config) => {
    const folderPath = `${path.join(
      __dirname,
      "/../../app/",
      config.path,
      plop.getHelper("properCase")(answers.name),
      "**",
      "**.js"
    )}`;

    try {
      execSync(`npm run prettify -- "${folderPath}"`);
      return folderPath;
    } catch (err) {
      throw err;
    }
  });
}

function getApiActions(schemaDefinition) {
  return [
    // api service file
    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/{{name}}.service.ts",
      templateFile: "./express/data.service.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get all list api
    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/get-all-{{name}}s.api.ts",
      templateFile: "./express/get-all-list.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // create api
    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/create-{{name}}.api.ts",
      templateFile: "./express/create.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //delete api
    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/id/delete-{{name}}.api.ts",
      templateFile: "./express/id/delete.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    //get by id api
    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/id/get-{{name}}.api.ts",
      templateFile: "./express/id/get.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // update api

    {
      type: "add",
      path: "../../apps/api/src/routes/v1/{{name}}/id/update-{{name}}.api.ts",
      templateFile: "./express/id/update.api.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Modify api routing file
    {
      type: "modify",
      path: "../../apps/api/src/routes/v1/router.ts",
      pattern: /(\/\/ APPEND API ROUTES)/g,
      templateFile: "./express/router.ts.hbs",
    },
    // modiy routing file
    {
      type: "modify",
      path: "../../apps/api/src/routes/v1/router.ts",
      pattern: /(\/\/ IMPORT GENERATED FILES)/g,
      templateFile: "./express/import-routes.ts.hbs",
    },
  ];
}

function getAngularActions(schemaDefinition) {
  return [
    // angular module file
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/{{name}}.module.ts",
      templateFile: "./angular/module.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // angular routing file
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/{{name}}-routing.module.ts",
      templateFile: "./angular/routing.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // List component
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/{{name}}-list/{{name}}-list.component.ts",
      templateFile: "./angular/list.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component HTML
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.html",
      templateFile: "./angular/form/form.html.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Form component TS
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/modify-{{name}}/{{name}}-form/{{name}}-form.component.ts",
      templateFile: "./angular/form/form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Create form component
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/modify-{{name}}/create-{{name}}.component.ts",
      templateFile: "./angular/form/add-form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // Edit form component
    {
      type: "add",
      path: "../../apps/admin/src/app/features/{{name}}/modify-{{name}}/update-{{name}}.component.ts",
      templateFile: "./angular/form/edit-form.ts.hbs",
      skipIfExists: true,
      data: { schemaValue: schemaDefinition },
    },
    // modify routing file
    {
      type: "modify",
      path: "../../apps/admin/src/app/app-routing.module.ts",
      pattern: /(\/\/ APPEND ANGULAR ROUTES)/g,
      templateFile: "./angular/append-route.ts.hbs",
    },
  ];
}
