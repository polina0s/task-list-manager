import { tokenService } from '../utils/tokenService';

export class Api {
  constructor() {
    this.api = import.meta.env.VITE_API;
    const { access, refresh } = tokenService.getTokens();
    this.access = access;
    this.refresh = refresh;
    console.log(this.access, this.refresh);
  }

  async request(url, options = {}) {
    return fetch(`${this.api}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.access}`,
        ...options?.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
  }

  setTokens(access, refresh) {
    tokenService.saveTokens({
      access: access,
      refresh: refresh,
    });

    this.access = access;
    this.refresh = refresh;
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

    this.setTokens(json.data.accessToken, json.data.refreshToken);

    return json;
  }
}

export const api = new Api();
