import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  private baseUrl = 'http://localhost:8081/api/principal';

  constructor(private http: HttpClient) {}

  addStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/students`, studentData);
  }
  addTeacher(teacherData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/teachers`, teacherData);
}
  getAllStudents(): Observable<any> {
  return this.http.get(`${this.baseUrl}/students`);
}
getAllTeachers(): Observable<any> {
  return this.http.get(`${this.baseUrl}/teachers`);
}
getAllAnnouncements(): Observable<any> {
  return this.http.get(`${this.baseUrl}/announcements`);
}

createAnnouncement(announcementData: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/announcements`, announcementData);
}
}
