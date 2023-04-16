import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SubjectsService } from '../../core/services/subjects.service';
import { Book } from 'src/app/core/models/book-response.model';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'front-end-internship-assignment-trending-subjects',
  templateUrl: './trending-subjects.component.html',
  styleUrls: ['./trending-subjects.component.scss'],
})
export class TrendingSubjectsComponent implements OnInit {

    faCoffee= faHome;
  faGraduationCap= faGraduationCap;
  faAngleUp=faAngleUp;
  faAngleDown=faAngleDown;
  faBooks=faBook;

  isHovered: boolean= false; 

  subjectName: string = '';

  allBooks: Book[] = [];

  isNewSearch = { value: true };

  // showTable: boolean;
      showTable = { value: false };


    trendingSubjects: Array<any> = [
    { name: 'JavaScript' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Harry Potter' },
    { name: 'Crypto' },
  ];

  constructor(
    private route: ActivatedRoute,
    private subjectsService: SubjectsService
  ) {
    this.showTable.value = false;
  }

  getAllBooks() {
      this.showTable.value = true;
      this.isNewSearch.value=true;
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
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subjectName = params.get('name') || '';
      this.getAllBooks();
    });
  }

}
