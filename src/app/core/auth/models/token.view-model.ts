import { UserTokenViewModel } from "./user-token.view-model";

export type TokenViewModel = {
  key: string;
  expirationDate: Date;
  user: UserTokenViewModel;
}