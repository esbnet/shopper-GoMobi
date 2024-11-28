# Quiker Artigos
(API)

Esta aplicação se propõe a ser um site de notícias compartilhado. Nele qualquer pesso podera se cadastrar e criar artigos que ficaram disponíveis ao público da internet. 

Para utilizá-lo, basta registrar-se no aplicativo e já será hapto a realizar postage, commentários em postagens de terceiros e dar manutenção em seus próprios comentários, como excluír, por exemplo.

## Techs

- Typescript - 5.1 - Typagem, Segurança e Produtividade
- Fastify - 4.21
- Prisma - 5.22 - ORM que otimiza o processo de criação do DB e manipulação de dados
- Zod - 3.21 - Lib para falidação e transformação de dados baseado em Schema
- Eslint - 8.46 - Análise estático de código TypeScript - conformidade e legibilidade
- Vitest 0.33 - Testes unitários
- Supertest - 6.3 - Testes de integração E2E

## Pré-requisitos

- Node (20.0 - utilizado)
- Genrenciador de pacotes (npm, pnpm, yarn)
- Gerenciador de Banco de Dados
- Configurar banco de dados

## Impantação

### Clonar projeto 

Em uma pasta no seu ambiente, clone o projeto com o comando:

``` 
git clone https://github.com/esbnet/quiker-backend-blog.git 
```
- Instalar dependências
```
npm install
```

### Configurar ambiente
Criar um arquivo .env na pasta raíz do projeto e inserir as variáveis de ambiente abaixo:
(ver modelo na pasta root, arquivo env.sample) 
Define o ambiente de execução, a porta onde a API irá rodar, a string de conexção com o db e uma string quer servirá de base para gerar o JWT na amplicação, respectivamente.
(estamos utilizando postgress - [ver documentação do prisma](https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres))

### Criar tabelas no banco de dados
Após criação do banco e configuração da string de conexão iremos rodar o comando. Altamente recomendado consultar a documetação do desenvolvedor [aqui](https://www.prisma.io/docs/getting-started/quickstart-prismaPostgres).

```
npx prisma migrate dev --name init
```
### Rodando a API

Com todo o ambiente devidamente configurado, rode o comando abaixo e teremos nossa api executando e pronta pra receber requisições.
```
npm run start:dev
```

### Endpoins

#### User
##### Create User
```
POST /register
payload:
{
	"name":"João dos Santos",
	"email":"joao3@gmail.com",
	"password":"Ab123456*"
}

response:
{
	"status": 201,
	"message": "Usuário cadastrado com sucesso. 👌"
}
```
##### Autenticação
```
POST /sessions
payload:
{
	"email":"esbnet@gmail.com.pa",
	"password":"Ab123456*"
}

response:
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiTUVNQkVSIiwic3ViIjoiY20zbnQ3ZmQ2MDAwMHhvd2R2YWR0ZGJ6NiIsImlhdCI6MTczMTk4NDYwOCwiZXhwIjoxNzMxOTg1MjA4fQ.HjJV_Z48w2ww_Nz34qB-EKCyfO71ikPg6ttk74hG99M",
	"user": {
		"id": "cm3nt7fd60000xowdvadtdbz6",
		"name": "Pederp Bezerra",
		"email": "pedro@gmail.com.pa",
		"passwordHash": "$2a$06$lXKkElepjmKLHNZnGLd5mOb6GbNPKctbmSc5VNsySIxHwcqCJY.ty",
		"role": "MEMBER",
		"createdAt": "2024-11-19T02:02:14.539Z"
	}
}
```
##### List Usuários
```
GET /users
payload:

response:
[
	{
		"id": "cm3q6cp9u000411c83c868ecy",
		"name": "Edmilson Soares",
		"email": "esbnet@gmail.com",
		"passwordHash": "$2a$06$uJbUPvRcs5y9MtUSUFCQue2id2jmzjp1KjVqLRobXpaj1tM92ajoq",
		"role": "MEMBER",
		"createdAt": "2024-11-20T17:45:48.019Z"
	},
	{
		"id": "cm3qihwix0000y7f7ydgc4n1p",
		"name": "João dos Santos",
		"email": "joao@gmail.com",
		"passwordHash": "$2a$06$ule3/WK5fhxINzsVyXg05OC2Sn8SUjC/dmxz9Fa6j1TTddjpFrRJi",
		"role": "MEMBER",
		"createdAt": "2024-11-20T23:25:46.090Z"
	}
]
```

##### Deleta Usuário
```
DELETE /user
payload:
{
	"email": "esbnet@gmail.com"
}

response:
Usuário esbnet@gmail.com deletado com sucesso!
```
##### Editar Usuário
```
PUT /user
payload:
{
	"id":"df69bdab-2948-4bac-be73-be8a701bef61",
	"name":"Neno Soares da Silva",
	"email":"esbnet2@gmail.com",
	"password":"lasdfjksdjfsjlf"
}

response:
Usuário atualizado com sucesso!
```
##### Localizar Por Email
```
POST /user
payload:
{
  	"email":"esbnet2@gmail.com",
}

response:
{
	"id": "cm3rtw5wu0002ks1qbik8jl7u",
	"name": "Edmilson Soares Bezerra",
	"email": "esbnet@gmail.com",
	"passwordHash": "$2a$06$PZUOPwguYRgNFY00YraSGO9Se8odCoHl9p53Pv2RC/IeUfu/F2STu",
	"role": "MEMBER",
	"createdAt": "2024-11-21T21:32:33.390Z"
}
```
---
#### Post
##### Criar Post
```
POST /post/new
payload:
{
	"title": "Javascript - A linguagem que revolucionou a internet",
	"description":  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
	"authorId": "cm3q6cp9u000411c83c868ecy",
	"imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"likes": 10

}
response:
{
	"id": "cm3q7b7aw0001chllmorz14rw",
	"authorId": "cm3q6cp9u000411c83c868ecy",
	"title": "Javascript - A linguagem que revolucionou a internet",
	"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
	"imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	"views": 0,
	"likes": 10,
	"dislikes": 0,
	"createdAt": "2024-11-20T18:12:37.598Z"
}
```

##### List Posts
```
GET /posts
payload:

response:
[
	{
		"id": "cm3q7b7aw0001chllmorz14rw",
		"authorId": "cm3q6cp9u000411c83c868ecy",
		"title": "Javascript - A linguagem que revolucionou a internet",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
		"imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"views": 0,
		"likes": 10,
		"dislikes": 0,
		"createdAt": "2024-11-20T18:12:37.598Z",
		"author": {
			"id": "cm3q6cp9u000411c83c868ecy",
			"name": "Edmilson Soares",
			"email": "esbnet@gmail.com",
			"passwordHash": "$2a$06$uJbUPvRcs5y9MtUSUFCQue2id2jmzjp1KjVqLRobXpaj1tM92ajoq",
			"role": "MEMBER",
			"createdAt": "2024-11-20T17:45:48.019Z"
		}
	},
	{
		"id": "cm3q6vnrb00036h12m4fihb06",
		"authorId": "cm3q6cp9u000411c83c868ecy",
		"title": "Javascript - A linguagem que revolucionou a internet",
		"description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl vel",
		"imageUrl": "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
		"views": 0,
		"likes": 10,
		"dislikes": 0,
		"createdAt": "2024-11-20T18:00:32.519Z",
		"author": {
			"id": "cm3q6cp9u000411c83c868ecy",
			"name": "Edmilson Soares",
			"email": "esbnet@gmail.com",
			"passwordHash": "$2a$06$uJbUPvRcs5y9MtUSUFCQue2id2jmzjp1KjVqLRobXpaj1tM92ajoq",
			"role": "MEMBER",
			"createdAt": "2024-11-20T17:45:48.019Z"
		}
	}	
]
```
##### List Posts
```
GET /report

payload:
response:
[
	{
		"id": "cm3ru7tov000fks1q82f4f275",
		"title": "df ãçfkla fkãsf ~çkf ~kasf ksaçf ~sadf k~sa fksa f~sdaç fçfs",
		"views": 0,
		"likes": 0,
		"dislikes": 0
	},
	{
		"id": "cm3rvpv2u00012z4fp1sww7ti",
		"title": "sdf sfa sfa fa sfasdfasd fasdf ada sdfa sdfasdf sdf adf ",
		"views": 0,
		"likes": 0,
		"dislikes": 0
	}
]
```
##### Deleta Post
```
DELETE /post
payload:
{
	"postId": "f529987d-6070-474e-b01c-a8627b3cf1c2",
	"authorId": "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0"
}

response:
Usuário esbnet@gmail.com deletado com sucesso!
```
##### Editar Post
```
PUT /post
payload:
{
	"id":"894bb68f-da55-4b92-948c-b8ec1f351847",
	"views": 16
}

response:
Post atualizado com sucesso!

Erro:
{
	"error": "Apenas o autor pode alterar o post.undefined"
}

```
##### Localizar Por Post id
```
POST /post
payload:
{
	"id":"cm3ru7tov000fks1q82f4f275"
}

response:
{
	"id": "cm3ru7tov000fks1q82f4f275",
	"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
	"title": "Novo título",
	"description": "Novo conteúdo djf sldfçasfçasd fjasdfçasfsfd",
	"imageUrl": "",
	"views": 16,
	"likes": 16,
	"dislikes": 16,
	"createdAt": "2024-11-21T21:41:37.422Z",
	"author": {
		"id": "cm3rtzhvb0005ks1qhxl1j7kw",
		"name": "João Pereira",
		"email": "joao@gmail.com",
		"passwordHash": "$2a$06$Ep4ZznhizpzwkgHPMyZcT.Ik840YqgJwRvyBAMkiG2UUwKz0X9xYe",
		"role": "MEMBER",
		"createdAt": "2024-11-21T21:35:08.855Z"
	},
	"comments": [
		{
			"id": "cm3ru83w7000hks1qeg9avdvz",
			"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
			"postId": "cm3ru7tov000fks1q82f4f275",
			"description": "asfasd fasdfs sf sf sf fsfsf",
			"removed": false,
			"createdAt": "2024-11-21T21:41:50.647Z"
		},
		{
			"id": "cm3ru86yu000jks1qkhzvblyy",
			"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
			"postId": "cm3ru7tov000fks1q82f4f275",
			"description": "asfasd fasdfs sf sf sf fsfsf",
			"removed": false,
			"createdAt": "2024-11-21T21:41:54.629Z"
		}
	]
}
```
---
#### Comentários
##### Criar Comentário
```
POST /comment/new
payload:
{
	"authorId": "cm3qihwix0000y7f7ydgc4n1p",
	"postId": "cm3q6kmdy00014up6hgsng3jv",
	"description":  "Meu primeiro comentário sdfasdfasdf"
}

response: 201
{
	"id": "cm3qv1aie0003kwuj7j3tpl9i",
	"authorId": "cm3qihwix0000y7f7ydgc4n1p",
	"postId": "cm3q6kmdy00014up6hgsng3jv",
	"description": "Meu primeiro comentário sdfasdfasdf",
	"removed": false,
	"createdAt": "2024-11-21T05:16:46.069Z"
}
```
##### Lista Commentários
```
GET /commnets

payload:
response: 200
[
	{
		"id": "cm3ru83w7000hks1qeg9avdvz",
		"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
		"postId": "cm3ru7tov000fks1q82f4f275",
		"description": "asfasd fasdfs sf sf sf fsfsf",
		"removed": false,
		"createdAt": "2024-11-21T21:41:50.647Z"
	},
	{
		"id": "cm3ru86yu000jks1qkhzvblyy",
		"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
		"postId": "cm3ru7tov000fks1q82f4f275",
		"description": "asfasd fasdfs sf sf sf fsfsf",
		"removed": false,
		"createdAt": "2024-11-21T21:41:54.629Z"
	}
]
```

##### Deleta Comentário
```
DELETE /comment
payload:
{
	"commentId": "2b5dfb63-1dfb-40c5-b9c6-a06156553bfc",
	"authorId": "ef08a6ca-e8b4-4a45-bc34-9f810f9afec0"
}
response: 200
Commentário "2b5dfb63-1dfb-40c5-b9c6-a06156553bfc" deletado com sucesso!
```
##### Editar Commentário
```
PUT /comment
payload:
{
	"id":"cm3ru83w7000hks1qeg9avdvz",
	"description":  "Javascript domina o mercado - alterado 2",
	"removed": false
}

response: 200
Comentário alterado!

Erro:
{
	"error": "Comentário não encontrado"
}

```
##### Localizar Por id do Comentário
```
POST /comment
payload:
{
	"id": "cm3ru83w7000hks1qeg9avdvz"
}

response:
{
	"id": "cm3ru83w7000hks1qeg9avdvz",
	"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
	"postId": "cm3ru7tov000fks1q82f4f275",
	"description": "asfasd fasdfs sf sf sf fsfsf",
	"removed": false,
	"createdAt": "2024-11-21T21:41:50.647Z"
}
```
##### Localizar Por id do Post
```
POST /comments
payload:
{
	"id": "cm3ru7tov000fks1q82f4f275"
}

response:
[
	{
		"id": "cm3ru86yu000jks1qkhzvblyy",
		"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
		"postId": "cm3ru7tov000fks1q82f4f275",
		"description": "asfasd fasdfs sf sf sf fsfsf",
		"removed": false,
		"createdAt": "2024-11-21T21:41:54.629Z",
		"user": {
			"id": "cm3rtzhvb0005ks1qhxl1j7kw",
			"name": "João Pereira",
			"email": "joao@gmail.com",
			"passwordHash": "$2a$06$Ep4ZznhizpzwkgHPMyZcT.Ik840YqgJwRvyBAMkiG2UUwKz0X9xYe",
			"role": "MEMBER",
			"createdAt": "2024-11-21T21:35:08.855Z"
		}
	},
	{
		"id": "cm3ru83w7000hks1qeg9avdvz",
		"authorId": "cm3rtzhvb0005ks1qhxl1j7kw",
		"postId": "cm3ru7tov000fks1q82f4f275",
		"description": "asfasd fasdfs sf sf sf fsfsf",
		"removed": false,
		"createdAt": "2024-11-21T21:41:50.647Z",
		"user": {
			"id": "cm3rtzhvb0005ks1qhxl1j7kw",
			"name": "João Pereira",
			"email": "joao@gmail.com",
			"passwordHash": "$2a$06$Ep4ZznhizpzwkgHPMyZcT.Ik840YqgJwRvyBAMkiG2UUwKz0X9xYe",
			"role": "MEMBER",
			"createdAt": "2024-11-21T21:35:08.855Z"
		}
	}
]
```
#### Interações - por fazer
##### Criar Interação
```
POST /interaction/new
payload:
{
	"id":"id da interação",
	"postId":"id do post",
	"userId":"id do usuário",
	"like": true,
	"dislike": false,
}

response: 201

```
##### Alternar Interação
```
PUT /interaction
payload:
{
	"id":"id da interação",
	"userId":"id do usuário",
	"like": false,
	"dislike": true,
}

response: 201
Interação alternada com sucesso

```
##### Lista Interação por usuário
```
GET /interactions/[user]/[id]
payload:

response: 200

```

##### Lista Interação por usuário
```
GET /interactions/[post]/[id]
payload:

response: 200

```
