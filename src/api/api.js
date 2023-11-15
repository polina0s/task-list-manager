import queryString from 'query-string';

import { tokenService } from '../utils/tokenService';
export class Api {
  constructor() {
    this.api = import.meta.env.VITE_API;
    this.queue = [];

    const { access, refresh } = tokenService.getTokens();
    this.access = access;
    this.refresh = refresh;
  }

  async request(url, options = {}, repeat = true) {
    const response = await fetch(`${this.api}/${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.access}`,
        ...options?.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (response.status === 401) {
      if (repeat) {
        this.queue.push(() => this.request(url, options, false));
        this.onRefresh();
      }
    }

    return response;
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

  async loginUser({ login, password }) {
    const response = await this.request('auth/login', {
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

  async fetchUserById({ id }) {
    const response = await this.request(`users/${id}`);
    const json = await response.json();

    return json;
  }

  async refreshTokens() {
    const response = await this.request('auth/refresh', {
      method: 'POST',
      body: { refreshToken: this.refresh },
    });

    const json = await response.json();

    this.setTokens(json.data.accessToken, json.data.refreshToken);
  }

  clearQueue() {
    this.queue = [];
  }

  async enqueue() {
    if (this.queue.length > 0) {
      await Promise.all(this.queue.map((func) => func())).then(() => {
        this.clearQueue();
      });
    }
  }

  async createTask({ text }) {
    const response = await this.request('tasks', {
      method: 'POST',
      body: { text },
    });

    const json = await response.json();

    return json;
  }

  async getTasks({ offset = 0, limit = 10 }) {
    const query = queryString.stringify({ limit, offset }, { skipNull: true });

    const response = await this.request(`tasks?${query}`, { method: 'GET' });

    const json = await response.json();

    return json;
  }

  async editTask({ id, text }) {
    const response = await this.request(`tasks/${id}`, {
      method: 'PATCH',
      body: {
        text,
      },
    });

    const json = await response.json();

    return json;
  }

  async takeToWork({ id }) {
    await this.request(`tasks/${id}/take-to-work`, {
      method: 'PATCH',
    });
  }

  async done({ id }) {
    await this.request(`tasks/${id}/done`, {
      method: 'PATCH',
    });
  }

  async deleteTask({ id }) {
    await this.request(`tasks/${id}`, { method: 'DELETE' });
  }

  async getTags({ offset = 0, limit = 10 }) {
    const query = queryString.stringify({ limit, offset }, { skipNull: true });

    const response = await this.request(`tags?${query}`, { method: 'GET' });

    const json = await response.json();

    return json;
  }

  async createTag({ name, color }) {
    const response = await this.request('tags', {
      method: 'POST',
      body: {
        name: name,
        color: color,
      },
    });

    const json = await response.json();

    return json;
  }

  async editTag({ name, color, id }) {
    const response = await this.request(`tags/${id}`, {
      method: 'PATCH',
      body: { name: name, color: color },
    });

    const json = await response.json();

    return json;
  }

  async deleteTag({ id }) {
    await this.request(`tags/${id}`, { method: 'DELETE' });
  }

  onRefresh() {}
}

export const api = new Api();
