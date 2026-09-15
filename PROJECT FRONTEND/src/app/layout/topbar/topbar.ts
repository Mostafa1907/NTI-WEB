
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-topbar',
    imports: [RouterLink],
    templateUrl: './topbar.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './topbar.css'
})
export class Topbar {
  @Input() cartCount = 0;
  @Input() signedIn = false;
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() search = new EventEmitter<string>();

  onSearchInput(value: string): void {
    this.search.emit(value);
  }
}
