import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PetService, AuthenticationService, AlertService, DataService } from '../_services';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, FormControl } from '@angular/forms';
import { User } from '../_models';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent implements OnInit {

  petInfo: any;

  currentUser: User;
  selectedId: number;
  action: string;
  reservation: string;

  examId: string = null;

  addExamForm: FormGroup;
  showMedApp = false;
  showVaccination = false;

  submitted = false;
  loading = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private authService: AuthenticationService,
              private alertService: AlertService,
              private petService: PetService,
              private dataService: DataService
            ) { }

ngOnInit() {
    this.currentUser = this.authService.CurrentUser;

    this.addExamForm = this.formBuilder.group({
      description: ['', Validators.required],
      vaccination: this.formBuilder.group({
        vacc_desc: ['']
      }),
      medicine: this.formBuilder.group({
        medDesc: [''],
        medDateFrom: [''],
        medDateTo: ['']
      })
    });

    this.route.params.subscribe(params => {
      this.selectedId = params['id'];
      this.action = params['action'];
      this.reservation = params['reservation'] ? params['reservation'] : null;
      if (this.reservation) { // if vet is examinating pet with appointment
        this.examId = this.dataService.getExamId();
        console.log(this.dataService.getExamId());
        this.dataService.resetExamId();
      }
    });

    this.petService.getPetProfile('basic', this.selectedId)
      .subscribe(data => {
        if (data.info.success) {
          this.petInfo = data.petInfo;
        } else {
          console.log(data.info.msg);
        }
      },
      err => console.log(err)
      );

  }

  get f() { return this.addExamForm['controls']; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.addExamForm.invalid) {
        return;
    }

    this.loading = true;

    const vaccination = this.showVaccination ? {
      description: this.showVaccination ? this.f.vaccination['controls'].vacc_desc.value : null
    } : null;

    const medication = this.showMedApp ? {
      description: this.f.medicine['controls'].medDesc.value,
      date_from: this.f.medicine['controls'].medDateFrom.value,
      date_to: this.f.medicine['controls'].medDateTo.value
    } : null;

    const examInfo = {
      exam_id: this.examId,
      exam_report: {
        pet_id: this.selectedId,
        description: this.f.description.value
      },
      vaccination: vaccination,
      medication: medication
    };

    this.petService.addExam(examInfo)
    .subscribe(
      data => {
        if (!data.success) {
            this.loading = false;
        } else { // create successfull
          this.alertService.success('Exam succesfully saved!', true);
          this.router.navigate(['/home']);
        }
      },
      error => {
        this.alertService.error('Error!');
        this.loading = false;
      });
  }

  toggleShowVaccination() {
    if (!this.showVaccination) {
      this.f.vaccination['controls'].vacc_desc.setValidators([Validators.required]);
    } else {
      this.f.vaccination.reset();
    }
    this.showVaccination = !this.showVaccination;
  }

  toggleShowMedApp() {
    if (!this.showMedApp) {
      this.f.medicine['controls'].medDesc.setValidators([Validators.required]);
      this.f.medicine['controls'].medDateFrom.setValidators([Validators.required]);
      this.f.medicine['controls'].medDateTo.setValidators([Validators.required]);
    } else {
      this.f.medicine.reset();
    }
    this.showMedApp = !this.showMedApp;
  }

  setFromDateValidator() {
    const dateTo = new Date(this.f.medicine['controls'].medDateTo.value);
    this.f.medicine['controls'].medDateTo.setValidators([Validators.required]);
    this.f.medicine['controls'].medDateTo.updateValueAndValidity();
    this.f.medicine['controls'].medDateFrom.setValidators([Validators.required, fromDateHigherThanToDateValidator(dateTo)]);
    this.f.medicine['controls'].medDateFrom.updateValueAndValidity();
  }

  setToDateValidator() {
    const dateFrom = new Date(this.f.medicine['controls'].medDateFrom.value);
    this.f.medicine['controls'].medDateFrom.setValidators([Validators.required]);
    this.f.medicine['controls'].medDateFrom.updateValueAndValidity();
    this.f.medicine['controls'].medDateTo.setValidators([Validators.required, toDateLessThanFromDateValidator(dateFrom)]);
    this.f.medicine['controls'].medDateTo.updateValueAndValidity();
  }

}
/* checks if from date is less than to date -> From Date Field Validator */
function fromDateHigherThanToDateValidator(toDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const fromDate = new Date(control.value).getTime(); // Read From Date from form's control
    const forbidden = fromDate > toDate.getTime(); // check for validity
    return forbidden ? {'fromDateHigherThanToDate': {value: control.value}} : null; // if not valid return error object
  };
}
/* checks if from date is less than to date -> To Date Field Validator */
function toDateLessThanFromDateValidator(fromDate: Date): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const toDate = new Date(control.value).getTime();  // Read To Date from form's control
    const forbidden = fromDate.getTime() > toDate; // check for validity
    return forbidden ? {'toDateLessThanFromDate': {value: control.value}} : null; // if not valid return error object
  };
}
