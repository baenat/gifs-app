import { Component, input, Input, signal } from '@angular/core';
import { ListItemComponent } from "./list-item/list-item.component";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gifs-list',
  imports: [ListItemComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  // @Input({ required: true }) imageUrls: Gif[] = [];
  imageUrls = input.required<Gif[]>();

}
