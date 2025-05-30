import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../core/models/user.model';
import { AuthService } from '../../../core/services/auth.service';
import { RoleService } from '../../../core/services/role.service';
import { Subscription } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;
  currentUser: User | null = null;
  private subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Carregar usuário atual
    this.subscriptions.push(
      this.authService.user$.subscribe(user => {
        this.currentUser = user;
        this.loadUsers();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private loadUsers(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.authService.listAllUsers().subscribe({
        next: (users) => {
          this.users = users;
          this.filterUsers();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erro ao carregar usuários:', error);
          this.snackBar.open('Erro ao carregar usuários: ' + error, 'Fechar', {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'bottom'
          });
          this.isLoading = false;
        }
      })
    );
  }

  filterUsers(): void {
    if (!this.searchTerm.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    const term = this.searchTerm.toLowerCase().trim();
    this.filteredUsers = this.users.filter(user => 
      user.email?.toLowerCase().includes(term) ||
      user.displayName?.toLowerCase().includes(term)
    );
  }

  canManageUser(user: User): boolean {
    if (!this.currentUser) return false;
    
    // SUPER_ADMIN pode gerenciar qualquer usuário
    if (this.roleService.hasRole(this.currentUser, 'SUPER_ADMIN')) {
      return true;
    }

    // ADMIN pode gerenciar CORRETOR e CLIENTE
    if (this.roleService.hasRole(this.currentUser, 'ADMIN')) {
      return user.roles.every(role => ['CORRETOR', 'CLIENTE'].includes(role));
    }

    return false;
  }

  getUserRoleLabel(user: User): string {
    if (user.roles.includes('SUPER_ADMIN')) return 'Super Admin';
    if (user.roles.includes('ADMIN')) return 'Admin';
    if (user.roles.includes('CORRETOR')) return 'Corretor';
    return 'Cliente';
  }

  getUserStatusColor(user: User): string {
    const lastLogin = user.lastLogin ? new Date(user.lastLogin) : null;
    if (!lastLogin) return '#dc3545'; // Vermelho para nunca logado
    
    const now = new Date();
    const diff = now.getTime() - lastLogin.getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (days <= 7) return '#28a745'; // Verde para ativo nos últimos 7 dias
    if (days <= 30) return '#ffc107'; // Amarelo para ativo nos últimos 30 dias
    return '#dc3545'; // Vermelho para inativo há mais de 30 dias
  }

  onEditUser(user: User): void {
    // TODO: Implementar edição de usuário
    console.log('Editar usuário:', user);
  }

  onDeleteUser(user: User): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirmar exclusão',
      message: `Tem certeza que deseja excluir o usuário ${user.displayName || user.email}?`,
      confirmText: 'Excluir',
      cancelText: 'Cancelar'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: dialogData,
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.isLoading = true;
        this.authService.deleteUserData(user.uid).subscribe({
          next: () => {
            this.snackBar.open('Usuário excluído com sucesso!', 'Fechar', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom'
            });
            this.loadUsers();
          },
          error: (error) => {
            console.error('Erro ao excluir usuário:', error);
            this.snackBar.open('Erro ao excluir usuário: ' + error, 'Fechar', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'bottom'
            });
            this.isLoading = false;
          }
        });
      }
    });
  }
} 