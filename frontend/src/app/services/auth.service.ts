import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface User {
    id: string;
    email: string;
    role: 'admin' | 'user' | 'professor';
    // Add other user properties as needed
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<User | null>(null);
    public currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser) {
            this.currentUserSubject.next(JSON.parse(storedUser));
        }
    }

    login(email: string, password: string): Observable<User> {
        // TODO: Implement actual login logic with your backend
        // This is a mock implementation
        const mockUser: User = {
            id: '1',
            email: email,
            role: 'admin' // For testing purposes
        };
        
        localStorage.setItem('currentUser', JSON.stringify(mockUser));
        this.currentUserSubject.next(mockUser);
        return new Observable(observer => {
            observer.next(mockUser);
            observer.complete();
        });
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    isAdmin(): boolean {
        const user = this.currentUserSubject.value;
        return user?.role === 'admin';
    }

    isProfessor(): boolean {
        const user = this.currentUserSubject.value;
        return user?.role === 'professor';
    }

    getCurrentUser(): User | null {
        return this.currentUserSubject.value;
    }
} 