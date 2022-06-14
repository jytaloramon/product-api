# Análise do Protocolo HTTP

#### Disciplina: Redes de Computadores
#### Professor: Thiago Sales

## Atividade

-  Usar um framework Web (SpringBoot, NodeJs, Django etc.) para construir um web service REST e monitorar as requisições HTTP pelo Wireshark. 

1. Desenvolver endpoints GET, POST, PUT, DELETE, PATCH, OPTIONS e HEAD. Essas endpoints DEVEM também carregar dados no HEADER da requisição HTTP (dados da sua escolha. Ex.: um token "fictício" de autenticação/autorização - Veja o header authorization neste link: https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Headers/Authorization) para compreender como tokens de autorização são enviados.

2. Gravar um video mostrando os seguintes pontos: <br>
2.1. Acesso às endpoints GET,  POST, PUT, DELETE, PATCH,  OPTIONS e HEAD para a aplicação web que você desenvolveu no ponto 1; <br>
2.2. Mostrar as respostas retornadas pelas endpoints; <br>
2.3. Filtrar e mostrar, pelo wireshark, os principais parâmetros da requisição e da resposta. Ex.: HTTP Status Code, dados da requisição e da resposta,  etc.

- Obs.: Pesquise a diferença entre HTTP 200, HTTP 201, HTTP 203 e HTTP 204, HTTP 400, HTTP 404 e HTTP 409 e considere as duas respostas na implementação da sua solução (pode-se fazer duas endpoints HTTP POST).
Obs.: Os frameworks web SpringBoot e NestJS (Node.js) são ótimas opções para quem está iniciando em desenvolvimento Web para construir API's Restful!.

- O que entregar? Coloque o código no repositório git (ex.: github) e me adicione como colaborador: thiagobrunoms@gmail.com. No dia da entrega, mostre-me a execução da API presencialmente.

<br>

## Product-API

### Construção com Docker (Opcional)

*[Na pasta do projeto, execute]*

1. **#** *docker build -t docker_product_api ./docker*
2. **#** *docker run -it -p hostPort:8546 -v projectfolderHost:/app hashImageDocker /bin/bash
   - Exemplo: **#** *docker run -it -p 8546:8546 -v /Dev/product-api:/app 38bbc0febaf2 /bin/bash*

3. **#** *sudo -s -u node*
4. **#** *cd app/*

### Rodando o Projeto
*[Na pasta do projeto, execute]*
1. **#** *npm install*
2. **#** *npm run dev*

https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html


## Roteiro

#### Request GET(Auth)
   - Falar sobre os tipos de token (read/write)

#### Request Options

*O método HTTP OPTIONS é utilizado para que um cliente possa descobrir quais as opções de requisição permitidas para um determinado recurso em um servidor*

- Request sem Authorization
  - Erro 401 (Unauthorized): signica que a solicitação não pode ser concluída pq o usuário não possui crendencial válida.
  - WWW-Authenticate: que define o método de autenticação a ser usado para obter acesso ao recurso.

- setar Authorization
  - Falar sobre os cabeçalhos:
    - Access-Control-Request-Method
    - Access-Control-Allow-Origin
    - Access-Control-Allow-Headers	

#### Request Head

*O método HTTP HEAD solicita os cabeçalhos retornados de um recurso específico que foi requisitado por um método HTTP GET*

- Falar sobre:
  - Last-Modified: contém a data e a hora em que o servidor de origem acredita que o recurso foi modificado pela última vez
  - Content-Length: O cabeçalho de entidade Content-Length indica o tamanho do corpo da entidade, em bytes, enviado ao destinatário.

#### Request POST

*O método HTTP POST envia dados ao servidor*

- Falar sobre:
  - (Header)Content-Type: indica o tipo de arquivo do recurso
  - Body
  
- Falar sobre 201 Created: indica que a requisição foi bem sucedida e que um novo recurso foi criado e retorna os dados.
  
- Falar sobre 409 Conflit: indica que a solicitação atual conflitou com o recurso que está no servidor. Este código é usado em situações em que o usuário pode ser capaz de resolver o conflito e reenviar a solicitação.
  
- Usar token de read

- Falar sobre 401 Forbidden: indica que o servidor entendeu o pedido, mas se recusa a autorizá-lo. Em outras palavra, falar da diferença entre 401 x 409

#### Request GET

*O método HTTP GET solicita uma representação do recurso especificado*

- Falar sobre:
  - Body(resultado da consulta)

#### Request GET (ById)

- Request com ID válido

- Request com ID inválido
  - Falar sobre 404 Not Found: indica que o servidor não conseguiu encontrar o recurso solicitado. Vale ressalta que ele não indica se se o recurso está indisponível temporamente ou permanentimente. 
  - Falar sobre 400 Bad Request: indica que o servidor não pode ou não irá processar a requisição devido a alguma coisa que foi entendida como um erro do cliente

#### Request Patch

*O método de requisição HTTP PATCH aplica modificações parciais a um recurso.*

- Executar request
- Falar sobre 204 No content: indica que a solicitação foi bem sucedida e o cliente não precisa sair da página atual.

#### Request PUT

*O método de requisição HTTP PUT cria um novo recurso ou subsititui uma representação do recurso de destino com os novos dados.*

- Executar com id válido
  - No content 204
- Executar com id inválido
  - Created

#### Request DELETE 

*O método de requisição HTTP DELETE remove o recurso especificado.*

- Executar com id válido
  - No content 204
- Executar com id inválido
  - Not Found
