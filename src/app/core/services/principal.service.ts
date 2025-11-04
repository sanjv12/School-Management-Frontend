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
deleteStudent(id: number) {
  return this.http.post(`http://localhost:8081/api/principal/students/delete/${id}`, {},{ responseType: 'text' });
}

updateStudent(id: number, student: any) {
  return this.http.post(`http://localhost:8081/api/principal/students/update/${id}`, student,{ responseType: 'text' });
}
deleteTeacher(id:number){
  return this.http.post(`http://localhost:8081/api/principal/teachers/delete/${id}`, {},{ responseType: 'text' });
}
updateTeacher(id: number, teacher: any) {
  return this.http.post(`http://localhost:8081/api/principal/teachers/update/${id}`, teacher,{ responseType: 'text' });
}
checkUsernameExists(username: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.baseUrl}/users/exists/${username}`);
}

}
