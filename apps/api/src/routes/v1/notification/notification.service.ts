import { Request } from "express";
import { TB_notification } from "@repo/mx-schema";
import { getListQueryWithFilters } from "../../../db/utils-db/pg/list-filters/list-filters";
import { getTotalCount } from "../../../db/utils-db/pg/count-rows";

class NotificationService {
  getAllNotification(query: Request["query"]) {
    return getListQueryWithFilters(TB_notification, query).execute();
  }

  getCount() {
    return getTotalCount(TB_notification);
  }
}

export const notificationService = new NotificationService();
