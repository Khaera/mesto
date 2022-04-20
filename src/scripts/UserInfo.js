export class UserInfo {
  constructor( {nameSelector, careerSelector} ) {
    this._name = document.querySelector(nameSelector);
    this._career = document.querySelector(careerSelector);
  }

  getUserInfo() {
    const userData = {};
    userData.name = this._name.textContent;
    userData.career = this._career.textContent;

    return userData;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._career.textContent = userData.career;
  }
}
