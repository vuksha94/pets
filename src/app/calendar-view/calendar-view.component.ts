import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  addMinutes,
  compareAsc
} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { PetService, AuthenticationService, DataService } from '../_services';
import { User } from '../_models';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  },
  green: {
    primary: '#00ff00',
    secondary: '#00fff0'
  }

};

@Component({
  selector: 'app-calendar-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild('modalAppointmentRes') modalAppointmentRes: TemplateRef<any>;
  @ViewChild('modalPetExam') modalPetExam: TemplateRef<any>;
  @ViewChild('modalPetOwner') modalPetOwner: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  // exclude sunday
  excludeDays: number[] = [0];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  // date to show in modalAppointmentRes
  reservationDate: Date;

  currentUser: User = null;
  allEventDetails: any[];
  clickedEventDetails: any;

  refresh: Subject<any> = new Subject();

  activeDayIsOpen: boolean = false;
  successReservation: boolean = false;
  appointmentCanceled: boolean = false;
  modalPetExamReference: NgbModalRef;
  modalPetOwnerReference: NgbModalRef;

  events: CalendarEvent[] = [];
  constructor(private modal: NgbModal,
              private petService: PetService,
              private authenticationService: AuthenticationService,
              private dataService: DataService) {}

  ngOnInit() {
    this.currentUser = this.authenticationService.CurrentUser; // get currently logged user info
    if (this.currentUser.user_data.rola === 'Veterinarian') {
      this.view = CalendarView.Day; // set view of calendar to day if user is veterinarian
    }
    this.petService.getAppointedExaminations()
    .subscribe(
      data => {
        this.allEventDetails = data;
        if (data && data.length) {
          this.addEvents(data); // add events to array of events
          this.refresh.next(); // refresh the calendar
        }
      }
    );
  }
  addEvents(data: any[]): void {
    for (let i = 0; i < data.length; i++) {
      this.addAppointment(data[i]); // add every single event to array of events
    }
  }

  addAppointment(data: any): void {
    const appointmentTime = new Date(data.appointment_time);
    let eventToAdd: any;
    if (this.currentUser.user_data.rola === 'Pet owner') {
      // don't add apointment to calendar if is examined and is not user's pet
      if (data.examined === '1' && this.currentUser.user_data.user_id !== data.user_id) {
        return;
      }
      const usersPet = this.currentUser.user_data.user_id === data.user_id; // flag -> is pet's profile from user
      const title = usersPet ? data.name : 'Reserved'; // if it's user's pet then show name, else show 'Reserved'
      // color red for reserved, for user's pet: green if it is examined, yellow if not yet
      const color = usersPet ? (data.examined === '1' ? colors.green : colors.yellow) : colors.red;
      eventToAdd = {
        title: title,
        start: appointmentTime,
        end: addMinutes(appointmentTime, 30),
        color: color
      };
    } else if (this.currentUser.user_data.rola === 'Veterinarian') {
      eventToAdd = {
        title: data.breed,
        start: appointmentTime,
        end: addMinutes(appointmentTime, 30),
        color: data.examined === '1' ? colors.green : colors.blue
      };
    }
    this.allEventDetails = [...this.allEventDetails, data]; // some helper array
    this.events = [...this.events, eventToAdd ]; // finally add to array of events
  }

  hourSegmentClicked(date: Date) {
    if (this.currentUser.user_data.rola === 'Pet owner') {
      /* compareAsc -> Compare the two dates and return 1 if the first date is after the second,
      * -1 if the first date is before the second or 0 if dates are equal.
      */
      if (compareAsc(new Date(), date) > 0) {
        console.log('Ne moze');
        return;
      }
      console.log(date);
      this.reservationDate = date;
      this.successReservation = false;
      this.modal.open(this.modalAppointmentRes, { size: 'sm' });
    } else { // Vet

    }

  }

  saveReservation() {
    const obj = {
      user_id: this.currentUser.user_data.user_id,
      name: this.currentUser.pet_data.name,
      appointment_time: this.reservationDate
    };

    this.petService.addExamAppointment(obj)
    .subscribe(data => {
      if (data.success) {
        this.addAppointment(data.data);
        this.refresh.next();
        this.successReservation = true;
      }
    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    this.viewDate = date;
    this.view = CalendarView.Day;
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    // single out clicked event from allEvents
    this.clickedEventDetails = this.allEventDetails.filter(
      appointment => compareAsc( new Date(appointment.appointment_time), event.start) === 0
      )[0];
    if (this.currentUser.user_data.rola === 'Pet owner') {
      if (this.clickedEventDetails.user_id === this.currentUser.user_data.user_id) { // only for user's appointments
      this.appointmentCanceled = false;
      this.modalPetOwnerReference = this.modal.open(this.modalPetOwner);
      }
    } else { // Vet
        this.modalPetExamReference = this.modal.open(this.modalPetExam, { size: 'sm' });
    }
  }

  closePetExamModal() {
    this.modalPetExamReference.close();
  }

  closePetOwnerModal() {
    this.modalPetOwnerReference.close();
  }

  setGlobalData() {
    // for exam_id in exam/add/{id};
    this.dataService.setExamId(this.clickedEventDetails.exam_id);
  }

  clickPetExam() {
    this.setGlobalData();
    this.closePetExamModal();
  }

  clickCancelApp() {
    this.events = this.events.filter(
      event => compareAsc( this.clickedEventDetails.appointment_time, event.start) !== 0
      );
      this.petService.cancelExam(this.clickedEventDetails.exam_id)
      .subscribe(
        data => {
          if (data.success) {
            this.closePetOwnerModal();
          }
        }
      );
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'Exam',
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true
        }
      }
    ];
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
