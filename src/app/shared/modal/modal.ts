import { Component, inject, input } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';

export interface ModalData {
  title: string;
  saveLabel?: string;
  closeLabel?: string;
}

@Component({
  selector: 'my-app-modal',
  standalone: true,
  templateUrl: './modal.html',
  imports: [CommonModule],
})
export class ModalComponent {
  // Inject DialogRef to control the dialog and DIALOG_DATA to receive data.
  public dialogRef = inject(DialogRef<boolean>);
  public data: ModalData = inject(DIALOG_DATA);

  title = this.data.title;
  saveLabel = this.data.saveLabel || 'Save';
  closeLabel = this.data.closeLabel || 'Close';

  onClose(): void {
    this.dialogRef.close(false); // Close with a 'false' result (cancel)
  }

  onSave(): void {
    this.dialogRef.close(true); // Close with a 'true' result (save)
  }
}