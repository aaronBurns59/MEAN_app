import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor(private service:PostService) { }

  ngOnInit() {
  }

 DiceRoller()
  {
   this.service.rollDice();
  }

}
