import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter } from 'rxjs';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'front-end-internship-assignment-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {  
  faCoffee= faHome;
  faGraduationCap= faGraduationCap;
  faAngleUp=faAngleUp;
  faAngleDown=faAngleDown;
  faBooks=faBook;
  faXmark=faXmark;
  
  isHovered: boolean= false; 
  subjectName: string = '';
  bookSearch: FormControl;
  // showTable: boolean;
    showTable = { value: false };

  // isNewSearch: boolean = true;
  isNewSearchObj = { value: true };

  trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  constructor(private subjectsService: SubjectsService) {
    this.bookSearch = new FormControl('');
    // this.isNewSearch = true;
    // this.showTable.value = false;
  }

  getSearchedBooks() {
      this.isNewSearchObj.value= true;
      // console.log(this.isNewSearchObj.value)
      this.showTable.value = true;
      this.subjectName = this.bookSearch.value;
  }

  clearSearch(){
    this.bookSearch.setValue('');
  }

  dropDown() {
    const element = document.querySelector('.drop-down-items') as HTMLElement;
    element.classList.add('drop-down');
    this.isHovered = true;
  }

  close() {
    const element = document.querySelector('.drop-down-items') as HTMLElement;
    element.classList.remove('drop-down');
    this.isHovered = false;

  }

  ngOnInit(): void {
    this.bookSearch.valueChanges
      .pipe(
        debounceTime(300),
      ).
      subscribe((value: string) => {
      });
  }
}
