/**
 * Page Object para la página segura después del login
 */
class SecurePage {
    
    // Element getters
    get flashMessage() { return $('#flash'); }
    get pageTitle() { return $('h2'); }
    get logoutButton() { return $('a.button.secondary.radius'); }
    get welcomeMessage() { return $('h4.subheader'); }

    // Methods
    async verifySecurePage() {
        await this.waitForPageToLoad();
        await expect(this.pageTitle).toHaveText('Secure Area');
        await expect(this.logoutButton).toExist();
    }

    async waitForPageToLoad() {
        await this.pageTitle.waitForExist({ timeout: 10000 });
        await this.logoutButton.waitForExist({ timeout: 10000 });
        
        // Verificar que la URL es correcta
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/secure');
            },
            {
                timeout: 10000,
                timeoutMsg: 'No se navegó al área segura'
            }
        );
    }

    async getFlashMessage() {
        await this.flashMessage.waitForExist({ timeout: 10000 });
        return await this.flashMessage.getText();
    }

    async logout() {
        // Verificar que el botón de logout es clickeable
        await this.logoutButton.waitForClickable({ 
            timeout: 10000,
            timeoutMsg: 'El botón de logout no es clickeable'
        });
        
        await this.logoutButton.click();
        
        // Esperar a que la navegación ocurra
        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl.includes('/login');
            },
            {
                timeout: 15000,
                timeoutMsg: 'El logout no redirigió a la página de login'
            }
        );
    }

    async getWelcomeMessage() {
        await this.welcomeMessage.waitForExist({ timeout: 5000 });
        return await this.welcomeMessage.getText();
    }
}

module.exports = SecurePage;