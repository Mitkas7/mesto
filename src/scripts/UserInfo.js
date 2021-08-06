export default class UserInfo {
  constructor(userName, userAbout, userAvatar) {
    this._userName = userName;
    this._userAbout = userAbout;
    this._userAvatar = userAvatar;
    this._userId = '';
  }
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent,
      userAvatar: this._userAvatar.src
    }
  }
  setUserInfo(userName, userAbout) {
    this._userName.textContent = userName;
    this._userAbout.textContent = userAbout;
  }
  setUserAvatar(userAvatar) {
    this._userAvatar.src = userAvatar;
  }
  getUserId() {
    return this._userId;
  }
}
