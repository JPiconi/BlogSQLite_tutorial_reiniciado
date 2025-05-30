# Blog Simples com Node.js, Express e SQLite ✨

Este é um projeto de um blog simples desenvolvido como parte de um tutorial (reiniciado) para demonstrar operações CRUD (Criar, Ler, Atualizar, Deletar) utilizando Node.js, o framework Express.js, o motor de templates EJS e o banco de dados SQLite.

## 📖 Sobre o Projeto

O objetivo principal desta aplicação é servir como um exemplo prático e didático para quem está começando a desenvolver aplicações web com Node.js. Ele cobre funcionalidades básicas de um blog, como:

*   Listagem de todos os posts.
*   Visualização de um post individual.
*   Criação de novos posts através de um formulário.
*   Edição de posts existentes.
*   Exclusão de posts.

## 🚀 Tecnologias Utilizadas

*   **Node.js:** Ambiente de execução JavaScript do lado do servidor.
*   **Express.js:** Framework web minimalista e flexível para Node.js.
*   **SQLite3:** Banco de dados relacional leve, baseado em arquivo, ideal para prototipagem e pequenas aplicações.
*   **EJS (Embedded JavaScript templating):** Motor de templates simples para gerar HTML com JavaScript.
*   **Nodemon:** Utilitário que monitora alterações nos arquivos e reinicia automaticamente o servidor (para desenvolvimento).
*   **body-parser:** Middleware para parsear o corpo das requisições HTTP (embora Express já tenha `express.json()` e `express.urlencoded()` embutidos, é comum vê-lo).

## 🛠️ Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (que já vem com o npm)
*   [Git](https://git-scm.com/) (para clonar o repositório)

## ⚙️ Como Executar o Projeto

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/DenadaiSenai/BlogSQLite_tutorial_reiniciado.git
    ```

2.  **Navegue até o diretório do projeto:**
    ```bash
    cd BlogSQLite_tutorial_reiniciado
    ```

3.  **Instale as dependências:**
    ```bash
    npm install
    ```

4.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm start
    ```
    O comando `npm start` geralmente executa `nodemon app.js` (conforme configurado no `package.json`), que iniciará o servidor e o reiniciará automaticamente ao detectar alterações nos arquivos.

5.  **Acesse a aplicação:**
    Abra seu navegador e acesse `http://localhost:3000` (ou a porta configurada no `app.js`).

## 📂 Estrutura do Projeto

```
.
├── static              # Arquivos estáticos do projeto
│   ├── fonts               # Fontes
│   ├── images              # Imagens
│   ├── scripts             # Scripts de Front-end
│   └── styles              # Estilos CSS
├── views               # Arquivos de modelo/template usados pelo ExpressJS
│   ├── pages               # Páginas
│   └── partials            # Fragmentos de código parciais
├── README.md           # Arquivo de apresentação do projeto - Este arquivo
├── app.js              # Aplicação principal
├── eslint.config.mjs
├── helloworld.js       # Aplicativo inicial Hello World do Node
├── package-lock.json
├── package.json
├── rotas.js            # Aplicativo de exemplo de uso de rotas no ExpressJS
└── user.db             # Arquivo de banco de dados do SQLite3
```

## 📝 Lista de Tarefas (To-Do)

Aqui estão algumas sugestões de melhorias e funcionalidades futuras para o projeto:

### Funcionalidades Essenciais e Melhorias
*   [ ] **Implementar/Revisar Registro de Posts:**
    *   [ ] Criar a rota e o controller para exibir o formulário de novo post (`GET /new-post`).
    *   [ ] Criar a view EJS para o formulário de novo post (`new-post.ejs`).
    *   [ ] Criar a rota e o controller para processar o envio do formulário e salvar o post no banco de dados (`POST /posts`).
*   [ ] **Implementar/Revisar Visualização de Posts:**
    *   [ ] Criar a rota e o controller para listar todos os posts na página inicial (`GET /`).
    *   [ ] Criar a view EJS para exibir a lista de posts (`index.ejs`).
    *   [ ] Criar a rota e o controller para visualizar um post individual pelo seu ID (`GET /post/:id`).
    *   [ ] Criar a view EJS para exibir um post individual (`view-post.ejs`).
*   [ ] **Implementar/Revisar Edição de Posts:**
    *   [ ] Criar a rota e o controller para exibir o formulário de edição de um post (`GET /edit-post/:id`).
    *   [ ] Criar a view EJS para o formulário de edição (`edit-post.ejs`), pré-preenchida com os dados do post.
    *   [ ] Criar a rota e o controller para processar a atualização do post no banco de dados (`POST /edit-post/:id`).
*   [ ] **Implementar/Revisar Exclusão de Posts:**
    *   [ ] Criar a rota e o controller para deletar um post do banco de dados (`POST /delete-post/:id` ou `DELETE /posts/:id`).
    *   [ ] Adicionar confirmação antes de excluir.
*   [ ] **Melhorar o Design/Estilização (CSS):**
    *   [ ] Aplicar um framework CSS (Bootstrap, Tailwind CSS) ou criar um estilo mais elaborado.
    *   [ ] Tornar o layout responsivo.
*   [ ] **Validação de Formulários:**
    *   [ ] Validação no lado do cliente (HTML5, JavaScript).
    *   [ ] Validação no lado do servidor (Express Validator ou lógica customizada).
*   [ ] **Mensagens de Feedback ao Usuário:**
    *   [ ] Exibir mensagens de sucesso/erro após criar, editar ou deletar um post (ex: usando `connect-flash` ou similar).
*   [ ] **Formatação de Datas:**
    *   [ ] Formatar as datas de criação/atualização dos posts para um formato mais legível.
*   [ ] **Paginação:**
    *   [ ] Implementar paginacão na lista de posts se houver muitos registros.
*   [ ] **Tratamento de Erros Aprimorado:**
    *   [ ] Páginas de erro personalizadas (404, 500).
    *   [ ] Logging de erros mais detalhado.

### Funcionalidades Avançadas
*   [ ] **Autenticação de Usuários:**
    *   [ ] Permitir que apenas usuários logados criem/editem/excluam posts.
    *   [ ] Implementar registro e login (ex: com `passport.js`).
*   [ ] **Comentários nos Posts:**
    *   [ ] Permitir que visitantes ou usuários logados adicionem comentários aos posts.
*   [ ] **Sistema de Busca:**
    *   [ ] Implementar uma funcionalidade de busca para encontrar posts por título ou conteúdo.
*   [ ] **Categorias/Tags:**
    *   [ ] Adicionar categorias ou tags aos posts para melhor organização.
*   [ ] **Upload de Imagens:**
    *   [ ] Permitir o upload de uma imagem de destaque para cada post (ex: usando `multer`).
*   [ ] **Editor de Texto Rico (WYSIWYG):**
    *   [ ] Integrar um editor como TinyMCE ou CKEditor para facilitar a formatação do conteúdo dos posts.
*   [ ] **Testes:**
    *   [ ] Escrever testes unitários e de integração (ex: com Jest, Mocha, Chai).

### Melhorias de Código e Infraestrutura
*   [ ] **Variáveis de Ambiente:**
    *   [ ] Utilizar variáveis de ambiente (ex: com `dotenv`) para configurações sensíveis ou específicas do ambiente (porta, string de conexão do DB, etc.).
*   [ ] **Refatoração:**
    *   [ ] Separar lógica de negócios em services/controllers, se a aplicação crescer.
*   [ ] **Segurança:**
    *   [ ] Implementar medidas de segurança básicas (Helmet.js, prevenção de XSS, CSRF).
*   [ ] **Documentação da API (se aplicável):**
    *   [ ] Se o backend for servir como API, documentar os endpoints (ex: com Swagger/OpenAPI).

---

Sinta-se à vontade para contribuir com o projeto ou usá-lo como base para seus estudos!