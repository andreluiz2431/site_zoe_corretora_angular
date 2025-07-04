# Desenvolvimento de Feature: Postagem em Redes Sociais

> **Observação:** Esta tela utilizará apenas recursos gratuitos das APIs Meta (Instagram) e Google Meu Negócio, limitando-se à postagem simples de imagem e descrição. Não haverá gerenciamento ou leitura de postagens externas, todo o controle será feito apenas internamente na aplicação.

## Objetivo
Criar uma tela simples para postagem de imagens e descrições no Instagram e Google Meu Negócio.

## Pré-requisitos
1. Conta de desenvolvedor Meta (Facebook/Instagram)
2. Conta Google para acesso à API do Google My Business
3. Angular Material instalado no projeto

## Etapas de Desenvolvimento

### 1. Configuração das APIs
- [ ] Criar conta de desenvolvedor no Meta for Developers
- [ ] Configurar um aplicativo no Meta Developer Console
- [ ] Ativar permissões para Instagram Basic Display API
- [ ] Configurar credenciais no Google Cloud Console para Google My Business API
- [ ] Adicionar as chaves de API no environment.ts

### 2. Criar Modelo de Dados
- **Utilizar o mesmo padrão de modelagem já existente no projeto para garantir consistência.**

```typescript
interface SocialMediaPost {
  image: File;
  description: string;
  platforms: {
    instagram: boolean;
    googleMyBusiness: boolean;
  };
}
```

### 3. Criar Serviço
1. Criar arquivo `social-media.service.ts`:
   - Implementar método para upload de imagem
   - Implementar método para postagem no Instagram
   - Implementar método para postagem no Google My Business
   - Gerenciar tokens de autenticação
   - **Seguir a estrutura e padrões de serviços já utilizados no projeto.**

### 4. Desenvolver Componente
1. Criar componente de postagem:
   ```bash
   ng generate component shared/components/social-media-post
   ```

2. Estrutura do componente:
   - Form para upload de imagem
   - Campo de texto para descrição
   - Checkboxes para seleção das plataformas
   - Botão de postagem
   - Preview da imagem selecionada
   - **Utilizar o mesmo design, estilos e estrutura dos componentes atuais do projeto.**

### 5. Interface do Usuário
1. Layout do formulário:
   - Área de drag-and-drop para imagem
   - Editor de texto para descrição
   - Opções de plataforma
   - Botão de publicação
   - Indicador de progresso
   - **Seguir o padrão visual e de usabilidade já adotado no sistema.**

### 6. Implementação do Componente HTML
```html
<mat-card>
  <mat-card-header>
    <mat-card-title>Nova Postagem</mat-card-title>
  </mat-card-header>
  
  <mat-card-content>
    <form [formGroup]="postForm">
      <!-- Área de upload -->
      <div class="image-upload-area">
        <!-- Implementar drag-and-drop -->
      </div>

      <!-- Descrição -->
      <mat-form-field appearance="fill">
        <mat-label>Descrição da postagem</mat-label>
        <textarea matInput formControlName="description"></textarea>
      </mat-form-field>

      <!-- Seleção de plataformas -->
      <div class="platforms">
        <mat-checkbox formControlName="instagram">Instagram</mat-checkbox>
        <mat-checkbox formControlName="googleMyBusiness">Google Meu Negócio</mat-checkbox>
      </div>
    </form>
  </mat-card-content>

  <mat-card-actions>
    <button mat-raised-button color="primary" (click)="submitPost()">
      Publicar
    </button>
  </mat-card-actions>
</mat-card>
```

### 7. Lógica do Componente
```typescript
// Implementar:
- Formulário reativo
- Validações
- Manipulação de arquivo de imagem
- Chamadas ao serviço
- Tratamento de erros
- Feedback visual do progresso
```

### 8. Estilização
- Criar estilos responsivos
- Implementar preview de imagem
- Adicionar animações de feedback
- Garantir boa experiência mobile

### 9. Tratamento de Erros
- Implementar mensagens de erro amigáveis
- Validar tamanho e formato de imagem
- Verificar conexão com APIs
- Feedback de sucesso/erro na postagem

### 10. Testes
- [ ] Testes unitários do serviço
- [ ] Testes unitários do componente
- [ ] Testes de integração
- [ ] Testes de usuário

### 11. Documentação
- Documentar processo de autenticação
- Documentar limites de API
- Criar guia de troubleshooting
- Documentar possíveis erros comuns

## Observações Importantes
1. Manter as chaves de API seguras
2. Seguir as diretrizes de cada plataforma
3. Implementar rate limiting
4. Considerar implementar fila de postagens
5. Monitorar uso de API e quotas

## Próximos Passos (Futuras Melhorias)
- Agendamento de posts
- Preview em tempo real
- Múltiplas imagens
- Analytics básico
- Cache de posts realizados
