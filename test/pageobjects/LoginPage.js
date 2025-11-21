/**
 * Page Object para la página de login
 * Contiene selectores y métodos para interactuar con la página de login
 */
import { $, browser } from '@wdio/globals';

class LoginPage {
    // Element getters
    get inputUsername() { return $('#username'); }
    get inputPassword() { return $('#password'); }
    get btnSubmit() { return $('button[type="submit"]'); }
    get flashMessage() { return $('#flash'); }
    get pageTitle() { return $('h2'); }

    // Methods
    async open() {
        await browser.url('https://the-internet.herokuapp.com/login');
        await this.inputUsername.waitForExist({ timeout: 10000 });
    }

    async login(username, password) {
        await this.inputUsername.setValue(username);
        await this.inputPassword.setValue(password);
        await this.btnSubmit.click();
    }

    async getFlashMessage() {
        await this.flashMessage.waitForExist({ timeout: 10000 });
        return await this.flashMessage.getText();
    }
}

export default LoginPage;