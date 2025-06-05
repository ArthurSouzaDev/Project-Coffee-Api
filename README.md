# ☕ CoffeeDelivery - Backend

Sistema backend para gerenciar cafés personalizados, pedidos, clientes e entregas, utilizando **Prisma ORM** e **PostgreSQL**.

---

## 📋 Descrição

Este projeto foi desenvolvido como parte da atividade prática de modelagem de banco de dados com **Prisma + PostgreSQL**. Ele cobre:

- Modelagem de dados relacional
- Relacionamentos 1:N e N:N (com atributos)
- Criação de entidades como Café, Pedido, Cliente, Entrega e ItensPedido
- Popular o banco com seed de exemplo

---

## 🛠️ Tecnologias

- Node.js
- TypeScript
- Prisma ORM
- PostgreSQL
- ts-node

---

## 📦 Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/ArthurSouzaDev/Project-Coffee-Api.git
cd Project-Coffee-Api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/coffeedelivery"
```

> Substitua `usuario`, `senha` e `coffeedelivery` de acordo com seu ambiente PostgreSQL.

---

### 4. Execute as migrações

```bash
npx prisma migrate dev --name init
```

---

### 5. Popule com dados de exemplo

```bash
npx ts-node prisma/seed.ts
```

---

### 6. (Opcional) Teste a conexão

```bash
npx ts-node src/test.ts
```

---

## 📁 Estrutura de Pastas

```
prisma/
├── schema.prisma   → Modelagem do banco
├── migrations/     → Histórico das migrações
└── seed.ts         → Popula o banco com dados

src/
└── lib/
    └── prisma.ts   → Classe de conexão com o banco

.env                → Variáveis de ambiente
README.md           → Este arquivo
```

---

## ✅ Entidades Criadas

- **Cliente**: nome, e-mail, CPF, telefone
- **Cafe**: nome, tipo, preço, descrição, tags
- **TagCafe**: lista de palavras-chave para cafés
- **Pedido**: cliente, itens, total, entrega
- **ItemPedido**: entidade intermediária com quantidade e preço
- **Entrega**: endereço, status, data prevista

---

## 👨‍🎓 Requisitos da Atividade Atendidos

✔️ Estrutura relacional correta  
✔️ Modelagem com Prisma + PostgreSQL  
✔️ Relacionamentos com tabela intermediária  
✔️ `schema.prisma`, `seed.ts`, e `README.md` completos  
✔️ Projeto versionado no GitHub

---

## ✍️ Autor

[Arthur Souza](https://github.com/ArthurSouzaDev)
