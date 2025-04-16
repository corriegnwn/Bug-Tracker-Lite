import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bug } from '../../../shared/bug.model'; 

@Injectable({providedIn: 'root'}) // für Dependency Injection in bug-form und bug-list
export class BugService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getBugs(): Observable<Bug[]> {
    return this.http.get<Bug[]>(`${this.baseUrl}/bugs`);
  }

  createBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(`${this.baseUrl}/bugs`, bug);
  }
}