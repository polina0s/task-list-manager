import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
class TokenService {
  saveTokens({ access, refresh }) {
    const decodeAccess = jwt_decode(access);
    const accessExp = new Date(new Date().getTime() + decodeAccess.exp);

    Cookies.set('access', access, {
      expires: accessExp,
      sameSite: 'strict',
      secure: true,
    });

    const decodeRefresh = jwt_decode(refresh);
    const refreshExp = new Date(new Date().getTime() + decodeRefresh.exp);

    Cookies.set('refresh', refresh, {
      expires: refreshExp,
      sameSite: 'strict',
      secure: true,
    });
  }

  getTokens() {
    const access = Cookies.get('access');
    const refresh = Cookies.get('refresh');

    return { access, refresh };
  }

  removeTokens() {
    Cookies.remove('access');
    Cookies.remove('refresh');
  }
}

export const tokenService = new TokenService();
