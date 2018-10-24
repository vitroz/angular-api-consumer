import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { PostComponentService } from './post-component.service';

@Component({
  selector: 'app-post-component',
  templateUrl: './post-component.component.html',
  styleUrls: ['./post-component.component.css']
})
export class PostComponentComponent implements OnInit {

  constructor(private service: PostComponentService) { }

  ngOnInit() {
  }


}
