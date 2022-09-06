## Description

Para iniciar a aplicação na sua máquina, você precisa clonar este repositório e ter o Docker instalado em sua máquina. Caso não tenha o **Docker**, você também poderá iniciar a aplicação, porém precisará fornecer instâncias do serviço **PostgreSQL** separadamente.

**Versão do Node.js:** 16.16.0 (LTS)

## Instalação

Após clonar o repositório, execute na raiz do projeto:

```bash
docker-compose up --build -d
```

O comando irá montar todo o ambiente completo do docker de forma separa, não travando seu terminal. Execute também:

```bash
$ npm install
```

Para instalar todas as dependências.

## Executando a aplicação

Após executar os comandos acima, você pode abrir o VS Code na raiz do projeto, utilizando a extensão Remote Container para obter os melhores recursos do docker no desenvolvimento.

Comandos abaixo para iniciar a aplicação

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# debug mode
$ npm run start:debug

# production mode
$ npm run start:prod
```

Obs: Acompanha este repositório, na pasta .vscode, as configurações para executar a aplicação em modo de debug.

## Testando

```bash
# tests
$ npm run test

# tests watch mode
$ npm run test:watch
```

## Desenvolvendo

O projeto foi criado a partir de conceitos de Arquitetura Modular, junto com o design pattern **SOLID**, sempre buscando o desenvolvimento para pessoas e não máquinas, com códigos legíveis, inteligíveis e didáticos.

Por isso em seu desenvolvimento, trabalhe de preferência utilizando metodologias como BDD e TDD, facilitando assim um desenvolvimento mais polido.

### **Módulos - Divisão de Negócios**

```
A pasta modules deve ser pensada em forma de negócio, que possa ser desacoplada do resto da aplicação, possibilitando assim um futuro de micro-serviços. Ao conversar entre módulos, se realmente necessário, utilize apenas arquitetura de eventos com o RabbitMQ.
```

#### - **Camada de controllers**

```
A pasta de controllers deve conter toda a comunicação da aplicação externa/interna, seja por REST API, GRAPHQL ou Eventos e Pub/Sub.
```

#### - **Camada de entidades**

```
Toda a regra de negócio das entidades, validação e configuração devem ficar nas entidades.
```

#### - **Camada de infraestrutura**

```
Separadamente as models devem conter as especificações do banco de dados, e o repositório deverá conter as conexões diretas com o banco.
```

#### - **Camada de casos de uso**

```
Aqui será o core das regras de negócio, onde serão feitas as implementações recebendo alguma informação dos controllers, tratando e então passando para a camada de repositórios.
```

### **Banco de Dados e Migration**

```
Toda a estrutura do banco deverá ser versionada, para mantermos um histórico da estrutura e também para realizarmos reversões de forma simples quando necessário.

Aqui também poderá ser utilizado para cargas de dados e ajustes de informações incorretas no banco.
```

### **Configurações e Variáveis de Ambiente**

```
A pasta config fornece as variáveis de ambiente para a aplicação que está em Nestjs, como também de forma desacoplada para outras camadas da aplicação.
```

### **Infraestrutura**

```
Na parte de infraestrutura temos o serviço de logger padrão do projeto. Aqui pode ser configurado itens gerais da aplicação.
```

```

```
