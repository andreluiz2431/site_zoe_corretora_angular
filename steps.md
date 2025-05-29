# Especificações do Projeto - Zoe Corretora

## 🏠 Página Inicial (Home)
- [x] Criar banner principal rotativo com imagens profissionais de seguros e consórcios
  - Dimensões recomendadas: 1920x600px
  - Formato: JPG/PNG otimizados
  - Textos overlay com fonte Roboto
- [x] Corrigir ou implementar de forma diferente o navbar
  - Responsivo

## 🔐 Core (Implementação)

### Autenticação
- [x] Melhorar AuthService
  - [x] Implementar refresh token
  - [x] Adicionar persistência de estado
  - [x] Implementar logout com limpeza de dados
  - [x] Adicionar interceptor para tokens
  - [x] Implementar sistema de roles/permissões

### Guards
- [x] Melhorar AuthGuard
  - [x] Adicionar verificação de roles
  - [x] Implementar redirecionamento inteligente
  - [x] Adicionar guard para rotas públicas
- [x] Criar RoleGuard
  - [x] Verificação de permissões específicas
  - [x] Suporte a múltiplas roles
  - [x] Redirecionamento baseado em perfil

### Interceptors
- [ ] Criar AuthInterceptor
  - Injeção automática de tokens
  - Tratamento de 401/403
  - Refresh token automático
- [ ] Criar ErrorInterceptor
  - Tratamento global de erros
  - Logging centralizado
  - Feedback para o usuário
- [ ] Criar LoadingInterceptor
  - Controle global de loading
  - Timeout handling
  - Cancelamento de requisições

### Models
- [ ] Expandir UserModel
  - Adicionar perfil completo
  - Preferências do usuário
  - Histórico de ações
  - Notificações
- [ ] Melhorar QuoteRequestModel
  - Adicionar validações
  - Expandir tipos de cotação
  - Adicionar campos customizados
- [ ] Criar PolicyModel
  - Detalhes completos da apólice
  - Histórico de renovações
  - Documentos vinculados
- [ ] Criar NotificationModel
  - Tipos de notificação
  - Status de leitura
  - Ações vinculadas

### Services
- [ ] Expandir AuthService
  - Integração com Firebase
  - Social login (Google)
  - Recuperação de senha
  - Verificação de email
- [ ] Melhorar QuoteService
  - Cache de cotações
  - Retry mechanism
  - Websocket para atualizações
- [ ] Criar NotificationService
  - Push notifications
  - Email notifications
  - SMS notifications
- [ ] Criar StorageService
  - Upload de arquivos
  - Gerenciamento de documentos
  - Integração com Firebase Storage

### Utilitários
- [ ] Criar ValidatorService
  - Validações customizadas
  - Máscaras de input
  - Formatadores
- [ ] Criar LoggerService
  - Logging estruturado
  - Integração com Sentry
  - Níveis de log
- [ ] Criar CacheService
  - Cache local
  - Cache persistente
  - Política de expiração

## 👥 Área do Cliente (Atualizado)
- [x] Sistema de login
  - [x] Autenticação básica
  - [x] Remember me
  - [x] Recuperação de senha
  - [x] Login social
  - [x] Verificação em duas etapas
  - [x] Bloqueio por tentativas
- [ ] Perfil do usuário
  - [ ] Dados pessoais
  - [ ] Preferências
  - [ ] Histórico de atividades
  - [ ] Gerenciamento de dispositivos
- [ ] Dashboard
  - [ ] Widget de apólices
  - [ ] Widget de cotações
  - [ ] Widget de pagamentos
  - [ ] Widget de notificações
- [ ] Documentos
  - [ ] Upload multi-arquivo
  - [ ] Preview de documentos
  - [ ] Assinatura digital
  - [ ] Compartilhamento seguro
- [ ] Notificações
  - [ ] Centro de notificações
  - [ ] Preferências de notificação
  - [ ] Histórico de notificações
  - [ ] Ações em lote

## 💰 Cotações
- [ ] Formulário dinâmico de cotação
  - Campos condicionais baseados no tipo de seguro
  - Máscaras de input (CPF, telefone)
  - Validação em tempo real
- [ ] Integração com APIs de seguradoras
  - Timeout de 30 segundos
  - Retry em caso de falha
  - Cache de resultados (1 hora)
- [ ] Comparativo de cotações
  - Tabela responsiva
  - Filtros por preço/cobertura
  - Export para PDF
- [ ] Follow-up automático
  - Email após 24h
  - WhatsApp integration
  - Lembretes programados

## 🤝 Consórcio
- [ ] Simulador de consórcio
  - Cálculo de parcelas
  - Prazo personalizado
  - Taxa administrativa
- [ ] Catálogo de bens
  - Imóveis
  - Veículos
  - Serviços
- [ ] FAQ dinâmico
  - Busca por palavras-chave
  - Categorização
  - Rich text content

## 👨‍💼 Área Administrativa
- [ ] CRUD de usuários
  - Níveis de acesso
  - Logs de atividade
  - Reset de senha
- [ ] Gestão de conteúdo
  - Editor WYSIWYG
  - Upload de mídia
  - Versionamento
- [ ] Relatórios
  - Exportação CSV/PDF
  - Gráficos interativos
  - Filtros personalizados

## 🎨 Design System
- [ ] Paleta de cores
  - Cores da Marca:
    - Vermelho Principal: #C41E3A
    - Vermelho Claro: #E63E57
    - Vermelho Escuro: #9A1829
    - Azul Principal: #1A2B55
    - Azul Claro: #2A3D6E
    - Azul Escuro: #0F1C3E
    - Dourado Principal: #D4AF37
    - Dourado Claro: #E5C76B
    - Dourado Escuro: #B39124
  - Cores Neutras:
    - Branco: #FFFFFF
    - Preto: #000000
    - Escalas de Cinza (100-900)
  - Cores Funcionais:
    - Sucesso: #28a745
    - Alerta: #ffc107
    - Erro: #dc3545
    - Info: #17a2b8
- [ ] Tipografia
  - Família Principal: Roboto
  - Família Secundária: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
  - Hierarquia:
    - H1: 2.5rem (2rem mobile)
    - H2: 2rem (1.75rem mobile)
    - H3: 1.75rem (1.5rem mobile)
    - H4: 1.5rem (1.25rem mobile)
    - H5: 1.25rem (1.1rem mobile)
    - H6: 1rem
    - Texto base: 1rem
    - Line height: 1.6
- [ ] Componentes
  - Botões:
    - Primário (Vermelho)
    - Secundário (Azul)
    - Dourado
    - Outline
  - Cards:
    - Box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1)
    - Border-radius: 4px
    - Hover effect
  - Forms:
    - Input padding: 0.5rem 0.75rem
    - Focus state com borda vermelha
    - Label weight: 500
  - Containers:
    - Mobile: 540px
    - Tablet: 720px
    - Desktop pequeno: 960px
    - Desktop grande: 1140px
- [ ] Sistema de Espaçamento
  - Base: 8px
  - Multiplicadores: 1-5
  - Classes utilitárias:
    - Margins (mt-1 até mt-5, mb-1 até mb-5)
    - Paddings (p-1 até p-5)
- [ ] Animações
  - Transições: 0.3s
  - Fade in
  - Hover states
- [ ] Temas
  - Claro (Default)
  - Escuro
    - Background: Gray 900
    - Texto: Gray 200
    - Links: Vermelho claro

## 🔧 Técnico
- [ ] SEO
  - Meta tags dinâmicas
  - Sitemap.xml
  - robots.txt
- [ ] Performance
  - Lazy loading de imagens
  - Code splitting
  - Minificação de assets
- [ ] Segurança
  - SSL/TLS
  - CSRF protection
  - Rate limiting
- [ ] Analytics
  - Google Analytics 4
  - Eventos personalizados
  - Funil de conversão

## 📱 Responsividade
- [ ] Breakpoints
  - Mobile: 320px - 480px
  - Tablet: 481px - 768px
  - Desktop: 769px+
- [ ] Menu mobile
  - Hamburger animation
  - Slide panel
  - Touch gestures
- [ ] Imagens adaptativas
  - srcset implementation
  - Lazy loading
  - Placeholder blur

## 🌐 Integrações
- [ ] Redes Sociais
  - Share buttons
  - Feed do Instagram
- [ ] WhatsApp Business
  - Chat flutuante
  - Quick replies
  - Templates de mensagem
- [ ] Email Marketing
  - Newsletter signup
  - Templates responsivos
  - Automações

## 📊 Monitoramento
- [ ] Error tracking
  - Sentry integration
  - Error reporting
  - User feedback
- [ ] Performance monitoring
  - Web Vitals
  - Loading metrics
  - User timing
- [ ] Uptime monitoring
  - Health check endpoints
  - Status page
  - Alertas via email/SMS
