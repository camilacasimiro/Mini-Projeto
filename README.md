# Mini-Projeto

## Inicialização
Para inicializar a API você deverá:
1. Clonar o repositório
2. Criar na pasta raiz um arquivo .env, que apresenta os parâmetros de configuração do banco

Exemplo do arquivo .env (trocar os valores das chaves pelos dados do seu banco):

```
DB_USER={usuário do postgres}
DB_PASSWORD={senha do postgres} 
DB_HOST={host do postgis no docker}
DB_PORT={porta do postgis no docker} 
DB_DATABASE={nome do banco - case sensitive}

REDIS_HOST={IP do container}
REDIS_PORT={Porta padrão 6379}

MONGO_HOST={IP do container}
MONGO_PORT={Porta padrão 27017}
MONGO_DATABASE={nome do banco}

```

3. ```npm i```
4. ```npm start```
