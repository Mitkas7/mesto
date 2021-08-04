export default class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
    this._userId = '';
  }
  getUserInfo() {
    const data = {};
    data.name = this._userName.textContent;
    data.about = this._userAbout.textContent;
    return data;
  }
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userAbout.textContent = data.about;
  }
  setUserAvatar(avatar) {
    this._userAvatar.src = avatar;
  }
  getUserId() {
    return this._userId;
  }
}
