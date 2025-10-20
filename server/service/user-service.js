const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const mailService = require('./mail-sevice')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
const ApiError = require('../exceptions/api-error')

class UserService {
    async registration(name,email, password) {
        let candidate = await UserModel.findOne({ name });
        if (candidate) {
            throw ApiError.BadRequest('This name is already in use');
        }
        candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest('This email is already in use');
        }
    
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({name, email, password: hashPassword, activationLink});

        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
    
        return { ...tokens, user: userDto };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if(!user) {
            throw ApiError.BadRequest('follow the link to confirm your email')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(name,email,password) {
        const user = await UserModel.findOne({name});
        if(!user) {
            throw ApiError.BadRequest('No user with this name was found')
        }

        if(user.email !== email) {
            throw ApiError.BadRequest('Incorrect name or email ')
        }

        if(user.isBlocked) {
            throw ApiError.BadRequest('This user is blocked')
        }

        const isPassEquals = await bcrypt.compare(password,user.password);
        if(!isPassEquals) {
            throw ApiError.BadRequest('Incorrect password')
        }
        user.lastLogin = Date.now();
        await user.save();
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
    
    async getAllUsers(){
        const users = await UserModel.find();
        return users;
    }


    async delete(id) {
        const user = await UserModel.findByIdAndDelete(id);
        if (!user) {
            throw ApiError.BadRequest('User not found');
        }
    }

    async block(id) {
        const user = await UserModel.findById(id);
        if(!user) {
            throw ApiError.BadRequest('User not found')
        }
        user.isBlocked = true;
        await user.save();
    }

    async unlock(id) {
        const user = await UserModel.findById(id);
        if(!user) {
            throw ApiError.BadRequest('User not found')
        }
        user.isBlocked = false;
        await user.save();
    }


}

module.exports = new UserService();