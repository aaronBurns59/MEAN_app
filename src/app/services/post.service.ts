import { Injectable, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Post} from '../post.model';
import { Dice } from "dice-typescript";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }
  
    getPostsData(): Observable<any> {
      return this.http.get("http://localhost:8081/api/posts");
    }

  private posts: Post[] = [];
  //private postsUpdated = new Subject<Post[]>();
/*
  getPosts() {
    return [...this.posts];
  }
*/
  addPost(title: string, content: string, race: string, background: string, level: Number): Observable<any> {
    const post: Post = {title: title, content: content, race: race, background: background, level:level};
    return this.http.post("http://localhost:8081/api/posts",post);
  }

  //deletes a post in the client by getting it in the database
  deletePost(id:String): Observable<any>
  {
      return this.http.delete("http://localhost:8081/api/posts/" + id);
  }

  //gets the post at at server url 
  getPost(id: String):Observable<any>
  {
      return this.http.get("http://localhost:8081/api/posts/" + id)
  }

  updatePost(id: string, title: string, content: string, race: string, background: string, level: Number):Observable<any>
  {
    const post: Post = {title: title, content: content, race:race, background:background, level:level};
    return this.http.put("http://localhost:8081/api/posts/" + id, post);
  }

  rollDice()
  {
    const dice = new Dice();
    const roll1 = dice.roll("1d6").total;
    const roll2= dice.roll("1d6").total;
    const roll3= dice.roll("1d6").total;
    const roll4= dice.roll("1d6").total;
    var smallestNum=9999

    console.log(roll1 + " " + roll2);

    /*
    int stats[]= new int[6];
		int rolls[] = new int[4];
		int i, j;
		int num1, num2, num3;
		int smallestNum=9999;
		int statSum=0;
	  	
	
			  for(i=0;i<4;i++)
			  {
				  rolls[i]= (int) (Math.random()*6+1);
				  if(rolls[i] < smallestNum)
					  smallestNum= rolls[i];	  
			  }
	
			  for(i=0;i<4;i++)
			  {				  
				  for(j=0;j<6;j++)
					  stats[j]+=rolls[i];
			  }
			  for(j=0;j<6;j++)
System.out.println(stats[j]-smallestNum);
    */
  }
}
