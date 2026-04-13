import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './test',
    fullyParallel: true,
    reporter: 'html',
    use: {
        baseURL: 'http://localhost:1234',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
});