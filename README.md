# GoMobi
## Shopper
### Teste Técnico
---
Aplicação conceito onde o usuário poderá solicitar uma viagem em carro particular de um ponto A até um ponto B. Ele poderá escolher entre algumas opções de motoristas e valores e
confirmar a viagem. Depois também poderá listar o histórico das viagens realizadas. O diagrama abaixo mostra a estrutura geral da aplicação.

</br>
<center> 

![Logo](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-30.jpeg?raw=true)

</center>


### Concepção
---
#### BACKEND

A solução foi concebida com base no o diagrama abaixo:
![Diagrama](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-29.jpeg?raw=true)
O backend foi escrito em node com typescritp utilzando o Fastify para gerenciamentos da comunicação HTTP utilizando Rest e Prisma para o processo de persistência dos dados no Postgress.

A API consiste basicamente em três endpoints:

- POST /ride/estimate
- PATCH /ride/confirm
- GET /ride/{customer_id}?driver_id={id do motorista}

#### FRONTEND

O Frontend é uma Single Page Application em React e TypeScript e terá as seguintes telas:

- Solicitação de viagens - formulário onde o cliente informa seu código, a origem e o destino da viagem. 

</br>

- Opções de viagens - tela onde tem um mapa (google maps) que exibe o trajeto desejado com a distância, o tempo e uma relação de motoristas para escolher para a viagem.
![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/2024-11-27_21-29_1.jpeg?raw=true)

</br>

- Histórico de viagens - relação de viagens realizadas pelo cliente e, opcionalmente, pelo motorista também.
![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/report.jpeg?raw=true)

</br>







### Principais Tech
---
API
- Node
- Typescript
- Fastfy
- Prisma / Postgress
- Zod

SPA
- React
- Typescript
- React Router
- React Hook Form
- Tailwind
- Shadcn UI
- Zod

### Como implantar
---

Pré-requisito: 
- Docker / Docker Compose
- Portas http 80, 8080 e 5432 livres (spa, api, db)

</br>

1. Clonar o repositório
Escolha uma pasta e execute o comando:
```
git clone https://github.com/esbnet/shopper-GoMobi.git
```
2. Acessar a pasta GoMobi
```
cd GoMobi
```
3. Informar variáveis de ambiente
Na pasta root, crie um arquivo .env e informe os dados das variáveis
```
# db
POSTGRES_USER=gomobi_usuario
POSTGRES_PASSWORD=gomobi_senha
POSTGRES_DB=gomobi
DB_PORT=5432
DATABASE_URL=postgresql://gomobi_usuario:gomobi_senha@localhost:5432/gomobi?schema=public

# api
NODE_ENV=prod # dev | prod | test
PORT=8080

# spa
GOOGLE_API_KEY=<SUA_API_KEY_DO_GOOGLE>
API_URL=http://localhost:8080
APP_ENV=prod

```


4. Rodar o comando para subir aplicação
Criado o arquivo .env, roda o comando abaixo para fazer o deploy da aplicação.
```
docker compose up --build -d
```

5. Acessar a aplicação
Abra o navegador de sua preferência e acesse 
```
http://localhost
```
