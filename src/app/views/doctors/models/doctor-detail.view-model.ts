import { ActivityListViewModel } from "../../activities/models/activity-list.view-model";

export type DoctorDetailViewModel = {
  id: string;
  crm: string;
  name: string;
  lastActivity: Date;
  currentActivity: ActivityListViewModel
};