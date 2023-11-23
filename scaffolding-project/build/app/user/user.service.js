"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const lodash_1 = require("lodash");
const typedi_1 = require("typedi");
const user_repository_1 = require("./user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(userId)) {
                return Promise.reject(new Error('InvalidUserIdError'));
            }
            return yield this.userRepository.findById(userId);
        });
    }
    checkUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isActiveUser(user)) {
                return Promise.reject(new Error('UserNoActiveError'));
            }
            // La palabra clave await se utiliza para esperar la resolución de una promesa. 
            //Como "user" es objeto ya resuelto, no es necesario usar await.
            return user;
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.findAll();
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidUser(user)) {
                return Promise.reject(new Error('InvalidUserError'));
            }
            return yield this.userRepository.create(user);
        });
    }
    isValidId(userId) {
        return userId != null && (0, lodash_1.isNumber)(userId) && userId > 0;
    }
    //Usuario activo si su variable es true o undefined(por si no está definido)
    isActiveUser(user) {
        return user.isActive;
    }
    isValidType(username) {
        //Sin contar tampoco con los espacios en blanco al principio y al final de una cadena-> Uso trim()
        return typeof username == 'string' && username.trim().length > 0;
    }
    //Comprobamos que tanto user como su username no son ni null ni undefined.
    isValidUser(user) {
        if (user === null || user === void 0 ? void 0 : user.username) {
            return true;
        }
        else {
            return false;
        }
    }
    //Digo que hay que borrar.De manera generica.
    delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(userId)) {
                return Promise.reject(new Error('InvalidUserIdError'));
            }
            return yield this.userRepository.delete(userId);
        });
    }
    //Digo que hay que actualizar.De manera generica.
    update(userId, username, isActive) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isValidId(userId)) {
                return Promise.reject(new Error('InvalidUserIdError'));
            }
            // Crear un objeto User auxiliar con userId y username para la funcion isValidUser() y isActiveUser().
            const userToUpdate = {
                id: userId,
                username: username,
                isActive: isActive
            };
            //Validar si existe y no es null ni el user ni el name.
            if (!this.isValidUser(userToUpdate)) {
                return Promise.reject(new Error('NoExistUserError'));
            }
            //Validamos que esté activo
            if (this.isActiveUser(userToUpdate) == false) {
                return Promise.reject(new Error('UserOffError'));
            }
            //Por ultimo, validamos si es el username es un string
            if (!this.isValidType(username)) {
                return Promise.reject(new Error('InvalidUserTypeError'));
            }
            return yield this.userRepository.update(userId, username, isActive);
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
