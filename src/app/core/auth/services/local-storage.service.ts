import { Injectable } from "@angular/core";
import { TokenViewModel } from "../models/token.view-model";

@Injectable()
export class LocalStorageService {
  private keyLocalStorage: string = 'eAgenda-medica-data'

  public saveUserLocalData(user: TokenViewModel) {
    const JSON_STRING = JSON.stringify(user)

    localStorage.setItem(this.keyLocalStorage, JSON_STRING)
  }

  public getSavedLocalData(): TokenViewModel | undefined {
    const jsonString = localStorage.getItem(this.keyLocalStorage);

    if (!jsonString) return undefined;

    return JSON.parse(jsonString) as TokenViewModel;
  }

  public clearLocalData(): void {
    localStorage.setItem(this.keyLocalStorage, '');
  }
}