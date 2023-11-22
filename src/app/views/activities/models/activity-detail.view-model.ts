import { DoctorListViewModel } from "src/app/views/doctors/models/doctor-list.view-model";
import { TypeActivity } from "./type-activity.enum";
import { Theme } from "./theme";

export type ActivityDetailViewModel = {
  id: string;
  title: string;
  type: TypeActivity;
  startDay: Date;
  endDay: Date;
  startTime: string;
  endTime: string;
  doctors: DoctorListViewModel[];
  theme: Theme;
}