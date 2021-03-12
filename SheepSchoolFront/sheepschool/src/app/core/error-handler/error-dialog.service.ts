import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  private errorDialogOpened = false;

  constructor(private dialog: MatDialog) {}

  openErrorDialog(message: string, status?: number): void {
    if (!this.errorDialogOpened) {
      this.errorDialogOpened = true;
      const dialogRef = this.dialog.open(ErrorDialogComponent, {
        data: { message, status },
        maxHeight: "100%",
        width: "540px",
        maxWidth: "100%",
        disableClose: true,
        hasBackdrop: true
      });

      dialogRef.afterClosed().subscribe(() => {
        this.errorDialogOpened = false;
      });
    }
  }
}
