export default class Users {
  constructor(emailAddress, password, firstName, lastName, pictureUrl, admin) {
    this.emailAddress = emailAddress;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.pictureUrl = pictureUrl;
    this.admin = admin;
  }
}
