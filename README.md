# controle-ponto
Microsserviço para API de controle de ponto.

## Tasks

Sistema de login:
 - [X] Configuração ambiente
 - [X] Configuração ORM
 - [X] Criar migration de usuários
 - [X] Criar model de usuários 
 - [X] Criar rota de cadastro
 - [X] Adicionar criptorafia de senha
 - [X] Criar rota de autenticação
 - [X] Criar middleware de autenticação
 - [X] Deletar usuário
 - [X] Separar por useCases
 - [X] Separar os Repositories

 Registro de ponto:
 - [X] Criar migration e entidade de registro 
 - [X] Criar registro via requisição
 - [X] Listar registros
 - [X] Listar registros dia
 - [X] Listar registros mês
 - [X] Listar o tipo de registro (Entrada/saída)

## Requisitos

Back:
* ~~Controle de login (usuario e senha)~~
* ~~Registrar ponto~~
* ~~Consultar ponto (dia)~~
* ~~Folha espelho (mês)~~

Front:
* O aplicativo deve fornecer meios de batimento de entrada e saída e calcular as horas trabalhadas no dia
* O aplicativo deve mostrar a folha espelho do ponto do mes
* O aplicativo deve destacar os dias que ultrapassarem 8 horas de trabalho
* O aplicativo deve solicitar login para que o usuário verifique seu ponto, sua folha e que consiga realizar o batimento.
* O usuário deve conseguir ver o ponto em qualquer dispositivo que faça login

