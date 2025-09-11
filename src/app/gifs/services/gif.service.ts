import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GeneralService } from 'src/app/shared/services/general/general.service';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadFromLocalStorage = () => {
  const history = localStorage.getItem('history');
  return history ? JSON.parse(history) : {};
}

@Injectable({
  providedIn: 'root'
})
export class GifService {

  _generalService = inject(GeneralService);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveToLocalStorage = effect(() => {
    localStorage.setItem('history', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs() {
    this._generalService.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/trending`, {
      api_key: environment.giphyApiKey,
      limit: 20
    }).subscribe(response => {
      const gifs = GifMapper.mapGiphyToGifArray(response.data);
      this.trendingGifs.set(gifs);
      this.trendingGifsLoading.set(false);
    });
  }

  getSearchGifs(query: string): Observable<Gif[]> {
    return this._generalService.get<GiphyResponse>(`${environment.giphyApiUrl}/gifs/search`, {
      api_key: environment.giphyApiKey,
      q: query,
      limit: 20
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyToGifArray(items)),
      tap((items) => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items,
        }))
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? []
  }
}
