import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-page">
      <div class="container">
        <div class="content">
          <h1>Área Administrativa</h1>
          <p>Bem-vindo à área administrativa da Zoe Corretora.</p>
          
          <!-- Menu administrativo -->
          <nav class="admin-nav">
            <a routerLink="usuarios" class="nav-item">
              <span class="icon">👥</span>
              <span>Usuários</span>
            </a>
            <a routerLink="cotacoes" class="nav-item">
              <span class="icon">📋</span>
              <span>Cotações</span>
            </a>
            <a routerLink="relatorios" class="nav-item">
              <span class="icon">📊</span>
              <span>Relatórios</span>
            </a>
            <a routerLink="conteudo" class="nav-item">
              <span class="icon">📝</span>
              <span>Conteúdo</span>
            </a>
          </nav>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-page {
      padding: 40px 0;
      background-color: var(--bg-secondary);
      min-height: 100vh;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .content {
      background-color: var(--bg-color);
      padding: 40px;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
    }

    h1 {
      color: var(--blue-primary);
      margin-bottom: 20px;
    }

    p {
      color: var(--text-color);
      margin-bottom: 40px;
    }

    .admin-nav {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background-color: var(--bg-secondary);
      border-radius: var(--border-radius);
      text-decoration: none;
      color: var(--text-color);
      transition: transform var(--transition-speed), box-shadow var(--transition-speed);
    }

    .nav-item:hover {
      transform: translateY(-5px);
      box-shadow: var(--box-shadow);
    }

    .icon {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    @media (max-width: 768px) {
      .admin-nav {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AdminComponent {} 