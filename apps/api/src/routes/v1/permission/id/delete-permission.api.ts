import { Router } from "express";
import { success } from "../../../../shared/api-response/response-handler";
import { validate } from "../../../../shared/middlewares/validation.middleware";
import { v_param_id } from "@repo/mx-schema";
import { permissionService } from "../permission.service";

export default Router().delete(
  "/delete/:id",
  validate({ params: v_param_id }),
  async (req, res) => {
    const result = await permissionService.deletePermission(req.params.id);
    success(res, result, "Deleted successfully");
  }
);
