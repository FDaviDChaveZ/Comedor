const axios = require('axios');

module.exports = {
    get: async function (codeuser) {
        try {
            console.log("code user", codeuser);
            const response = await axios.get("http://user_api:8080/users/" + codeuser);
            console.log("response data", response.data);
            
            if (!response.data) {
                return null; // Si no hay datos en la respuesta, devuelve null
            }
            
            return response.data; // Devuelve los datos de la respuesta
        } catch (error) {
            console.error('Error fetching user:', error.message);
            return null; // En caso de error, devolver null
        }
    }
};

