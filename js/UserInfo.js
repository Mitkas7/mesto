export default class UserInfo {
  constructor(userName, userInfo) {
    this._userName = document.querySelector(userName);
    this._userInfo = document.querySelector(userInfo);
  }
  getUserInfo() {
    const data = {};
    data.name = this._userName.textContent;
    data.job = this._userInfo.textContent;
    return data;
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userInfo.textContent = data.job;
  }
}
