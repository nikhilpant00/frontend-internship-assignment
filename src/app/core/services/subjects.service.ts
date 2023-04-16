import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { BookResponse } from 'src/app/core/models/book-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {

  constructor(private apiService: ApiService) {}

  getAllBooks(subjectName: string, page?: number, pageSize?: number): Observable<BookResponse> {
    const limit = 100;
    if(page && pageSize){
      const limit=10;
      const offset = (page - 1) * pageSize;
      return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?offset=${offset}&limit=${limit}`);
    }
    return this.apiService.get(`/subjects/${subjectName.toLowerCase().split(' ').join('_')}.json?limit=${limit}`);
  }
}
