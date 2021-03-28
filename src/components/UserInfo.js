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
    if (dataUser.name) { this._name.textContent = dataUser.name };
    if (dataUser.about) { this._about.textContent = dataUser.about };
    if (dataUser.avatar) { this._avatar.src = dataUser.avatar };
    if (dataUser._id) { this._id = dataUser._id };
  }
}