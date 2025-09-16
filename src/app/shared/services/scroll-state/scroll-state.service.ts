import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ScrollStateService {
  private trendingScrollState = signal<number>(0);

  public set scrollState(position: number) {
    this.trendingScrollState.set(position);
  }

  public get scrollState(): number {
    return this.trendingScrollState();
  }
}
