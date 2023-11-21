import { Theme } from "./theme";

export type ActivityListViewModel = {
  id: string;
  type: string;
  startTime: string;
  endTime: string;
  theme: Theme;
}