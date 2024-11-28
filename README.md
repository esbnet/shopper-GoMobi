# GoMobi
## Shopper
### Teste Técnico

Aplicação conceito onde o usuário poderá solicitar uma viagem em carro particular de um ponto A até um ponto B. Ele poderá escolher entre algumas opções de motoristas e valores e
confirmar a viagem. Depois também poderá listar o histórico das viagens realizadas. O diagrama abaixo mostra a estrutura geral da aplicação.

![Logo](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-30.jpeg?raw=true)


### Concepção

#### BACKEND

A solução foi concebida com base no o diagrama abaixo:
![Diagrama](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-29.jpeg?raw=true)
O backend foi escrito em node com typescritp utilzando o Fastify para gerenciamentos da comunicação HTTP utilizando Rest e Prisma para o processo de persistência dos dados no Postgress.

A API consiste basicamente em três endpoints:

- POST /ride/estimate
- PATCH /ride/confirm
- GET /ride/{customer_id}?driver_id={id do motorista}

#### FRONTEND





![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-29_1.jpeg?raw=true)




frontend
O Frontend deverá ser uma Single Page Application em React e TypeScript e terá as seguintes telas:

Solicitação de viagem
Opções de viagem
Histórico de viagens



### Tech


### Como implantar



