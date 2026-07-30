# ReCEPtor

O ReCEPtor é uma aplicação web simples e prática para consultar informações de endereço a partir de um CEP. A solução combina um backend em Express com um frontend leve em HTML, CSS e JavaScript, oferecendo uma experiência rápida para buscar, visualizar e copiar os dados retornados.

## Funcionalidades

- Busca de endereço por CEP
- Validação de entrada no backend
- Mensagens de erro amigáveis para o usuário
- Copiar os dados do resultado para a área de transferência
- Endpoint de saúde para monitoramento simples

## Tecnologias utilizadas

- Node.js
- Express
- JavaScript no frontend
- Bootstrap para a interface
- Brasil API para consulta de CEP

## Estrutura do projeto

- backend/src/server.js: inicialização do servidor Express
- backend/src/routes/router.js: definição das rotas da API
- backend/src/controller/cepController.js: controle da requisição
- backend/src/service/cepService.js: validações e transformação dos dados
- backend/src/providers/cepProvider.js: integração com a Brasil API
- frontend/index.html: interface do usuário
- frontend/script.js: lógica de busca e interação no navegador

## Como instalar

1. Acesse a pasta do projeto:
   ```bash
   cd ReCEPtor
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como executar

### Backend

```bash
npm run dev
```

O servidor ficará disponível em:

- http://localhost:3000

### Frontend

Abra o arquivo abaixo no navegador:

- frontend/index.html

## Como usar

1. Abra a interface no navegador.
2. Digite um CEP com 8 dígitos.
3. Clique em "Buscar CEP".
4. O sistema exibirá a rua, cidade e estado correspondente.
5. Use "Copiar tudo" para copiar os dados para a área de transferência.

## API

### Buscar CEP

Endpoint:

```http
GET /ReCEPtor/:cep
```

Exemplo:

```http
GET /ReCEPtor/01001000
```

Resposta esperada:

```json
{
  "content": {
    "cep": "01001-000",
    "rua": "Praça da Sé",
    "cidade": "São Paulo",
    "estado": "SP"
  }
}
```

### Saúde do serviço

```http
GET /health
```

## Melhorias aplicadas

- Ajuste nas mensagens de validação para português
- Validação mais segura de CEP (somente números e exatamente 8 dígitos)
- Melhoria na interface com feedback visual para erros e sucesso
- Implementação da função de copiar dados
- Adição de endpoint de saúde e scripts úteis no package.json

## Testes

Execute:

```bash
npm test
```
