# Repositório Segunda Semana Node.Js

> Aqui está contida uma API que utiliza das tecnologias Node.Js, Prisma, Fastify e Docker.

## A API:
* A API consiste em um Schema com três modelos: Usuário, Post e Like. Sendo estes modelos interconectados.

### Os CRUDs:
* **Usuário**: O CRUD de usuários pode realizar operações de autenticação, registro, listagem, leitura de um usuário específico através do id, alteração e deleção.
* **POST**: O CRUD de posts pode realizar operações de registro, listagem, leitura de um post específico através do id, leitura dos posts de um usuário, alteração e deleção.
* **LIKE**: O CRUD de likes pode realizar operações de registro, leitura de um like específico, leitura dos likes de um usuário, leitura dos likes de um post, alteração e deleção.