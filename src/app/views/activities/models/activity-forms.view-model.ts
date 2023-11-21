import { TypeActivity } from "./type-activity.enum";

export type ActivityFormsViewModel = {
  type: TypeActivity;
  startTime: string;
  endTime: string;
  selectedDoctors: string[];
}