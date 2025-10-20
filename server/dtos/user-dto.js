module.exports = class UserDto {
    id;
    name;
    email;
    isActivated;
    lastLogin;
    isBlocked;

    constructor(model) {
        this.id = model._id;
        this.name = model.name;
        this.email = model.email;
        this.isActivated = model.isActivated;
        this.lastLogin = model.lastLogin;
        this.isBlocked = model.isBlocked;
    }
}