import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../_services';

@Component({
  selector: 'app-show-exam',
  templateUrl: './show-exam.component.html',
  styleUrls: ['./show-exam.component.css']
})
export class ShowExamComponent implements OnInit {

  examId: string;
  examData: any;
  constructor(private route: ActivatedRoute,
              private petService: PetService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.examId = params['id'];

      // get details
      this.petService.getExamDetails(this.examId)
      .subscribe(
        data => this.examData = data
      );
    });
  }

}
