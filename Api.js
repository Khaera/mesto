export class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  };

  _statusValidation(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  };

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._statusValidation(res));
  };

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    }).then((res) => this._statusValidation(res));
  };

  editUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    }).then((res) => this._statusValidation(res));
  };

  addNewCard( {name, link} ) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    }).then((res) => this._statusValidation(res));
  };

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._statusValidation(res));
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then((res) => this._statusValidation(res));
  }

  deleteLike(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((res) => this._statusValidation(res));
  }

  editProfileAvatar( {link} ) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: link
      })
    }).then((res) => this._statusValidation(res));
  }
};


