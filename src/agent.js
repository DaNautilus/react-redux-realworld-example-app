import _superagent from 'superagent';
import superagentPromise from 'superagent-promise';

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const limit = (count, page) => `limit=${count}&offset=${page ? page * count : 0}`;
const responseBody = response => response.body;

let token = '';
let tokenPlugin = request => {
  if (token) {
    request.set('authorization', `Token ${token}`);
  }
};

const requests = {
  get: url => superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  post: (url, body) => superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(response => responseBody(response)),
  put: (url, body) => superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(response => responseBody(response)),
  del: url => superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
};

export const Articles = {
  all: () => requests.get('/articles?limit=10'),
  get: slug => requests.get(`/articles/${slug}`),
  del: slug => requests.del(`/articles/${slug}`),
  byAuthor: (author, page) => requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  favorite: slug => requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) => requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () => requests.get('/articles/feed?limit=10&offset=0')
};

export const Auth = {
  current: () => requests.get('/user'),
  login: (email, password) => requests.post('/users/login', { user: { email, password } }),
  register: (username, email, password) => requests.post('/users', { user: { username, email, password } }),
  save: user => requests.put('/users', { user })
};

export const Comments = {
  create: (slug, comment) => requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) => requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug => requests.get(`/articles/${slug}/comments`)
};

export const Profile = {
  follow: username => requests.post(`/profiles/${username}/follow`),
  get: username => requests.get(`/profiles/${username}`),
  unfollow: username => requests.del(`/profiles/${username}/follow`)
};

export const setToken = (newToken) => token = newToken;
