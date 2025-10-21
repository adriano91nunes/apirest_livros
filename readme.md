# API de Gerenciamento de Livros

Esta é uma API RESTful desenvolvida como parte do trabalho da disciplina de Desenvolvimento de Serviços e APIs. Ela permite o gerenciamento de autores, livros, usuários e seus registros de leitura.

## Tecnologias Utilizadas

* **Node.js**: Ambiente de execução JavaScript do lado do servidor.
* **Express**: Framework para construção de APIs em Node.js.
* **jsonwebtoken**: Para geração e verificação de tokens de autenticação JWT.
* **bcryptjs**: Para hashing de senhas.
* **uuid**: Para gerar IDs únicos para os registros em memória.

## Como Executar

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  Navegue até a pasta do projeto:
    ```bash
    cd seu-repositorio
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie o servidor em modo de desenvolvimento (com auto-reload):
    ```bash
    npm run dev
    ```
    O servidor estará rodando em `http://localhost:3000`.

## Documentação da API

### Autenticação

A maioria das rotas de usuário requer autenticação via Token JWT. Para obtê-lo, primeiro registre um usuário e depois faça o login. O token deve ser enviado no cabeçalho `Authorization` de cada requisição protegida.

`Authorization: Bearer <seu_token>`

---

### Endpoints

#### Autores (`/autores`)

* `GET /`: Lista todos os autores.
* `GET /:id`: Obtém um autor específico.
* `POST /`: Cria um novo autor.
    * Corpo: `{ "nome": "string", "nacionalidade": "string" }`
* `PUT /:id`: Atualiza um autor.
    * Corpo: `{ "nome": "string", "nacionalidade": "string" }`
* `DELETE /:id`: Deleta um autor.

#### Livros (`/livros`)

* `GET /`: Lista todos os livros (com informações do autor).
* `GET /:id`: Obtém um livro específico (com informações do autor).
* `POST /`: Cria um novo livro.
    * Corpo: `{ "titulo": "string", "autorId": "string", "anoPublicacao": "number", "genero": "string", "numPaginas": "number" }`
* ... (demais endpoints de livros)

#### Usuários (`/usuarios`)

* `POST /registrar`: Registra um novo usuário.
    * Corpo: `{ "nomeCompleto": "string", "email": "string", "senha": "string" }`

* **Rotas Protegidas:**
* `GET /leituras`: Retorna a lista de leituras (livros, status, avaliação) do usuário autenticado.
* `POST /leituras`: Adiciona um livro à lista de leitura ou atualiza seu status.
    * Corpo: `{ "livroId": "string", "status": "a ler" | "lendo" | "concluído" }`
* `POST /leituras/:livroId/avaliar`: Adiciona ou atualiza a avaliação de um livro na lista do usuário.
    * Corpo: `{ "nota": "number" }` (de 1 a 5)

#### Login (`/auth`)

* `POST /login`: Autentica um usuário e retorna um token JWT.
    * Corpo: `{ "email": "string", "senha": "string" }`
