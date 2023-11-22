import { Theme } from "./theme";
import { TypeActivity } from "./type-activity.enum";

export type ActivityFormsViewModel = {
  title: string;
  type: TypeActivity;
  startDay: Date;
  endDay: Date;
  startTime: string;
  endTime: string;
  selectedDoctors: string[];
  theme: Theme;
}