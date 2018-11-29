import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats= new Array<Number>(6);
  
  
  constructor(private service:PostService) { }

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

  onAddStat(form:NgForm)
  {
    this.service.addStat(form.value.stats).subscribe();
   
  }

}
