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
