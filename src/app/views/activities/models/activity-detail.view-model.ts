import { DoctorListViewModel } from "src/app/views/doctors/models/doctor-list.view-model";
import { TypeActivity } from "./type-activity.enum";

export type ActivityDetailViewModel = {
  id: string;
  type: TypeActivity;
  startTime: string;
  endTime: string;
  doctors: DoctorListViewModel[];
}