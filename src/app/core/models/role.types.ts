import { environment } from '../../../environments/environment';

export type RoleType = keyof typeof environment.roles;
export type PermissionsType = typeof environment.rolePermissions;

export const isAdminEmail = (email: string): boolean => {
  return environment.adminEmails.includes(email);
};

export const getInitialRole = (email: string): RoleType => {
  if (isAdminEmail(email)) {
    return 'SUPER_ADMIN';
  }
  return 'CLIENTE';
}; 