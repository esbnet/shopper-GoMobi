# GoMobi
---
Esta é uma aplicação conceito onde o usuário realiza solicitação de transporte em carros particulares registrados na plataforma, o conduzindo de um ponto A até um ponto B. Ele pode escolher entre algumas opções de motoristas e valores e confirmar a viagem. Poderá também listar acompanhar o histórico das viagens realizadas. 

![Logo](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/home.jpeg?raw=true)

</br>

### Concepção
---

A solução foi concebida com base no o diagrama abaixo:
![Diagrama](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/diagrama.jpeg?raw=true)


#### BACKEND

O backend foi escrito em node com typescritp utilzando o Fastify para gerenciamentos da comunicação HTTP utilizando Rest e Prisma para o processo de persistência dos dados no Postgress.

A API consiste basicamente em três endpoints:

- POST /ride/estimate
- PATCH /ride/confirm
- GET /ride/{customer_id}?driver_id={id do motorista}

#### FRONTEND

O Frontend é uma Single Page Application em React e TypeScript e terá as seguintes telas:

- Solicitação de viagens - formulário onde o cliente informa seu código, a origem e o destino da viagem. 
![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/form.jpeg?raw=true)

</br>

- Opções de viagens - tela onde tem um mapa (google maps) que exibe o trajeto desejado com a distância, o tempo e uma relação de motoristas para escolher para a viagem.
![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/viagem.jpeg?raw=true)

</br>

- Histórico de viagens - relação de viagens realizadas pelo cliente e, opcionalmente, pelo motorista também.
![Confirmar](https://github.com/esbnet/shopper-GoMobi/blob/main/doc/report.jpeg?raw=true)

</br>

### Principais Tech
---
API
- Node / Typescript - Linguagem de programação
- Fastify - Gerenciamento de rotas e envio e recebimento de dados
- Prisma / Postgress - Persistência de dados
- Zod - Validação e transformação de dados

SPA
- React / Typescript - Linguagem de programação
- React Router - Gerenciamento de rotas e envio e recebimento de dados
- React Hook Form - Gerenciamento de formulários
- Tailwind - Estilização
- Shadcn UI - Componentes customizáveis
- Zod - Validação e transformação de dados

</br>

### Implantação
---

Esta aplicação é totalmente containerizada, tornado sua implantação imediata e provendo todos os recursos necessários para seu funcionamento, desde que se considere os seguintes pré-requisitos:

- Docker / Docker Compose
- Portas http 80, 8080 e 5432 livres (spa, api, db)

</br>

#### Siga as etapas abaixo:

1. Clonar o repositório
Escolha uma pasta e execute o seguinte comando:
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
Criado o arquivo .env, executar o comando abaixo para fazer realizar a implantação da aplicação.
```
docker compose up --build -d
```

5. Acessar a aplicação
Abra o navegador de sua preferência e acesse o endereço:
```
http://localhost
```
