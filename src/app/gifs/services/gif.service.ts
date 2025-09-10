import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GeneralService } from 'src/app/shared/services/general/general.service';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  _generalService = inject(GeneralService);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal<boolean>(true);

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
}
