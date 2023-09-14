export class Api {
  constructor() {
    this.api = import.meta.env.VITE_API;
  }

  async request(url, options = {}) {
    return fetch(`${this.api}/${url}`, {
      ...options,
      // mode: 'cors', // no-cors, *cors, same-origin
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  }

  async createUser({ login, password }) {
    const response = await this.request('users', {
      method: 'POST',
      body: { login, password },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.error);
    }

    return json;
  }
}

export const api = new Api();
