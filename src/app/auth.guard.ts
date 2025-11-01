import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');
    const userRole = localStorage.getItem('userRole');

    if (!userId || !username || !userRole) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRoles: string[] = route.data['roles'];

    if (!requiredRoles || requiredRoles.includes(userRole)) {
      // Allowed to access
      return true;
    } else {
      alert('Access denied. You are not authorized to view this page.');
      this.router.navigate(['/login']);
      return false;
    }
  }
}
