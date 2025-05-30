import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { RoleType, isAdminEmail } from '../models/role.types';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor() {}

  /**
   * Verifica se o email é administrativo
   */
  isAdminEmail(email: string): boolean {
    return isAdminEmail(email);
  }

  /**
   * Verifica se uma role é válida
   */
  isValidRole(role: string): role is RoleType {
    return role in environment.roles;
  }

  /**
   * Verifica se o usuário tem uma determinada role
   */
  hasRole(user: User | null, role: RoleType): boolean {
    if (!user) return false;
    return user.roles?.includes(role) || false;
  }

  /**
   * Verifica se o usuário tem uma determinada permissão
   */
  hasPermission(user: User | null, permission: string): boolean {
    if (!user || !user.roles) return false;
    
    // Super admin tem todas as permissões
    if (user.roles.includes('SUPER_ADMIN')) {
      return true;
    }

    // Verifica permissões específicas da role
    return user.roles.some(role => {
      // Verifica se a role é válida antes de acessar as permissões
      if (this.isValidRole(role)) {
        const permissions = environment.rolePermissions[role];
        return permissions?.includes(permission) || false;
      }
      return false;
    });
  }

  /**
   * Obtém todas as permissões de um usuário
   */
  getUserPermissions(roles: RoleType[]): string[] {
    if (!roles) return [];

    const permissions = new Set<string>();

    roles.forEach((role: RoleType) => {
      if (role === 'SUPER_ADMIN') {
        permissions.add('*');
        return;
      }

      const rolePermissions = environment.rolePermissions[role];
      if (rolePermissions) {
        rolePermissions.forEach((permission: string) => permissions.add(permission));
      }
    });

    return Array.from(permissions);
  }

  /**
   * Lista todas as roles disponíveis (exceto SUPER_ADMIN para não-super-admins)
   */
  getAvailableRoles(isSuperAdmin: boolean): RoleType[] {
    const roles = Object.keys(environment.roles) as RoleType[];
    if (!isSuperAdmin) {
      return roles.filter(role => role !== 'SUPER_ADMIN');
    }
    return roles;
  }
} 