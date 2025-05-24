import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = new AuthService();
  const router = new Router();

  if (authService.isAuthenticated()) {
    return true;
  }

  // Redirect to the login page
  return router.parseUrl('/login');
};