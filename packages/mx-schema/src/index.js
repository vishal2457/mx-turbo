"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
// schemas
__exportStar(require("./lib/customer/customer.schema"), exports);
__exportStar(require("./lib/customer/customer-fcm.schema"), exports);
__exportStar(require("./lib/user/user.schema"), exports);
__exportStar(require("./lib/user/user-role.schema"), exports);
__exportStar(require("./lib/role.schema"), exports);
__exportStar(require("./lib/menu.schema"), exports);
__exportStar(require("./lib/notification.schema"), exports);
__exportStar(require("./lib/permission/permission.schema"), exports);
__exportStar(require("./lib/permission/role-permission.schema"), exports);
// zod utils
__exportStar(require("./lib/_zod-utils/v-pagination"), exports);
__exportStar(require("./lib/_zod-utils/id-params"), exports);
__exportStar(require("./lib/_zod-utils/response-types"), exports);
__exportStar(require("./lib/_zod-utils/v-list-filters"), exports);
