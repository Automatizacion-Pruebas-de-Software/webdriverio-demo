/**
 * Datos de prueba para los tests de login
 * Separar los datos de las pruebas permite mayor mantenibilidad
 */
module.exports = {
    validUser: {
        username: 'tomsmith',
        password: 'SuperSecretPassword!',
        expectedMessage: 'You logged into a secure area!'
    },
    invalidUser: {
        username: 'invaliduser',
        password: 'wrongpassword',
        expectedMessage: 'Your username is invalid!'
    },
    invalidPassword: {
        username: 'tomsmith',
        password: 'wrongpassword',
        expectedMessage: 'Your password is invalid!'
    }
};