import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorDialogService } from './error-dialog.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(private errorDialogService: ErrorDialogService) {}
    
    handleError(error: Error): void {
        this.errorDialogService.openErrorDialog(
            error.message || "Erro do cliente indefinido."
        );
        console.error("Erro do manipulador de erros global do sistema: ", error);
    }
}
