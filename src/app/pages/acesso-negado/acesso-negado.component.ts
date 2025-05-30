import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-acesso-negado',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="acesso-negado">
      <div class="container">
        <div class="content">
          <h1>Acesso Negado</h1>
          <p>Você não tem permissão para acessar esta página.</p>
          <div class="actions">
            <a routerLink="/" class="btn btn-primary">Voltar para Home</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .acesso-negado {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--bg-secondary);
      padding: 20px;
    }

    .container {
      max-width: 600px;
      width: 100%;
    }

    .content {
      background-color: var(--bg-color);
      padding: 40px;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      text-align: center;
    }

    h1 {
      color: var(--red-primary);
      margin-bottom: 20px;
    }

    p {
      color: var(--text-color);
      margin-bottom: 30px;
    }

    .actions {
      margin-top: 20px;
    }

    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: var(--border-radius);
      text-decoration: none;
      font-weight: 500;
      transition: background-color var(--transition-speed);
    }

    .btn-primary {
      background-color: var(--red-primary);
      color: white;
    }

    .btn-primary:hover {
      background-color: var(--red-secondary);
    }
  `]
})
export class AcessoNegadoComponent {} 