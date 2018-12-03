import { Component, OnInit } from '@angular/core';
import {Router,  ActivatedRoute} from '@angular/router';
import {PostService} from '../services/post.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-post-update',
  templateUrl: './post-update.component.html',
  styleUrls: ['./post-update.component.css']
})
export class PostUpdateComponent implements OnInit {

  post: any = [];//array for posts data needed to access db data for updating

  constructor(private route:ActivatedRoute, private service:PostService, private router:Router){}
   //client side callback method

   //when the "page" is called this function runs
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);//logs the document chosen on the read "page"
    //gets this data for displaying to the update page so you can alter it
    this.service.getPost(this.route.snapshot.params['id'])
    .subscribe(data => 
      {
        this.post=data;
      });
  }
  //calls the method in the post.service.ts that actually updates the data in the db and the client webpage
  onEditPost(form: NgForm)
  {
      //have to subscribe due to the router vat being used
      this.service.updatePost(this.post._id, form.value.title, form.value.content, form.value.race, form.value.background, form.value.level)
      .subscribe(() =>
        {
          this.router.navigate(['/list']);
        });
  }

}
