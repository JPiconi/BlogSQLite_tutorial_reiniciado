console.log("JS CONECTADO!");

const formulario = document.getElementById("cadastroForm");
const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");
const celular = document.getElementById("celular");
const cpf = document.getElementById("cpf");
const rg = document.getElementById("rg");
const msgErrorElements = document.getElementsByClassName("msgError"); // Renomeado para clareza

/* ------ FUNÇÃO PARA RENDERIZAR AS DIFERENTES MENSAGENS DE ERRO! ------ */
const createDisplayMsgError = (mensagem) => {
  if (msgErrorElements.length > 0) { // Boa prática verificar se o elemento existe
    msgErrorElements[0].textContent = mensagem;
    msgErrorElements[0].style.display = mensagem ? 'block' : 'none'; // Mostrar/ocultar
  }
};
/* --------------------------------------------------------------------- */

/* ---------------- FUNÇÃO PARA VERIFICAR O NOME ----------------------- */
const checkNome = () => {
  const nomeRegex = /^[A-Za-zÀ-ÿ\s'-]+$/; // Permitindo apóstrofos e hífens em nomes
  return nomeRegex.test(nome.value.trim()); // .trim() para remover espaços extras
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR O EMAIL --------------------- */
const checkEmail = (emailValue) => {
  const emailTrimmed = emailValue.trim();
  // Regex mais robusto para validação de email, permitindo mais domínios comuns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailTrimmed)) {
    return false;
  }

  // Verificação específica de domínio (se realmente necessário)
  const partesEmail = emailTrimmed.split("@");
  if (partesEmail.length === 2) {
    const domain = partesEmail[1].toLowerCase();
    const allowedDomains = ["gmail.com", "outlook.com", "hotmail.com", "icloud.com", "yahoo.com"]; // Adicione mais se precisar
    // Se você quiser restringir APENAS a estes domínios:
    // return allowedDomains.includes(domain);
    // Se quiser apenas validar o formato geral do email (recomendado):
    return true;
  }
  return false;
};
/* --------------------------------------------------------------------- */

/* ---------- FUNÇÃO PARA VERIFICAR IGUALDADE DAS SENHAS --------------- */
function checkPasswordMatch() {
  return senha.value === confirmarSenha.value; // Já retorna true/false
}
/* --------------------------------------------------------------------- */

/* ----------- FUNÇÃO PARA INSERIR MASCARA NO TELEFONE ----------------- */
function maskPhoneNumber(event) {
  let celularValue = event.target.value;

  if (/[A-Za-zÀ-ÿ]/.test(celularValue)) {
    createDisplayMsgError("O celular deve conter apenas números!");
    // Opcional: Limpar o campo ou remover caracteres inválidos
    event.target.value = celularValue.replace(/[A-Za-zÀ-ÿ]/g, '');
    celularValue = event.target.value; // Atualiza a variável local
  } else {
    createDisplayMsgError("");
  }

  celularValue = celularValue.replace(/\D/g, "");

  if (celularValue.length > 11) {
    celularValue = celularValue.substring(0, 11);
  }

  let formattedCelular = "";
  if (celularValue.length > 0) {
    formattedCelular = "(" + celularValue.substring(0, 2);
    if (celularValue.length > 2) {
      formattedCelular += ") " + celularValue.substring(2, 7);
      if (celularValue.length > 7) {
        formattedCelular += "-" + celularValue.substring(7, 11);
      }
    }
  }
  event.target.value = formattedCelular;
}
/* --------------------------------------------------------------------- */
// Event listener para o campo celular
celular.addEventListener('input', maskPhoneNumber);
/* --------------------------------------------------------------------- */


/* ------------- FUNÇÃO PARA VERIFICAR FORÇA DA SENHA ------------------ */
// (Remova a duplicada, mantenha apenas uma)
function checkPasswordStrength(senhaValue) {
  if (senhaValue.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres!";
  }
  if (!/[a-z]/.test(senhaValue)) {
    return "A senha deve ter pelo menos uma letra minúscula!";
  }
  if (!/[A-Z]/.test(senhaValue)) {
    return "A senha deve ter pelo menos uma letra maiúscula!";
  }
  if (!/\d/.test(senhaValue)) {
    return "A senha deve ter pelo menos um número!";
  }
  if (!/[\W_]/.test(senhaValue)) { // \W inclui _ , então [\W_] é redundante. Use apenas \W ou [!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]
    return "A senha deve ter pelo menos um caractere especial!";
  }
  return null; // Nenhuma fraqueza encontrada
}
/* --------------------------------------------------------------------- */

/* ------------- FUNÇÃO PARA VERIFICAR E ENVIAR DADOS ------------------ */
async function fetchDatas(event) { // Tornar a função async para usar await
  event.preventDefault();
  createDisplayMsgError(""); // Limpa mensagens de erro anteriores

  if (!checkNome()) { // Correção aqui: chamar a função
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
    nome.focus();
    return;
  }

  if (!checkEmail(email.value)) {
    createDisplayMsgError( // Correção aqui: mensagem apropriada
      "O e-mail digitado não é válido ou não é de um domínio permitido."
    );
    email.focus();
    return;
  }

  const senhaError = checkPasswordStrength(senha.value);
  if (senhaError) {
    createDisplayMsgError(senhaError);
    senha.focus();
    return;
  }

  if (!checkPasswordMatch()) {
    createDisplayMsgError("As senhas digitadas não coincidem!");
    confirmarSenha.focus();
    return;
  }

  // Validação do celular (opcional, já que a máscara tenta corrigir)
  const celularLimpo = celular.value.replace(/\D/g, "");
  if (celular.value && (celularLimpo.length < 10 || celularLimpo.length > 11)) {
    createDisplayMsgError("O número de celular parece inválido.");
    celular.focus();
    return;
  }

  const formData = {
    // `username`: Representa o nome de usuário inserido pelo usuário.
    // `.trim()` é usado para remover quaisquer espaços em branco extras
    // do início ou do fim da string do nome de usuário.
    username: nome.value.trim(),

    // `email`: Armazena o endereço de e-mail fornecido.
    // `.trim()` também é aplicado aqui para limpar espaços em branco
    // desnecessários, garantindo que o e-mail seja processado corretamente.
    email: email.value.trim(),

    // `password`: Contém a senha digitada pelo usuário.
    // Importante: A senha não deve ser "trimmed" (não se deve usar .trim())
    // porque espaços no início ou no fim podem ser intencionais e parte da senha escolhida.
    password: senha.value,

    // `celular`: Guarda o número de celular do usuário.
    // `celularLimpo` é uma variável que (presumivelmente) já contém o número
    // de celular formatado apenas com dígitos, sem máscaras ou caracteres especiais.
    // É importante enviar apenas os números para facilitar o processamento no backend.
    celular: celularLimpo,

    // `cpf`: Contém o número do Cadastro de Pessoas Físicas (CPF).
    // `.replace(/\D/g, "")` é usado para remover todos os caracteres
    // que não são dígitos (como pontos e hífens, comuns em máscaras de CPF),
    // garantindo que apenas os números do CPF sejam enviados.
    cpf: cpf.value.replace(/\D/g, ""),

    // `rg`: Armazena o número do Registro Geral (RG) ou documento de identidade.
    // Similar ao CPF, `.replace(/\D/g, "")` remove quaisquer caracteres
    // não numéricos, assegurando que apenas os dígitos do RG sejam transmitidos.
    rg: rg.value.replace(/\D/g, ""),
  };

  console.log("Dados a serem enviados: ", JSON.stringify(formData, null, 2));

  // --- INÍCIO DA LÓGICA DE ENVIO ---
  try {
    const response = await fetch('/cadastro', {
      method: 'POST', // Método HTTP
      headers: {
        'Content-Type': 'application/json', // Indicando que estamos enviando JSON
        // 'Accept': 'application/json' // Opcional, indica que esperamos JSON de volta
      },
      body: JSON.stringify(formData), // Converte o objeto JavaScript para uma string JSON
    });

    if (response.ok) { // Verifica se a resposta do servidor foi bem-sucedida (status 2xx)
      const result = await response.json(); // Tenta parsear a resposta do servidor como JSON
      console.log('Sucesso:', result);
      formulario.reset(); // Limpa o formulário após o sucesso
      // createDisplayMsgError('Cadastro realizado com sucesso! ' + (result.message || ''));
      alert('Cadastro realizado com sucesso! ' + (result.message || ''));
      window.location.href = "/login";
      // Redirecionar ou mostrar mensagem de sucesso mais elaborada
    } else {
      // O servidor respondeu com um erro (status 4xx ou 5xx)
      const errorData = await response.json().catch(() => ({ message: 'Erro ao processar a resposta do servidor.' })); // Tenta pegar a mensagem de erro do servidor
      console.error('Erro do servidor:', response.status, errorData);
      createDisplayMsgError(`Erro: ${errorData.message || response.statusText}`);
    }
  } catch (error) {
    // Erro de rede ou algo impediu a requisição de ser completada
    console.error('Erro na requisição:', error);
    createDisplayMsgError('Erro de conexão. Por favor, tente novamente.');
  }
  // --- FIM DA LÓGICA DE ENVIO ---
}
/* --------------------------------------------------------------------- */

formulario.addEventListener("submit", fetchDatas);

nome.addEventListener("input", () => {
  if (nome.value.trim() && !checkNome()) {
    createDisplayMsgError(
      "O nome não pode conter números ou caracteres especiais!"
    );
  } else {
    createDisplayMsgError("");
  }
});

email.addEventListener("input", () => {
  if (email.value.trim() && !checkEmail(email.value)) {
    createDisplayMsgError("O e-mail digitado não é valido!");
  } else {
    createDisplayMsgError("");
  }
});

senha.addEventListener("input", () => {
  const error = checkPasswordStrength(senha.value);
  if (senha.value && error) {
    createDisplayMsgError(error);
  } else {
    createDisplayMsgError("");
  }
});

confirmarSenha.addEventListener("input", () => {
  if (senha.value && confirmarSenha.value && !checkPasswordMatch()) {
    createDisplayMsgError("As senhas não coincidem!");
  } else {
    createDisplayMsgError("");
  }
});