export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDxYbrb7MCCEYZciDCs4_G60fNuUDKmNow",
    authDomain: "zoecorretoraseguros.firebaseapp.com",
    projectId: "zoecorretoraseguros",
    storageBucket: "zoecorretoraseguros.firebasestorage.app",
    messagingSenderId: "141379894689",
    appId: "1:141379894689:web:e74166014c0f1d97b51fe0",
    measurementId: "G-37WW41B47H"
  },
  // Lista de emails com acesso administrativo
  adminEmails: [
    'alm28062001@gmail.com',
    'andremontanha.aluno@unipampa.edu.br',
  ],
  
  // Configurações de roles e permissões
  roles: {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    CORRETOR: 'CORRETOR',
    CLIENTE: 'CLIENTE'
  },
  
  // Permissões por role
  rolePermissions: {
    SUPER_ADMIN: ['*'], // Acesso total
    ADMIN: [
      'manage_clients',
      'manage_quotes',
      'view_reports',
      'manage_content'
    ],
    CORRETOR: [
      'view_clients',
      'create_quotes',
      'edit_quotes',
      'view_own_reports'
    ],
    CLIENTE: [
      'view_own_profile',
      'view_own_quotes',
      'request_quotes',
      'view_own_documents'
    ]
  }
}; 