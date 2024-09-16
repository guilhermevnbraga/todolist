# To Do List

<div>
    <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/t/guilhermevnbraga/todolist">
    <img alt="Último commit" src="https://img.shields.io/github/last-commit/guilhermevnbraga/todolist">
    <img alt="Tamanho do repositório" src="https://img.shields.io/github/repo-size/guilhermevnbraga/todolist">
    <img alt="Github contributors" src="https://img.shields.io/github/contributors/guilhermevnbraga/todolist">
    <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/guilhermevnbraga/todolist">
    <img alt="License" src="https://img.shields.io/github/license/guilhermevnbraga/todolist">
</div>

## Sobre

A **To Do List** é uma aplicação web desenvolvida com **Next.js** e **Express.js** para ajudar os usuários a organizar e gerenciar suas tarefas diárias de forma colaborativa. Os membros podem criar, editar e excluir suas próprias tarefas, além de visualizar as tarefas de outros membros, permitindo um acompanhamento eficiente e em grupo.

## Requisitos e Como Rodar a Aplicação Localmente

### Pré-requisitos
- **Node.js** instalado
- **MySQL** instalado e em execução
- **OpenSSL** para gerar chaves de autenticação

### Passos para Configuração

1. Instale as dependências do projeto:
    ```bash
    npm install
    ```
    Execute este comando tanto na pasta raiz quanto na pasta `server`.

2. Configure o banco de dados:
    Na pasta `server`, execute os comandos:
    ```bash
    npx prisma migrate dev --name teste-local
    npx prisma generate
    ```

3. Gere uma chave de autenticação:
    ```bash
    openssl rand -base64 32
    ```

4. Crie o arquivo `.env` na raiz do projeto com as seguintes variáveis:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=chave_gerada
    ```

5. Crie o arquivo `.env` na pasta `server` com as seguintes variáveis:
    ```env
    DATABASE_URL=mysql://usuario:senha@host:porta/bancodedados
    ORIGIN=http://localhost:3000
    ```

6. Inicie a aplicação:
    - No terminal, na pasta raiz:
      ```bash
      npm run dev
      ```
    - No terminal, na pasta `server`:
      ```bash
      npm run server
      ```

## Estrutura do Projeto

O projeto é dividido em três partes principais:

- **Front-end:** Localizado na pasta raiz.
- **Back-end:** Localizado na pasta `server`.
- **Banco de Dados:** Arquivos do Prisma na pasta `prisma` dentro de `server`.

Essa separação facilita o deploy na Vercel, pois exige a criação de dois projetos: um para o front-end e outro para o back-end.

### Front-End

O front-end utiliza **Next.js** e está estruturado na pasta `App`. Os principais diretórios são:

- **API (Autenticação):** Implementada com **NextAuth** para garantir a segurança dos dados.
- **UI (Componentes):** Contém todos os componentes client-side.
- **Rotas:** Armazena os componentes principais de cada página.

### Back-End

O back-end segue um padrão similar ao **Model-View-Controller (MVC)**, com as seguintes pastas:

- **Controllers:** Manipulação dos dados para cada rota da API.
- **Models:** Definições e restrições dos dados.
- **Routes:** Endpoints da API.

O arquivo principal, `index.js`, gerencia as rotas, regras de CORS e inicialização do servidor.

### Banco de Dados

A aplicação usa **Prisma ORM** e **MySQL** para gerenciar o banco de dados. Ele contém duas tabelas principais:

- **Tarefa:** Possui colunas como `id` (UUID), `nome` (5-50 caracteres), `descrição` (opcional, até 140 caracteres), `finalizada` (indica se a tarefa foi concluída), `prioridade` (baixa, média ou alta) e `data de término`.
- **Membro:** Contém `id` (UUID), `email` (único), `nome` (mínimo de 5 caracteres) e `senha` (mínimo de 3 caracteres).

As tarefas finalizadas não podem ser editadas, mas podem ser excluídas.
