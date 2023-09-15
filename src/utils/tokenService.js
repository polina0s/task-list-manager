import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
class TokenService {
  saveTokens({ access, refresh }) {
    const decodeAccess = jwt_decode(access);
    Cookies.set('access', access, { expires: decodeAccess.exp });

    const decodeRefresh = jwt_decode(refresh);
    Cookies.set('refresh', refresh, { expires: decodeRefresh.exp });
  }

  getTokens() {
    const access = Cookies.get('access');
    const refresh = Cookies.get('refresh');

    return { access, refresh };
  }
}

export const tokenService = new TokenService();
