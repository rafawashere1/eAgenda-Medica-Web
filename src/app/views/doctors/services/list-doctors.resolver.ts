import { inject } from "@angular/core";
import { DoctorsService } from "./doctors.service";

export const doctorListResolver = () => {
  return inject(DoctorsService).GetAll();
};