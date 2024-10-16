import { Router } from "express";
import { Z_user } from "@repo/mx-schema";
import {
  success,
  unauthorized,
} from "../../../shared/api-response/response-handler";
import { generateToken } from "../../../shared/jwt/token-utils";
import { validate } from "../../../shared/middlewares/validation.middleware";
import { checkPassword } from "../../../shared/password-hash";
import { userService } from "./user.service";
import { roleService } from "../role/role.service";

export default Router().post(
  "/login",
  validate({ body: Z_user.pick({ email: true, password: true }) }),
  async (req, res) => {
    const user = await userService.getUserByEmail(req.body.email);

    if (!user) {
      return unauthorized(res, "Incorrect credentials");
    }

    if (!checkPassword(req.body.password, user.password)) {
      return unauthorized(res, "Incorrect credentials");
    }

    const permissions = await roleService.getRolePermissionByUserID(user.id);
    const token = generateToken({
      email: user.email,
      id: user.id,
      organisationID: user.organisationID,
    });
    success(res, { token, permissions }, "login success");
  }
);
