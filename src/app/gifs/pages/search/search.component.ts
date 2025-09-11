import { Component, inject, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { GifService } from '../../services/gif.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [ListComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchGifs = signal<Gif[]>([]);
  _gifService = inject(GifService);

  onSearch(query: string) {
    console.log({ query })
    this._gifService.getSearchGifs(query)
      .subscribe(resp => {
        this.searchGifs.set(resp);
      });
  }

}
