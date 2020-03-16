import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSnackBarRef } from '@angular/material/snack-bar/typings/snack-bar-ref';
import { SimpleSnackBar } from '@angular/material/snack-bar/typings/simple-snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(
    public snackBar: MatSnackBar,
  ) { }

  public open(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 10000
    });
  }
}
