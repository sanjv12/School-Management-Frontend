import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 
// import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private userRole: string | null = null; // Store the role in the service
  private username: string | null = null;
  private userid: number | null = null;

  constructor(private http: HttpClient,private router: Router) { }

  public getRole(): string | null {
    return this.userRole || localStorage.getItem('userRole'); 
  }
  public getUserName():string | null{
    return this.username || localStorage.getItem('username');
  }
  public getUserId(): number | null {
    const storedId = localStorage.getItem('userId');
    return storedId ? Number(storedId) : this.userid;
  }
  /**
   * Sends credentials and handles the role string returned by the backend.
   * @returns An Observable of the user's role string.
   */

  login(username: string, password: string): Observable<string> {
    const loginPayload = { username, password };

    return this.http.post(this.apiUrl + '/login', loginPayload, { responseType: 'text' }).pipe(

      map((role: string) => role.trim().toLowerCase()), // Clean up and normalize the role
      
      tap((role: string) => {
        // Store the role for global access and future navigation checks
        this.userRole = role; 
        localStorage.setItem('userRole', role);
        if(role==='principal'){
          this.userid=0;
          localStorage.setItem('userId',"0");
        } else {
            localStorage.setItem('username', username);
            this.fetchUserId(username).subscribe({
              next: (userId: number) => {
                this.userid = userId;
                console.log(userId);
                localStorage.setItem('userId', userId.toString());
              },
              error: (err) => {
                console.error('Failed to fetch user ID:', err);
              }
            });
        }
      }),
      
      catchError((error) => {
        console.error('Login failed in AuthService:', error);
        // Handle specific errors
        let errorMessage = 'Login failed. Please check your credentials.';
        if (error.status === 401) {
          errorMessage = 'Invalid username or password.';
        }
        return throwError(() => new Error(errorMessage));
      })
    );
  }
  private fetchUserId(username: string): Observable<number> {
    return this.http.get<{ id: number }>(`${this.apiUrl}/${username}`,{ responseType: 'text'as 'json' })
    .pipe(map(res => Number(res)));
  }
  
  changePassword(username: string, oldPassword: string, newPassword: string): Observable<string> {
    const params = new HttpParams()
      .set('username', username)
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);

    return this.http.post(`${this.apiUrl}/change-password`, null, {
      params,
      responseType: 'text'
    });
  }
  public logout(): void {
  this.userRole = null;
  this.username = null;
  this.userid = null;
  localStorage.removeItem('userRole');
  localStorage.removeItem('username');
  localStorage.removeItem('userId');
  // localStorage.removeItem('authToken'); // optional
  this.router.navigate(['/login']);
}
}