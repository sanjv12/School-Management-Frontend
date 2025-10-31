import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth';
  private userRole: string | null = null; // Store the role in the service

  constructor(private http: HttpClient,private router: Router) { }

  public getRole(): string | null {
    return this.userRole || localStorage.getItem('userRole'); 
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
    // 1. Clear the local service state
    this.userRole = null;
    
    // 2. Clear stored items from browser storage
    localStorage.removeItem('userRole');
    localStorage.removeItem('authToken'); // Assuming you might use one
    // localStorage.clear();
    // 3. Navigate the user back to the login page
    this.router.navigate(['/login']);
    
    // Optional: Call a backend logout endpoint if needed (e.g., to invalidate a session/token)
    // this.http.post(this.apiUrl + '/logout', {}).subscribe(() => console.log('Backend logged out'));
  }
}