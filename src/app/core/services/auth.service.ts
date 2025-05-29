import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, throwError } from 'rxjs';
import { map, catchError, tap, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut, 
  sendPasswordResetEmail,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  getIdToken,
  onIdTokenChanged
} from '@angular/fire/auth';

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  roles: string[];
  permissions: string[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  public isAuthenticated$ = this.currentUser$.pipe(map(user => !!user));

  constructor(
    private auth: Auth,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    // Monitora mudanças no token de autenticação
    onIdTokenChanged(this.auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await getIdToken(firebaseUser);
        const user = this.parseFirebaseUser(firebaseUser);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.currentUserSubject.next(user);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
      }
    });

    // Recupera usuário do localStorage na inicialização
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.currentUserSubject.next(JSON.parse(storedUser));
    }
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        map(credential => this.parseFirebaseUser(credential.user)),
        catchError(this.handleError)
      );
  }

  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
      .pipe(
        map(credential => this.parseFirebaseUser(credential.user)),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(credential => {
          // Envia email de verificação
          return from(sendEmailVerification(credential.user)).pipe(
            map(() => this.parseFirebaseUser(credential.user))
          );
        }),
        catchError(this.handleError)
      );
  }

  logout(): Observable<void> {
    return from(signOut(this.auth))
      .pipe(
        tap(() => {
          this.clearAuthState();
          this.router.navigate(['/login']);
        }),
        catchError(this.handleError)
      );
  }

  sendPasswordReset(email: string): Observable<void> {
    return from(sendPasswordResetEmail(this.auth, email))
      .pipe(catchError(this.handleError));
  }

  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.roles.includes(role) ?? false;
  }

  hasPermission(permission: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.permissions.includes(permission) ?? false;
  }

  private parseFirebaseUser(firebaseUser: FirebaseUser): User {
    // Aqui você pode adicionar lógica para buscar roles e permissions do Firestore
    // Por enquanto, vamos definir um role padrão
    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL,
      emailVerified: firebaseUser.emailVerified,
      roles: ['user'],
      permissions: ['read']
    };
  }

  private clearAuthState(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  private handleError(error: any) {
    let errorMessage = 'Ocorreu um erro na autenticação';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Senha incorreta';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'Email já está em uso';
          break;
        case 'auth/weak-password':
          errorMessage = 'A senha deve ter pelo menos 6 caracteres';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Email inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuário desativado';
          break;
        default:
          errorMessage = error.message;
      }
    }
    
    return throwError(() => errorMessage);
  }
}