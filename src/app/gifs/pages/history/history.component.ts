import { Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { GifService } from '../../services/gif.service';
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'app-history',
  imports: [ListComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  gifService = inject(GifService);

  query = toSignal<string>(
    inject(ActivatedRoute).params.pipe(map((params) => params['key']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query() ?? '');
  })

}
