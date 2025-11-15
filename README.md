# 🚀 PWA - Pokedex (Bootcamp II)

Projeto final do Bootcamp II, que consiste em converter uma aplicação em um **Progressive Web App (PWA)** funcional, consumindo a [PokéAPI](https://pokeapi.co/) pública.

A aplicação é totalmente containerizada com Docker, orquestrada com Docker Compose e integrada a um pipeline de CI/CD no GitHub Actions para testes automatizados.

## 🧑‍💻 Integrante

* **Nome:** Giovani Silva Rodrigues
* **RA:** 22503752

## 🛠️ Tecnologias Utilizadas

* **Frontend (PWA):** HTML5, CSS3, JavaScript (Vanilla)
* **PWA:** Service Worker, Web Manifest
* **API:** [PokéAPI (pokeapi.co)](https://pokeapi.co/) (API pública)
* **Containers:** Docker, Docker Compose
* **Servidor Web:** Nginx (Alpine)
* **Testes E2E:** Playwright
* **CI/CD:** GitHub Actions

## 🏗️ Arquitetura

O projeto segue uma arquitetura de monorepo com dois serviços principais orquestrados pelo Docker Compose:

* **`apps/web` (Frontend):**
    * O PWA principal (HTML/CSS/JS).
    * É servido por um container **Nginx** leve.
    * Contém o `service-worker.js` para funcionalidade offline (cache-first) e o `manifest.webmanifest` para instalação.

* **`apps/api` (Backend - *Exemplo*):**
    * *(Nota: Este projeto consome a PokéAPI pública diretamente do frontend, mas um serviço de API de exemplo foi incluído conforme solicitado nos requisitos para demonstrar a orquestação de múltiplos serviços com o Compose).*
    * Uma API Node.js/Express simples rodando em um container **Node.js**.

## 🚀 Como Executar (Localmente)

Para rodar o projeto completo (PWA + API) em sua máquina, você precisa ter o **Docker** e o **Docker Compose** instalados.

1.  Clone este repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    cd seu-repositorio
    ```

2.  Suba os containers usando o Docker Compose:
    ```bash
    docker-compose up --build
    ```

3.  Acesse o PWA no seu navegador:
    * **URL:** `http://localhost:8080`

## 🧪 Testes E2E (Playwright)

Os testes de ponta-a-ponta (E2E) garantem que a aplicação carrega e que a integração com a API está funcionando.

1.  Para rodar os testes manualmente (requer instalação local do Node.js):
    ```bash
    # (Instale o Playwright se for a primeira vez)
    # npm install -D @playwright/test
    # npx playwright install
    
    # Rode os testes
    npx playwright test
    ```

2.  Os testes também são executados automaticamente pelo **GitHub Actions** a cada `push` ou `pull request`.

## 🌐 Deploy (GitHub Pages)

O PWA está publicado e disponível para instalação através do GitHub Pages.

* **Link da Aplicação:** `[INSERIR O LINK DO GITHUB PAGES AQUI]`