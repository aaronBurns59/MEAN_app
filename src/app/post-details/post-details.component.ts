import { Component, OnInit } from '@angular/core';
import {PostService} from '../services/post.service';
import { Observable } from 'rxjs';
import {Post} from '../post.model';//needed for access to the post model interface
@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  posts: any = [];//an array for the data input by the users

  constructor(private service:PostService){}//uses PostService so need to pass as parameter

  ngOnInit(){  
    this.service.getPostsData().subscribe(data => {
        this.posts = data;
    });
   }
   
   //delete method calls the deletePost method which is accessable by
   //the service instance variable as a method
   //deleting requires something to find in this case an id String
   onDelete(id:string)//
  {
    //returns a message signalling the method has been accessed 
    //and returns the id from the db to prove access to that too
    console.log("Delete button worked " + id);
    this.service.deletePost(id).subscribe(()=>
    {
      this.ngOnInit();//
    });
  }
}
