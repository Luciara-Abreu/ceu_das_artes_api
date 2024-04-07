# Céu das Artes API

## Descrição
Bem-vindo ao Céu das Artes API! Esta API REST foi desenvolvida para lidar com dados de uma biblioteca, permitindo o cadastro de livros, usuários e administradores, além de controlar datas de retirada e devolução de livros, bem como a quantidade de livros disponíveis para locação.

## Tecnologias Utilizadas
Express.js: Framework para Node.js utilizado para criar APIs web.
PostgreSQL: Banco de dados relacional utilizado para armazenar os dados.
TypeORM: ORM (Object-Relational Mapping) para TypeScript e JavaScript.
bcrypt: Biblioteca para criptografia de senhas.
jsonwebtoken: Implementação de JSON Web Tokens para autenticação.
memory-cache: Biblioteca para armazenamento em cache em memória.
dotenv: Carrega variáveis de ambiente de um arquivo .env para o processo do Node.js.
ts-node: Executa arquivos TypeScript diretamente.
ts-node-dev: Ferramenta para desenvolvimento em Node.js com TypeScript.
TypeScript: Linguagem de programação.
Eslint: Ferramenta de linting para JavaScript e TypeScript.
Prettier: Formatador de código.
concurrently: Utilitário para rodar múltiplos comandos simultaneamente.
reflect-metadata: Biblioteca para metadados de reflexão.

##  Estrutura de Pastas
O projeto segue uma estrutura de pastas organizada da seguinte forma:

entity: Contém as entidades do TypeORM, representando as tabelas do banco de dados.
repository: Armazena as classes que lidam com a persistência de dados.
service: Aqui são definidos os serviços que manipulam as regras de negócio.
route: Responsável pela definição das rotas da API.
typeorm/migrations: Aqui ficarão salvas todas as novas migrations.

## Scripts
npm run dev: Inicia o servidor em modo de desenvolvimento utilizando ts-node-dev.
npm run lint: Executa o Eslint para linting dos arquivos TypeScript.
npm run format: Formata automaticamente os arquivos TypeScript utilizando Eslint.
npm run build: Compila o código TypeScript para JavaScript.
npm start: Inicia o servidor em produção.
npm run migrate:create: Cria uma nova migração utilizando TypeORM.
npm run migrate:up: Executa todas as migrações pendentes para atualizar o banco de dados.
npm run migrate:run: Executa todas as migrações pendentes para atualizar o banco de dados.
npm run migrate:down: Reverte a última migração aplicada.

## Como Executar

1. Clone este repositório.
2. Instale as dependências utilizando `npm install`.
3. Configure as variáveis de ambiente no arquivo `.env`.
4. Suba o container Docker com a imagem do banco de dados PostgreSQL utilizando o seguinte comando:

   ```bash
   docker-compose up -d
5.Execute 'npm run dev' para iniciar o servidor em modo de desenvolvimento após startar o container criado no docker. 😁👍🏻