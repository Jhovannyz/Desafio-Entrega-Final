import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Onde estão os testes
  fullyParallel: true,
  reporter: 'html', // Gera um relatório HTML
  
  // Define a URL base para os testes (como no docker-compose)
  use: {
    baseURL: 'http://localhost:8080',
    trace: 'on-first-retry',
  },

  // Configuração para rodar os testes localmente
  // (O CI/CD vai ter sua própria configuração)
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});