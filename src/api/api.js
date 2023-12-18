import axios from 'axios';
import queryString from 'query-string';

import { tokenService } from '../utils/tokenService';
export class Api {
  constructor() {
    this.api = import.meta.env.VITE_API;
    this.queue = [];
    this.isRefreshing = false;

    const { access, refresh } = tokenService.getTokens();
    this.access = access;
    this.refresh = refresh;

    this.instance = axios.create({
      baseURL: this.api,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.access}`,
      },
    });

    this.instance.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        const originalConfig = err.config;
        console.log(originalConfig);

        if (err.response) {
          if (err.response.status === 401 && !originalConfig.retry) {


            
            originalConfig.retry = true;

            try {
              await this.onRefresh();
              originalConfig.headers.Authorization = `Bearer ${this.access}`;
              console.log(originalConfig);
              return this.instance(originalConfig);
            } catch (error) {
              if (error.response && error.response.data) {
                return Promise.reject(error.response.data);
              }
              return Promise.reject(error);
            }
          }
        }
        return Promise.reject(err);
      },
    );
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
    const response = await this.instance.post('users', {
      login,
      password,
    });

    this.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );

    return response.data;
  }

  async loginUser({ login, password }) {
    const response = await this.instance.post('auth/login', {
      login,
      password,
    });

    this.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );

    return response.data;
  }

  async fetchUserById({ id }) {
    const response = await this.instance.get(`users/${id}`);

    return response.data;
  }

  async refreshTokens() {
    const response = await this.instance.post('auth/refresh', {
      refreshToken: this.refresh,
    });

    this.setTokens(
      response.data.data.accessToken,
      response.data.data.refreshToken,
    );

    return response;
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

  async createTask({ text, tags = [] }) {
    const response = await this.instance.post('tasks', {
      text,
      tags,
    });

    return response.data;
  }

  async getTasks({ offset = 0, limit = 10 }) {
    const query = queryString.stringify({ limit, offset }, { skipNull: true });

    const response = await this.instance.get(`tasks?${query}`);

    return response.data;
  }

  async editTask({ id, text, tags }) {
    const response = await this.instance.patch(`tasks/${id}`, { text, tags });

    return response.data;
  }

  async deleteTask({ id }) {
    await this.instance.delete(`tasks/${id}`);
  }

  async getTags({ offset = 0, limit = 10 }) {
    const query = queryString.stringify({ limit, offset }, { skipNull: true });

    const response = await this.instance.get(`tags?${query}`);

    return response.data;
  }

  async createTag({ name, color }) {
    const response = await this.instance.post('tags', {
      name,
      color,
    });

    return response.data;
  }

  async editTag({ name, color, id }) {
    const response = await this.instance.patch(`tags/${id}`, { name, color });

    return response.data;
  }

  async deleteTag({ id }) {
    await this.instance.delete(`tags/${id}`);
  }

  async changeTaskStatus({ id, status }) {
    await this.instance.patch(`tasks/${id}/status`, { status });
  }

  async onRefresh() {}
}

export const api = new Api();
