import { Router } from "express";
import { v_param_id } from "@repo/mx-schema";
import { success } from "../../../../shared/api-response/response-handler";
import ah from "../../../../shared/async-handler.util";
import { validate } from "../../../../shared/middlewares/validation.middleware";
import { userService } from "../user.service";

export default Router().get(
  "/:id",
  validate({ params: v_param_id }),
  ah(async (req, res) => {
    const result = await userService.getUserByID(req.params.id);
    success(res, result, "User Details");
  })
);
