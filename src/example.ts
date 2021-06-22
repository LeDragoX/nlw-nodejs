// nomeDaVariavel: tipoDaVariavel

interface Usuario {
  // var? = Opcional
  email: string, 
  nome: string, 
  telefone?: string,
}

function enviarEmail({email, nome, telefone}: Usuario) {
  console.log(`Olá ${nome}, seu email é ${email} e seu telefone é ${telefone}`);
}

enviarEmail({
  email: "plinio@email.com",
  nome: "Plínio",
  //telefone: "+5500999999999"
});