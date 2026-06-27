# Closet Store

## Sobre o Projeto

O Closet Store é uma aplicação web desenvolvida como projeto acadêmico da disciplina de Desenvolvimento Web, com o objetivo de aplicar na prática os conceitos estudados em sala de aula. A aplicação consiste em uma plataforma de gerenciamento de produtos de moda, onde é possível cadastrar, listar, editar e excluir produtos de vestuário.

## Objetivo

O projeto foi desenvolvido de forma incremental ao longo do semestre, acompanhando a evolução apresentada nas aulas. O tema escolhido foi uma plataforma de produtos de moda chamada Closet Store, que permite o gerenciamento completo de um catálogo de roupas com controle de acesso por autenticação.

## Tecnologias Utilizadas

Durante o desenvolvimento foram aplicadas as seguintes tecnologias e conceitos:

- Angular 20+ com Componentes Standalone
- TypeScript
- Firebase Realtime Database para persistência dos dados
- Angular Router com Lazy Loading
- Reactive Forms para os formulários
- Guards de Autenticação para proteção de rotas
- Git e GitHub para controle de versões

## Funcionalidades Implementadas

A aplicação conta com as seguintes funcionalidades:

- Tela de login com autenticação e controle de sessão
- Proteção de rotas privadas com Auth Guard
- Cadastro de produtos contendo nome, descrição, categoria, tamanho, imagem e preço
- Listagem de produtos em formato grid
- Edição de produtos existentes
- Exclusão de produtos com confirmação
- Página de detalhes do produto
- Header dinâmico exibindo o nome do usuário autenticado e opção de logout

## Instruções de Execução

Para executar o projeto localmente, é necessário ter o Node.js e o Angular CLI instalados.

Clone o repositório:
```bash
git clone https://github.com/vanessa-sbardelotto/closet-store.git
cd closet-store
```

Instale as dependências:
```bash
npm install
```

Inicie o servidor de desenvolvimento:
```bash
ng serve
```

Acesse a aplicação em `http://localhost:4200` e utilize as credenciais abaixo para fazer login:

- **E-mail:** aluno@teste.com  
- **Senha:** 123456

## Aplicação Publicada

A aplicação está disponível online através do Firebase Hosting no endereço:

[https://closet-store-f3032.web.app](https://closet-store-f3032.web.app)