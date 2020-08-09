import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  examId: string = null;

  constructor() { }

  getExamId() {
    return this.examId;
  }

  setExamId(id: string) {
    return this.examId = id;
  }

  resetExamId() {
    this.examId = null;
  }
}
