import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats = new Array<number>(6);
  
  constructor(private service:PostService ) { }

  ngOnInit() {
  }

  DiceRoller():any
  {
    
    for(var i=0;i<this.stats.length;i++)
    {
      this.stats[i]=this.service.rollDice();
    }
    console.log(this.stats);
    return this.stats
  }

}
