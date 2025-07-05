# Desenvolvimento de Feature: Postagem em Redes Sociais

> **Observação:** Esta tela utilizará apenas recursos gratuitos das APIs Meta (Instagram) e Google Meu Negócio, limitando-se à postagem simples de imagem e descrição. Não haverá gerenciamento ou leitura de postagens externas, todo o controle será feito apenas internamente na aplicação.

## Objetivo
Criar uma tela simples para postagem de imagens e descrições no Instagram e Google Meu Negócio.

## Pré-requisitos
- [x] Conta de desenvolvedor Meta (Facebook/Instagram)
- [x] Conta Google para acesso à API do Google My Business
- [x] Angular Material instalado no projeto

## Etapas de Desenvolvimento

### 1. Configuração das APIs
- [ ] Criar conta de desenvolvedor no Meta for Developers
- [ ] Configurar um aplicativo no Meta Developer Console
- [ ] Ativar permissões para Instagram Basic Display API
- [ ] Configurar credenciais no Google Cloud Console para Google My Business API
- [ ] Adicionar as chaves de API no environment.ts

### 2. Criar Modelo de Dados
- [x] Utilizar o mesmo padrão de modelagem já existente no projeto para garantir consistência.

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
- [x] Criar arquivo `social-media.service.ts`
- [x] Implementar método para upload de imagem (stub)
- [x] Implementar método para postagem no Instagram (stub)
- [x] Implementar método para postagem no Google My Business (stub)
- [x] Gerenciar tokens de autenticação (stub)
- [x] Seguir a estrutura e padrões de serviços já utilizados no projeto.

### 4. Desenvolver Componente
- [x] Criar componente de postagem
- [x] Form para upload de imagem
- [x] Campo de texto para descrição
- [x] Checkboxes para seleção das plataformas
- [x] Botão de postagem
- [x] Preview da imagem selecionada
- [x] Utilizar o mesmo design, estilos e estrutura dos componentes atuais do projeto.

### 5. Interface do Usuário
- [x] Layout do formulário:
  - [x] Área de upload customizada para imagem
  - [x] Editor de texto para descrição
  - [x] Opções de plataforma responsivas e adaptadas ao dark mode
  - [x] Botão de publicação estilizado e responsivo
  - [x] Indicador de progresso (a implementar)
  - [x] Seguir o padrão visual e de usabilidade já adotado no sistema.

### 6. Implementação do Componente HTML
- [x] Estrutura HTML adaptada para o padrão do projeto (sem card duplo, responsivo, dark mode)

### 7. Lógica do Componente
- [x] Formulário reativo
- [ ] Validações
- [x] Manipulação de arquivo de imagem
- [x] Chamadas ao serviço (stub)
- [ ] Tratamento de erros
- [ ] Feedback visual do progresso

### 8. Integração com Área Administrativa
- [x] Adicionar um botão ou link de redirecionamento para a tela de postagem de redes sociais no menu da área administrativa (admin). O usuário deve conseguir acessar facilmente a funcionalidade de postagem a partir do painel admin.

### 9. Estilização
- [x] Criar estilos responsivos
- [x] Implementar preview de imagem
- [x] Adicionar animações de feedback (parcial)
- [x] Garantir boa experiência mobile

### 10. Tratamento de Erros
- [ ] Implementar mensagens de erro amigáveis
- [ ] Validar tamanho e formato de imagem
- [ ] Verificar conexão com APIs
- [ ] Feedback de sucesso/erro na postagem

### 11. Testes
- [ ] Testes unitários do serviço
- [ ] Testes unitários do componente
- [ ] Testes de integração
- [ ] Testes de usuário

### 12. Documentação
- [ ] Documentar processo de autenticação
- [ ] Documentar limites de API
- [ ] Criar guia de troubleshooting
- [ ] Documentar possíveis erros comuns

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
