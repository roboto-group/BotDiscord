# ROBOTO

Normalmente, os servidores para Discord precisam usar 2 ou mais bots na tentativa de obter as funcionalidades que atendam às suas necessidades. Esses servidores, especialmente os de uso empresarial, acabam ficando dependentes da disponibilidade e funcionalidades desses bots, alguns dos quais precisam de assinatura para fornecer recursos que não vão suprir por completo a necessidade do servidor.

O ***ROBOTO*** surgiu com o objetivo de resolver esse problema, sendo um bot para Discord customizável, desenvolvido e planejado para atender as necessidades únicas desses servidores, sendo capaz de substituir bots de terceiros, centralizando as funcionalidades e configurações em um só lugar.

***ROBOTO*** é um bot "self-hosted", ou seja, ele precisa ser hospedado em um servidor local ou na nuvem, o que fornece maior controle e segurança.

## Features

**Mensagem de boas vindas:**
</br>
Ao entrar no servidor pela primeira vez, ***ROBOTO*** envia uma mensagem de boas vindas incluindo informações do servidor.

**Integração com banco de dados**:
</br>
***ROBOTO*** pode ser integrado aos principais bancos de dados. Por padrão ele está configurado para o MongoDB. Essa integração expande as funcionalidades do bot, como por exemplo a feature a seguir.

**Autenticação de usuário**
</br>
Com a integração com o banco de dados, é possível autenticar usuários com base nas suas informações no banco de dados, como CPF ou matrícula. Esse recurso é útil quando é necessário checar e autorizar o acesso de usuários a determinados canais do servidor.

**Atribuição automatizada de cargos e canais**
</br>
Em conjunto com a autenticação do usuário, ***ROBOTO*** pode fornecer cargos e liberar acesso a canais específicos para aquele usuário com base nas informações presentes no banco de dados.

## Dependências

- NodeJS;
- Discord.js;
- Canvacord;
- Dotenv;
- MongoDB;
- Mongoose.

## Features em desenvolvimento

- Sistema de níveis com base na interação do usuário;
- Dashboard;
- Filtro de conteúdo;
- Gestão de usuários;
- Divulgação automática de novos vídeos postados no youtube;
- Modularização das funcionalidades.

