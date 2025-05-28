import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  selector: 'app-detail-modal',
  templateUrl: './detail-modal.component.html',
  styleUrls: ['./detail-modal.component.css'],
  imports: [CommonModule, BaseModalComponent],
  standalone: true
})
export class DetailModalComponent extends BaseModalComponent {
  @Input() status?: string;
  @Input() showActions: boolean = true;
  @Input() primaryAction?: () => void;
  @Input() primaryActionLabel: string = 'Confirmar';

  onPrimaryAction(): void {
    if (this.primaryAction) {
      this.primaryAction();
    }
  }
} 