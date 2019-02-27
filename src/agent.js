import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).then(response => responseBody(response))
};

export const Articles = {
  all: () => requests.get('/articles?limit=10')
};

export const Auth = {
  login: (email, password) => requests.post('/users/login', { user: { email, password } })
};
