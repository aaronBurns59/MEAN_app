import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";//needed for the form fucntionallity (getting/saving inputs)
import {PostService} from '../services/post.service';//needed to access methods that do all the work in post.service.ts
import {MatSelectModule} from '@angular/material/select';//needed for the angular materials

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(private service:PostService) { }//uses PostService so need to pass as parameter

  onAddPost(form: NgForm) {
    //an instance variable of service which calls one of its methods
    this.service.addPost(form.value.title, form.value.content, form.value.race, form.value.background, form.value.level).subscribe();
    
    //logs the values to the console from the form not to the console of the client
    console.log(form.value);
    //resets the values of the form the data is gotten form
    form.resetForm();
  }

  ngOnInit() {}

}
