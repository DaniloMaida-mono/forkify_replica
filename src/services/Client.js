import axios from 'axios'

export default class Client {
    #client;
    #url;
    constructor(url) {
        this.#url = url
        this.#client = axios;

    }

    async #handleRequest(method = 'GET', path = "/", params = {}) {
        try {
            const data = await this.#client({
                method: method,
                url: `${this.#url}${path}`,
                params: params,
            })
            return data;
        } catch (err) {
            throw err;
        }
    }

    async get(path, params) {
        return this.#handleRequest('GET', path, params);
    }
}

