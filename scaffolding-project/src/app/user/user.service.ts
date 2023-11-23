import { isNumber } from 'lodash';
import { Service } from 'typedi';

import { UserRepository } from './user.repository';
import { User } from './user.model';

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findById(userId: number): Promise<User> {
    if (!this.isValidId(userId)) {
      return Promise.reject(new Error('InvalidUserIdError'));
    }

    return await this.userRepository.findById(userId);
  }
  async checkUser(user: User): Promise<User> {
    if (!this.isActiveUser(user)) {
      return Promise.reject(new Error('UserNoActiveError'));
    }
  // La palabra clave await se utiliza para esperar la resolución de una promesa. 
  //Como "user" es objeto ya resuelto, no es necesario usar await.
    return user;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  async create(user: User): Promise<User> {
    if (!this.isValidUser(user)) {
      return Promise.reject(new Error('InvalidUserError'));
    }
    return await this.userRepository.create(user);
  }

  private isValidId(userId: any): boolean {
    return userId != null && isNumber(userId) && userId > 0;
  }
  //Usuario activo si su variable es true o undefined(por si no está definido)
  private isActiveUser(user: User): boolean {
    return user.isActive;
  }

  private isValidType(username: any): boolean {
    //Sin contar tampoco con los espacios en blanco al principio y al final de una cadena-> Uso trim()
    return typeof username == 'string' && username.trim().length > 0;
  }

  //Comprobamos que tanto user como su username no son ni null ni undefined.
  private isValidUser(user: User): boolean {
    if (user?.username) {
      return true;
    } else {
      return false;
    }
  }
  //Digo que hay que borrar.De manera generica.
  async delete(userId: number): Promise<User> {
    if (!this.isValidId(userId)) {
      return Promise.reject(new Error('InvalidUserIdError'));
    }

    return await this.userRepository.delete(userId);
  }

    //Digo que hay que actualizar.De manera generica.
    async update(userId: number, username: string,isActive: boolean): Promise<User> {

      if (!this.isValidId(userId)) {
        return Promise.reject(new Error('InvalidUserIdError'));
      }

      // Crear un objeto User auxiliar con userId y username para la funcion isValidUser() y isActiveUser().
      const userToUpdate: User = {
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

      return await this.userRepository.update(userId,username,isActive);
    }
  
}
