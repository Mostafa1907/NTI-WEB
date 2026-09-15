
import { Component, Input, computed, signal, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-star-rating',
    imports: [],
    templateUrl: './star-rating.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './star-rating.css'
})
export class StarRating {
  @Input() set rating(value: number) {
    this._rating.set(value ?? 0);
  }
  @Input() reviews: number | null | undefined = null;
  @Input() size: 'sm' | 'md' = 'sm';

  private _rating = signal(0);

  stars = computed(() => {
    const rounded = Math.round(this._rating() * 2) / 2;
    return [1, 2, 3, 4, 5].map((n) => {
      if (rounded >= n) return 'full';
      if (rounded + 0.5 === n) return 'half';
      return 'empty';
    });
  });

  ratingValue = computed(() => this._rating());
}
