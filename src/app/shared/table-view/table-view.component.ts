
import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { Book } from 'src/app/core/models/book-response.model';
import { SubjectsService } from '../../core/services/subjects.service';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'front-end-internship-assignment-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class TableViewComponent implements OnChanges {
  @Input() booksList: Book[] = [];
  @Input() subjectName: string = '';
  @Input() isNewSearch: { value: boolean } = { value: true };
  // @Input() showTable: boolean = false;
  @Input() showTable: { value: boolean } = { value: false };


  faArrowRight=faArrowRight;
  faArrowLeft=faArrowLeft;


  isLoading: boolean = false;
  allBooks: Book[] = [];
  paginationArr: number[] = [];
  fetchComplete: boolean=false;
  noResult: boolean= false;

  page: number;
  pageSize: number;
  cashedBooks: Book[][];

  constructor(private subjectsService: SubjectsService, private cdr: ChangeDetectorRef) {
    this.page = 1;
    this.pageSize = 10;
    this.cashedBooks = [];
  }

  getSearchedBooks() {
    this.isLoading = true;
    this.showTable.value = false;
    this.fetchComplete =false;
    this.noResult=false;

    if (this.isNewSearch.value) {
      this.cashedBooks = [];
      this.paginationArr= [];
      this.isNewSearch.value = false;
      this.page=1;
    }

    this.subjectsService.getAllBooks(this.subjectName, this.page, this.pageSize).subscribe((data) => {
      if(!data.works.length){
        this.noResult=true;
      }
      this.isLoading = false;
      this.fetchComplete= true;
      this.allBooks = data?.works;
      this.cashedBooks[this.page] = this.allBooks;
      this.showTable.value = true;
      this.paginationArr.push(this.paginationArr.length + 1);
      this.cdr.detectChanges();
    });
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      if (this.cashedBooks[this.page]) {
        this.allBooks = this.cashedBooks[this.page];
      } else {
        this.getSearchedBooks();
      }
    }
  }

  nextPage() {
    if(!this.noResult) 
      this.page++;
    if(this.page<this.paginationArr.length)
      this.page++;
    if (this.cashedBooks[this.page]) {
      this.allBooks = this.cashedBooks[this.page];
    } else if(!this.noResult){
      this.getSearchedBooks();
    }
  }

  paginatedPage(pageNo: number) {
    this.allBooks = this.cashedBooks[pageNo];
    this.page = pageNo;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onchane', this.isNewSearch.value);
    // console.log('show', this.showTable);
    console.log(changes)
    if(this.subjectName)
    this.getSearchedBooks();
  }
}

