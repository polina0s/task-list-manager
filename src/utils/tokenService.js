import Cookies from 'js-cookie';

class TokenService {
  saveTokens({ access, refresh }) {
    Cookies.set('access', access);
    Cookies.set('refresh', refresh);
  }

  getTokens() {
    const access = Cookies.get('access');
    const refresh = Cookies.get('refresh');

    return { access, refresh };
  }
}

export const tokenService = new TokenService();
