
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-empty-state',
    imports: [],
    templateUrl: './empty-state.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './empty-state.css'
})
export class EmptyState {
  @Input() icon = '🛒';
  @Input() title = 'Nothing here yet';
  @Input() message = '';
}
