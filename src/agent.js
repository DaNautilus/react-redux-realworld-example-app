import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = response => response.body;

let token = '';
let tokenPlugin = request => {
  if (token) {
    request.set('authorization', `Token ${token}`);
  }
};

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(response => responseBody(response))
};

export const Articles = {
  all: () => requests.get('/articles?limit=10')
};

export const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } })
};

export const setToken = (newToken) => token = newToken;
