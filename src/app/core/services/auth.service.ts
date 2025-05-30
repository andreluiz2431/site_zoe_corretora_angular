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
  onIdTokenChanged,
  getAuth
} from '@angular/fire/auth';
import { User } from '../models/user.model';
import { getInitialRole } from '../models/role.types';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  isAuthenticated$: Observable<boolean> = this.user$.pipe(
    map(user => !!user)
  );

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
        const user = await this.parseFirebaseUser(firebaseUser);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this.userSubject.next(user);
        this.redirectBasedOnRole(user);
      } else {
        this.clearAuthState();
      }
    });

    // Recupera usuário do localStorage na inicialização
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.userSubject.next(user);
      this.redirectBasedOnRole(user);
    }
  }

  private redirectBasedOnRole(user: User): void {
    if (!user) return;

    // Verifica se está na página de login
    if (this.router.url === '/login') {
      if (user.roles.includes('SUPER_ADMIN') || user.roles.includes('ADMIN')) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/cliente']);
      }
    }
  }

  login(email: string, password: string): Observable<User> {
    return from(signInWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(credential => this.parseFirebaseUser(credential.user)),
        tap(user => this.redirectBasedOnRole(user)),
        catchError(this.handleError)
      );
  }

  loginWithGoogle(): Observable<User> {
    const provider = new GoogleAuthProvider();
    return from(signInWithPopup(this.auth, provider))
      .pipe(
        switchMap(credential => this.parseFirebaseUser(credential.user)),
        tap(user => this.redirectBasedOnRole(user)),
        catchError(this.handleError)
      );
  }

  register(email: string, password: string): Observable<User> {
    return from(createUserWithEmailAndPassword(this.auth, email, password))
      .pipe(
        switchMap(credential => {
          // Envia email de verificação
          return from(sendEmailVerification(credential.user)).pipe(
            switchMap(() => this.parseFirebaseUser(credential.user))
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
    const user = this.userSubject.value;
    return user?.roles?.includes(role) ?? false;
  }

  private async parseFirebaseUser(firebaseUser: FirebaseUser): Promise<User> {
    if (!firebaseUser.email) {
      throw new Error('Email é obrigatório');
    }

    const initialRole = getInitialRole(firebaseUser.email);

    return {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
      displayName: firebaseUser.displayName || undefined,
      photoURL: firebaseUser.photoURL || undefined,
      emailVerified: firebaseUser.emailVerified,
      roles: [initialRole],
      createdAt: firebaseUser.metadata?.creationTime ? new Date(firebaseUser.metadata.creationTime) : new Date(),
      lastLogin: firebaseUser.metadata?.lastSignInTime ? new Date(firebaseUser.metadata.lastSignInTime) : new Date()
    };
  }

  private clearAuthState(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.userSubject.next(null);
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

  /**
   * Verifica se o usuário atual é admin
   */
  isAdmin(): boolean {
    const user = this.userSubject.value;
    if (!user) return false;
    return user.roles.includes('ADMIN') || user.roles.includes('SUPER_ADMIN');
  }

  /**
   * Lista todos os usuários do Firebase Authentication
   * Simplificado para desenvolvimento - apenas retorna usuários mockados
   */
  listAllUsers(): Observable<User[]> {
    if (!this.isAdmin()) {
      return throwError(() => new Error('Usuário não tem permissão para listar usuários.'));
    }

    // Dados mockados para desenvolvimento
    const mockUsers: User[] = [
      {
        uid: '1',
        email: 'admin@zoecorretora.com.br',
        displayName: 'Administrador',
        roles: ['SUPER_ADMIN'],
        emailVerified: true,
        createdAt: new Date(),
        lastLogin: new Date()
      },
      {
        uid: '2',
        email: 'corretor@zoecorretora.com.br',
        displayName: 'Corretor Exemplo',
        roles: ['CORRETOR'],
        emailVerified: true,
        createdAt: new Date(),
        lastLogin: new Date()
      },
      {
        uid: '3',
        email: 'cliente@example.com',
        displayName: 'Cliente Exemplo',
        roles: ['CLIENTE'],
        emailVerified: false,
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 dias atrás
        lastLogin: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)  // 15 dias atrás
      }
    ];

    // Simula um delay de rede
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next(mockUsers);
        subscriber.complete();
      }, 1000);
    });
  }

  /**
   * Atualiza os dados de um usuário
   */
  updateUserData(uid: string, data: Partial<User>): Observable<void> {
    if (!this.isAdmin()) {
      return throwError(() => new Error('Usuário não tem permissão para atualizar usuários.'));
    }

    // Por enquanto, apenas simula sucesso
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next();
        subscriber.complete();
      }, 1000);
    });
  }

  /**
   * Remove um usuário
   */
  deleteUserData(uid: string): Observable<void> {
    if (!this.isAdmin()) {
      return throwError(() => new Error('Usuário não tem permissão para excluir usuários.'));
    }

    // Por enquanto, apenas simula sucesso
    return new Observable(subscriber => {
      setTimeout(() => {
        subscriber.next();
        subscriber.complete();
      }, 1000);
    });
  }
}