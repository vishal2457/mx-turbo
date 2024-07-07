import { Router } from "express";
import { success } from "../../../shared/api-response/response-handler";
import { validate } from "../../../shared/middlewares/validation.middleware";
import { TB_userRole } from "@repo/mx-schema";
import { createInsertSchema } from "drizzle-zod";
import { userRoleService } from "./userRole.service";

export default Router().post(
  "/create",
  validate({ body: createInsertSchema(TB_userRole) }),
  async (req, res) => {
    const result = await userRoleService.createUserRole(req.body);
    success(res, result, "success");
  }
);
