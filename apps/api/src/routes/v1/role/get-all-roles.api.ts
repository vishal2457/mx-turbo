import { Router } from 'express';
import { success } from '../../../shared/api-response/response-handler';
import ah from '../../../shared/async-handler.util';
import { roleService } from './role.service';

export default Router().get(
  '/all',
  ah(async (req, res) => {
    const roles = await roleService.getAllRoles();
    success(res, roles, 'success');
  })
);
