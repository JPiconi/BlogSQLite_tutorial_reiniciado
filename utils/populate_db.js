// utils/populate_db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('user.db'); // Certifique-se de que o caminho está correto

// Função para gerar um n mero aleat rio entre min e max
//
// @param {number} min - O menor n mero poss vel
// @param {number} max - O maior n mero poss vel
// @returns {number} Um n mero aleat rio entre min e max
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar um CPF aleat rio
//
// Gera um CPF composto por 9 d gitos aleat rios e calcula
// os 2 d gitos verificadores segundo a regra do CPF.
//
// @returns {string} Um CPF aleat rio
function gerarCpfAleatorio() {
    const cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(gerarNumeroAleatorio(0, 9));
    }
    const digito1 = calcularDigito(cpf, 10);
    const digito2 = calcularDigito(cpf.concat([digito1]), 11);
    return cpf.concat([digito1, digito2]).join('');
}

// Função para calcular o dígito do CPF
//
// Esta função calcula um dos dígitos verificadores do CPF
// usando um array de números e um peso inicial.
//
// @param {number[]} cpf - Array contendo os dígitos do CPF
// @param {number} peso - Peso inicial usado no cálculo
// @returns {number} - O dígito verificador calculado
function calcularDigito(cpf, peso) {
    let soma = 0;

    // Calcula a soma dos produtos dos dígitos pelo peso decrescente
    for (let i = 0; i < cpf.length; i++) {
        soma += cpf[i] * (peso - i);
    }

    // Calcula o resto da divisão da soma por 11
    const resto = soma % 11;

    // Retorna o dígito verificador baseado no resto
    return resto < 2 ? 0 : 11 - resto;
}

/**
 * Função para criar usuários
 *
 * Esta função irá criar 100 usuários com usernames, senhas, emails, celulares, CPFs e RGs
 * aleat rios. Os usuários s o armazenados em um array e retornados.
 *
 * @returns {object[]} - Um array de objetos contendo as informaçes dos usuários
 */
function criarUsuarios() {
    const usuarios = [];
    for (let i = 0; i < 100; i++) {
        // Cria um objeto com as informaçes do usuário
        const usuario = {
            username: `usuario${i}`, // Username do usuário
            password: `senha${i}`, // Senha do usuário
            email: `usuario${i}@example.com`, // Email do usuário
            celular: `(1${gerarNumeroAleatorio(0, 9)}) ${gerarNumeroAleatorio(10000, 99999)}-${gerarNumeroAleatorio(1000, 9999)}`, // Celular do usuário
            cpf: gerarCpfAleatorio(), // CPF do usuário
            rg: `${gerarNumeroAleatorio(1000000, 9999999)}-${gerarNumeroAleatorio(0, 9)}`, // RG do usuário
        };
        usuarios.push(usuario);
    }
    return usuarios;
}

// Função para popular o banco de dados com os usuários criados
//
// Esta função irá popular o banco de dados com os 100 usuários criados
// pela função criarUsuarios.
//
// @param {object[]} usuarios - Array de objetos com as informaçes dos usuários
function popularDB(usuarios) {
    // Monta o SQL para inserir os usuários no banco de dados
    const sql = `
    INSERT INTO users (username, password, email, celular, cpf, rg)
    VALUES (?, ?, ?, ?, ?, ?);`;
    db.serialize(() => {
        // Inicia a transa o
        db.run('BEGIN TRANSACTION');
        // Prepara o statement para inserir os usuários
        const stmt = db.prepare(sql);
        // Insere os usuários no banco de dados
        usuarios.forEach((usuario) => {
            stmt.run([
                usuario.username,
                usuario.password,
                usuario.email,
                usuario.celular,
                usuario.cpf,
                usuario.rg,
            ]);
        });
        // Finaliza o statement e fecha a conexão
        stmt.finalize();
        // Fecha a transa o
        db.run('COMMIT');
    });
}

// Chamar a função para criar usuários
const usuarios = criarUsuarios();

// Chamar a função para popular o banco de dados
popularDB(usuarios);

// Fechar a conexão após a operação
db.close((err) => {
    if (err) {
        console.error("Erro ao fechar a conexão com o banco de dados:", err.message);
    }
    console.log("Conexão com o banco de dados fechada.");
});

// utils/populate_db.js

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('user.db'); // Certifique-se de que o caminho está correto

// Função para gerar um n mero aleat rio entre min e max
//
// @param {number} min - O menor n mero poss vel
// @param {number} max - O maior n mero poss vel
// @returns {number} Um n mero aleat rio entre min e max
function gerarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar um CPF aleat rio
//
// Gera um CPF composto por 9 d gitos aleat rios e calcula
// os 2 d gitos verificadores segundo a regra do CPF.
//
// @returns {string} Um CPF aleat rio
function gerarCpfAleatorio() {
    const cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(gerarNumeroAleatorio(0, 9));
    }
    const digito1 = calcularDigito(cpf, 10);
    const digito2 = calcularDigito(cpf.concat([digito1]), 11);
    return cpf.concat([digito1, digito2]).join('');
}

// Função para calcular o dígito do CPF
//
// Esta função calcula um dos dígitos verificadores do CPF
// usando um array de números e um peso inicial.
//
// @param {number[]} cpf - Array contendo os dígitos do CPF
// @param {number} peso - Peso inicial usado no cálculo
// @returns {number} - O dígito verificador calculado
function calcularDigito(cpf, peso) {
    let soma = 0;

    // Calcula a soma dos produtos dos dígitos pelo peso decrescente
    for (let i = 0; i < cpf.length; i++) {
        soma += cpf[i] * (peso - i);
    }

    // Calcula o resto da divisão da soma por 11
    const resto = soma % 11;

    // Retorna o dígito verificador baseado no resto
    return resto < 2 ? 0 : 11 - resto;
}

/**
 * Função para criar usuários
 *
 * Esta função irá criar 100 usuários com usernames, senhas, emails, celulares, CPFs e RGs
 * aleat rios. Os usuários s o armazenados em um array e retornados.
 *
 * @returns {object[]} - Um array de objetos contendo as informaçes dos usuários
 */
function criarUsuarios() {
    const usuarios = [];
    for (let i = 0; i < 100; i++) {
        // Cria um objeto com as informaçes do usuário
        const usuario = {
            username: `usuario${i}`, // Username do usuário
            password: `senha${i}`, // Senha do usuário
            email: `usuario${i}@example.com`, // Email do usuário
            celular: `(1${gerarNumeroAleatorio(0, 9)}) ${gerarNumeroAleatorio(10000, 99999)}-${gerarNumeroAleatorio(1000, 9999)}`, // Celular do usuário
            cpf: gerarCpfAleatorio(), // CPF do usuário
            rg: `${gerarNumeroAleatorio(1000000, 9999999)}-${gerarNumeroAleatorio(0, 9)}`, // RG do usuário
        };
        usuarios.push(usuario);
    }
    return usuarios;
}

// Função para popular o banco de dados com os usuários criados
//
// Esta função irá popular o banco de dados com os 100 usuários criados
// pela função criarUsuarios.
//
// @param {object[]} usuarios - Array de objetos com as informaçes dos usuários
function popularDB(usuarios) {
    // Monta o SQL para inserir os usuários no banco de dados
    const sql = `
    INSERT INTO users (username, password, email, celular, cpf, rg)
    VALUES (?, ?, ?, ?, ?, ?);`;
    db.serialize(() => {
        // Inicia a transa o
        db.run('BEGIN TRANSACTION');
        // Prepara o statement para inserir os usuários
        const stmt = db.prepare(sql);
        // Insere os usuários no banco de dados
        usuarios.forEach((usuario) => {
            stmt.run([
                usuario.username,
                usuario.password,
                usuario.email,
                usuario.celular,
                usuario.cpf,
                usuario.rg,
            ]);
        });
        // Finaliza o statement e fecha a conexão
        stmt.finalize();
        // Fecha a transa o
        db.run('COMMIT');
    });
}

// Chamar a função para criar usuários
const usuarios = criarUsuarios();

// Chamar a função para popular o banco de dados
popularDB(usuarios);

// Fechar a conexão após a operação
db.close((err) => {
    if (err) {
        console.error("Erro ao fechar a conexão com o banco de dados:", err.message);
    }
    console.log("Conexão com o banco de dados fechada.");
});

