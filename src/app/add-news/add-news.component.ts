import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PetService } from '../_services';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css']
})
export class AddNewsComponent implements OnInit {

  addNewsForm: FormGroup;
  loading = false;
  submitted = false;

  fileToUpload: File = null;

  constructor(private formBuilder: FormBuilder,
              private petService: PetService,
              private router: Router) { }

  ngOnInit() {
    this.addNewsForm = this.formBuilder.group({
      caption: ['', Validators.required],
      body: ['', Validators.required],
      image: ['']
    });
  }

  // uploading a photo
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // convenience getter for easy access to form fields
  get f() { return this.addNewsForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.addNewsForm.invalid) {
          return;
      }

      this.loading = true;

      const addNews = new FormData();
      addNews.append('caption', this.f.caption.value);
      addNews.append('body', this.f.body.value);
      addNews.append('image', this.fileToUpload, this.fileToUpload.name);

      this.petService.addNews(addNews)
      .subscribe(
          data => {
              if (!data.success) {
                  this.loading = false;
              } else { // create successfull
                  this.router.navigate([`/`]);
              }
          },
          error => {
              console.log(error);
              this.loading = false;
          });
  }

}
