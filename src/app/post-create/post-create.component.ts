import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import {PostService} from '../services/post.service';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {


  constructor(private service:PostService) { }

  onAddPost(form: NgForm) {

    this.service.addPost(form.value.title, form.value.content, form.value.race, form.value.background, form.value.level).subscribe();
    
    console.log(form.value);
    form.resetForm();
  }

  ngOnInit() {}

}
