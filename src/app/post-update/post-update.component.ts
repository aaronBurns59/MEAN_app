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

  post: any = [];

  constructor(private route:ActivatedRoute, private service:PostService, private router:Router)
  {

  }
   //client side callback method
  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    
    this.service.getPost(this.route.snapshot.params['id'])
    .subscribe(data => 
      {
        this.post=data;
      });
  }

  onEditPost(form: NgForm)
  {
      this.service.updatePost(this.post._id, form.value.title, form.value.content)
      .subscribe(() =>
        {
          this.router.navigate(['/list']);
        });
  }

}
