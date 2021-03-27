export default
  class UserInfo {
  constructor({ nameUserSelector, jobUserSelector, avatarSelector, id }) {
    this._name = document.querySelector(nameUserSelector);
    this._about = document.querySelector(jobUserSelector);
    this._avatar = document.querySelector(avatarSelector);
    this._id = id;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src,
      _id: this._id

    }
    return userInfo;
  }

  setUserInfo(dataUser) {
    this._name.textContent = dataUser.name;
    this._about.textContent = dataUser.about;
    this._avatar.src = dataUser.avatar;
    this._id = dataUser._id;
  }
}