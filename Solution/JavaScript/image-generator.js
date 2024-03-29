const axios = require('axios');
const fs = require('fs');

class ImageGenerator {
    constructor(apiUrl, apiKey) {
        this.apiUrl = apiUrl;
        this.apiKey = apiKey;
    }

    async generateImage(text) {
        const response = await axios.post(this.apiUrl, {
            prompt: text,
        }, {
            headers: {
                'API-Key': this.apiKey,
                'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer' // to handle binary data
        });

        return JSON.parse(response.data).data[0].url;
    }
}

module.exports = { ImageGenerator };
