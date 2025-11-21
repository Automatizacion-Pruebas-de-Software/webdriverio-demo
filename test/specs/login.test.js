/**
 * Test Suite para funcionalidad de Login
 * Describe los diferentes escenarios de prueba para el login
 */
describe('Login Functionality Tests', () => {
    beforeEach(async () => {
        await browser.url('https://the-internet.herokuapp.com/login');
        // Esperar a que la página cargue completamente
        await $('#username').waitForExist({ timeout: 10000 });
    });


    it('should login with valid credentials', async () => {
        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();
        
        // Verificar que estamos en el área segura
        await expect($('h2')).toHaveText('Secure Area');
        
        // Verificar mensaje de éxito
        const flashText = await $('#flash').getText();
        expect(flashText).toContain('You logged into a secure area!');
    });

    it('should not login with invalid username', async () => {
        await $('#username').setValue('invaliduser');
        await $('#password').setValue('wrongpassword');
        await $('button[type="submit"]').click();
        
        // Verificar que seguimos en login
        await expect($('h2')).toHaveText('Login Page');
        
        // Verificar mensaje de error
        const flashText = await $('#flash').getText();
        expect(flashText).toContain('Your username is invalid!');
    });

    it('should not login with invalid password', async () => {
        await $('#username').setValue('tomsmith');
        await $('#password').setValue('wrongpassword');
        await $('button[type="submit"]').click();
        
        // Esperar y verificar mensaje de error
        await $('#flash').waitForExist({ timeout: 10000 });
        const flashText = await $('#flash').getText();
        expect(flashText).toContain('Your password is invalid!');
    });

    it('should logout successfully', async () => {
        // Login primero
        await $('#username').setValue('tomsmith');
        await $('#password').setValue('SuperSecretPassword!');
        await $('button[type="submit"]').click();
        
        // Esperar a que cargue el área segura
        await $('h2').waitForExist({ timeout: 10000 });
        await expect($('h2')).toHaveText('Secure Area');
        
        // Hacer logout
        await $('a.button.secondary.radius').click();
        
        // Verificar que volvimos al login
        await expect($('h2')).toHaveText('Login Page');
        await expect($('#username')).toExist();
        await expect($('#password')).toExist();
    });

        it('should display login form elements', async () => {
        // Verificar que todos los elementos del formulario existen
        await expect($('#username')).toExist();
        await expect($('#password')).toExist();
        await expect($('button[type="submit"]')).toExist();
        await expect($('#login')).toExist();
        
        // Verificar atributos específicos
        await expect($('#username')).toHaveAttribute('type', 'text');
        await expect($('#password')).toHaveAttribute('type', 'password');
    });

});