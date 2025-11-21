export const config = {
    runner: 'local',
    specs: [
        './test/specs/**/*.js'
    ],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        maxInstances: 1,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: (() => {
                const baseArgs = [
                    '--disable-gpu',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--window-size=1920,1080'
                ];
                
                // En CI siempre usar headless
                if (process.env.CI || !process.env.HEADED) {
                    baseArgs.push('--headless=new');
                }
                
                return baseArgs;
            })()
        }
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://the-internet.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    
    // ✅ CORRECCIÓN: Agregar el servicio ChromeDriver
    services: ['chromedriver'],
    
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // ✅ CORRECCIÓN: Quitar configuración manual de hostname/puerto
    // ChromeDriver maneja esto automáticamente
    
    // Hooks
    before: async () => {
        await browser.setTimeout({
            'pageLoad': 20000,
            'script': 30000,
            'implicit': 10000
        });
    },
    
    beforeTest: async (test) => {
        console.log(`Starting test: ${test.title}`);
    },
    
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        if (error) {
            console.log(`Test failed: ${test.title}`);
            await browser.saveScreenshot(`./error-${Date.now()}.png`);
        }
    }
};