import { test, expect } from '@playwright/test';

// Define a URL base. O GitHub Actions vai rodar no localhost
const BASE_URL = 'http://localhost:8080';

test.describe('PWA PokeAPI', () => {

  test('1. Deve carregar a página inicial e o título', async ({ page }) => {
    await page.goto(BASE_URL);
    
    // Verifica se o título da página está correto
    await expect(page).toHaveTitle(/Minha PokeAPI/);
    
    // Verifica se o H1 está visível
    await expect(page.getByRole('heading', { name: 'Bem-vindo à Minha PokeAPI' })).toBeVisible();
  });

  test('2. Deve listar os 20 Pokémons iniciais', async ({ page }) => {
    await page.goto(BASE_URL);

    // Espera o primeiro card de Pokémon aparecer (bulbasaur)
    const firstPokemon = page.getByText('1. bulbasaur');
    await expect(firstPokemon).toBeVisible({ timeout: 10000 }); // Espera até 10s

    // Verifica se o último da lista (o 20º) também está lá
    const lastPokemon = page.getByText('20. raticate');
    await expect(lastPokemon).toBeVisible();
  });

  test('3. Deve buscar um Pokémon e mostrar os detalhes', async ({ page }) => {
    await page.goto(BASE_URL);

    // Digita "pikachu" no input de busca
    await page.getByPlaceholder('Digite o nome do Pokémon').fill('pikachu');
    
    // Clica no botão "Buscar"
    await page.getByRole('button', { name: 'Buscar' }).click();

    // Espera o H2 com o nome "pikachu" aparecer
    await expect(page.getByRole('heading', { name: 'pikachu (ID: 25)' })).toBeVisible();

    // Verifica se os detalhes (tipos) estão corretos
    await expect(page.getByText('Tipos: electric')).toBeVisible();
  });

});