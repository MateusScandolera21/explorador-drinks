# Explorador de Drinks

A aplicação foi desenvolvida em Vue 3 que consome a API pública "TheCocktailDB" para exibir, buscar e favoritar drinks.
O projeto foi desenvolvido como parte de um desafio técnico com foco em organização de código, componentização e gerenciamento de estado.

---

## Tecnologias Utilizadas:

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Axios
- SCSS

---

## Funcionalidades:

### Filtro por Letra:
Um alfabeto interativo ( A-Z ) que lista todos os drinks iniciados pela letra selecionada.

### Busca por Nome:
Um campo de busca com debounce no qual é possível encontrar os drinks pelo nome digitado.

### Filtro por Categoria:
Uma lista de categorias de drinks fornecida pela própria API com filtragem dinâmica.

### Favoritos:
Permite favoritas os drinks. Os favoritos são armazenados no estado global com pinia e persistidos em localStorage.

### Página de Detalhes:
Ao clicar sobre um drink é aberto uma página contendo:

- Imagem
- Nome
- Lista dinâmica de ingredientes ( fornecidos pela API )
- Instruções de preparo ( fornecidos pela API )

---

## Estrutura do projeto:

src:
  - components
  - pages
  - services
  - stores
  - router
  - assets

onde:

**services** -> Responsável pelas chamadas à API

**stores** -> Gerenciamento de estado global com pinia

**components** -> Components reutilizáveis, tais como SearchBar, AphabetFilter, CategoryFilter

---

## Como rodar o projeto:

Clone o repositório:

```git clone https://github.com/MateusScandolera21/explorador-drinks.git```

Instale as dependências:

```npm install```

Execute o projeto:

```npm run dev``` ou ```yarn dev``` de acordo com a preferencia.

O projeto iniciará em http://localhost:5173

--

## Link da API utilizada:

https://www.thecocktaildb.com/api.php
