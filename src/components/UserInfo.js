export default
  class UserInfo {
  constructor({ nameUserSelector, jobUserSelector }) {
    this._userName = document.querySelector(nameUserSelector);
    this._userJob = document.querySelector(jobUserSelector);
  }

  getUserInfo() {
    const userInfo = {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
    return userInfo;
  }

  setUserInfo(userName, userJob) {
    this._userName.textContent = userName;
    this._userJob.textContent = userJob;

  }
}