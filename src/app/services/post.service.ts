import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../post.model';
//installed form angular library in order to get access to an easy to implement dice
import { Dice } from "dice-typescript";
import { Stat } from '../stat';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }//uses http methods so need to declare instance of it

  //used for  the details component i.e. read page
  getPostsData(): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts");//goes to the db documents "posts" in the "posts" collection
  }

  private posts: Post[] = [];//array for posts model
  private stat: Stat[] = [];// array for stats model

  //add posts method for reading input on the create page
  addPost(title: string, content: string, race: string, background: string, level: Number): Observable<any> {
    const post: Post = { title: title, content: content, race: race, background: background, level: level };
    return this.http.post("http://localhost:8081/api/posts", post);
  }

  //add stats method for saving the stats to the db
  addStat(stats: Array<Number>) :Observable<any> {
    const stat: Stat = { stats: stats };
    return this.http.post("http://localhost:8081/api/stats", stat);
  }

  //deletes a post in the client by getting it in the database
  deletePost(id: String): Observable<any> {
    return this.http.delete("http://localhost:8081/api/posts/" + id);
  }

  //gets the post at at server url 
  getPost(id: String): Observable<any> {
    return this.http.get("http://localhost:8081/api/posts/" + id)
  }

  updatePost(id: string, title: string, content: string, race: string, background: string, level: Number): Observable<any> {
    const post: Post = { title: title, content: content, race: race, background: background, level: level };
    return this.http.put("http://localhost:8081/api/posts/" + id, post);
  }

  //roll dice methods implements the import of the typescript dice install from the "https://www.npmjs.com/package/dice-typescript"
  //returns the total value summed from 4 dice minus the smallest dice value
  rollDice(): any {
    const dice = new Dice();
    const roll1 = dice.roll("1d6").total;
    const roll2 = dice.roll("1d6").total;
    const roll3 = dice.roll("1d6").total;
    const roll4 = dice.roll("1d6").total;
    var smallestNum = 9999;
    var total = 0;

    //delibrately coded to parody how it is done in reality 
    //for the purpose of clarity within the rules of D&D 
    for (var i = 0; i < 4; i++) {
      if (roll1 < smallestNum)
        smallestNum = roll1;
      if (roll2 < smallestNum)
        smallestNum = roll2;
      if (roll3 < smallestNum)
        smallestNum = roll3;
      if (roll4 < smallestNum)
        smallestNum = roll4;
    }//for

    total = roll1 + roll2 + roll3 + roll4 - smallestNum;
    return total;
  }
}
