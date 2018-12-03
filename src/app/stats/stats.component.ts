import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  stats= Array<Number>(6);

  constructor(private service:PostService) { }

  ngOnInit() {
  }

  //a function that calls the rollDice method in the service 
  //also returns an array and prints the array to the web page console
  DiceRoller():any
  {
    for(var i=0;i<this.stats.length;i++)
    {
      this.stats[i]=this.service.rollDice();  
    }
    console.log(this.stats);
    return this.stats
  }
  //adds the stats to the db
  onAddStat(form:NgForm){
    this.service.addStat(form.value.stats).subscribe();
    //console.log(form.value);
  }

}
