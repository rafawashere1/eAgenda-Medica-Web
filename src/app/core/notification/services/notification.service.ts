import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
  constructor(private snackbar: MatSnackBar) {}

  success(message: string): void {
    this.snackbar.open(message, 'OK', {
      panelClass: ['snackbar-success'],
    });
  }

  warn(message: string): void {
    this.snackbar.open(message, 'OK', {
      panelClass: ['snackbar-warn'],
    });
  }

  error(message: string): void {
    this.snackbar.open(message, 'OK', {
      panelClass: ['snackbar-error'],
    });
  }
}