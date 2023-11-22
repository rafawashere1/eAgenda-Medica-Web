import { Theme } from "./theme";
import { TypeActivity } from "./type-activity.enum";

export type ActivityListViewModel = {
  id: string;
  title: string;
  type: TypeActivity;
  startDay: Date;
  endDay: Date;
  startTime: string;
  endTime: string;
  theme: Theme;
}