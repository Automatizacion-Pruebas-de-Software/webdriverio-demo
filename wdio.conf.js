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
                    '--disable-dev-shm-usage'
                ];
                
                // Verificar si debemos ejecutar en modo headed
                const isHeaded = process.env.HEADED === 'true' || 
                               process.argv.includes('--headed');
                
                if (!isHeaded) {
                    baseArgs.push('--headless=new');
                    baseArgs.push('--window-size=1920,1080');
                } else {
                    baseArgs.push('--start-maximized');
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
    services: [],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    // Configuración específica para CI
    hostname: 'localhost',
    port: 4444,
    path: '/',
    
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