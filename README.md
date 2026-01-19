# 📊 Scheduly Admin Dashboard

Dashboard administrativo para gerenciar clientes, profissionais e agendamentos do sistema Scheduly.

## 🚀 Funcionalidades

- **Dashboard**: Visualização de estatísticas gerais do sistema
- **Clientes**: Listagem, busca e gerenciamento de clientes
- **Profissionais**: Listagem e gerenciamento de profissionais
- **Agendamentos**: Visualização e gerenciamento de agendamentos com filtros por status

## 📋 Pré-requisitos

- Node.js 16+ e npm
- API Scheduly rodando (padrão: http://localhost:8080)

## 🔧 Instalação

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
REACT_APP_API_URL=http://localhost:8080
```

## 🏃 Executar

```bash
npm start
```

O dashboard estará disponível em `http://localhost:3000`

## 🔐 Autenticação

Para acessar o dashboard, você precisa fazer login com credenciais válidas da API.

**Nota**: Atualmente, qualquer usuário autenticado pode acessar. Em produção, você deve implementar verificação de role ADMIN no backend e no frontend.

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── Layout/       # Layout principal (Sidebar, Header)
│   └── DataTable.tsx # Tabela de dados genérica
├── pages/            # Páginas do dashboard
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── Clients.tsx
│   ├── Professionals.tsx
│   └── Bookings.tsx
├── services/         # Serviços de API
│   ├── auth.service.ts
│   └── admin.service.ts
├── config/          # Configurações
│   └── api.ts       # Cliente Axios configurado
└── types/           # Tipos TypeScript
    └── api.ts
```

## 🔒 Segurança

**IMPORTANTE**: Este dashboard é uma versão inicial. Para produção, você deve:

1. Implementar verificação de role ADMIN no backend
2. Adicionar verificação de role no frontend
3. Implementar refresh token automático
4. Adicionar tratamento de erros mais robusto
5. Implementar paginação nas tabelas
6. Adicionar mais validações e confirmações

## 📝 Endpoints Utilizados

- `POST /auth/login` - Autenticação
- `GET /clients` - Listar todos os clientes
- `GET /clients/search?name={name}` - Buscar clientes
- `DELETE /clients/{id}` - Excluir cliente
- `GET /professionals` - Listar todos os profissionais
- `DELETE /professionals/{id}` - Excluir profissional
- `GET /bookings` - Listar todos os agendamentos
- `DELETE /bookings/{id}` - Cancelar agendamento

## 🎨 Melhorias Futuras

- [ ] Gráficos e visualizações (Chart.js ou Recharts)
- [ ] Exportação de dados (CSV, PDF)
- [ ] Paginação nas tabelas
- [ ] Filtros avançados
- [ ] Detalhes expandidos (modal com informações completas)
- [ ] Histórico de ações
- [ ] Notificações em tempo real
