
import { Service } from 'typedi';

import { User } from './user.model';
import { DatabaseService } from '../../database/database';

@Service()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findById(userId: number): Promise<User> {
    const queryDoc: any = {
      sql: 'SELECT * FROM users WHERE id = $1',
      params: [userId],
    };
    const users = await this.databaseService.execQuery(queryDoc);
    return users.rows[0];
  }

  async findAll(): Promise<User[]> {
    const queryDoc: any = {
      sql: 'SELECT * FROM users',
    };

    const users = await this.databaseService.execQuery(queryDoc);
    return users.rows;
  }

  async create(user: User): Promise<User> {
    const queryDoc: any = {
      sql: 'INSERT INTO users (username) VALUES ($1) RETURNING *',
      params: [user.username],
    };

    const users = await this.databaseService.execQuery(queryDoc);
    return users.rows[0];
  }
  //Y aqui, explico como borrar.
  async delete(userId: number): Promise<User> {
    const queryDoc: any = {
      //$1 hace referencia al primer parametro de params.
      //RETURNNING * DEVUELVE EL ELEMENTO.
      //sql: 'DELETE FROM users WHERE id= $1 AND is_active = true RETURNING *',
      sql: 'UPDATE users SET is_active = false WHERE id = $1 AND is_active = true RETURNING *',
      params: [userId],
    };
    const users = await this.databaseService.execQuery(queryDoc);
    return users.rows[0];
  }

  //Y aqui, explico como actualizar.
  async update(userId: number, username: string,isActive:boolean): Promise<User> {
    const queryDoc: any = {
      sql: 'UPDATE users SET username = $2, is_active = $3 WHERE id = $1 RETURNING *',
      params: [userId, username,isActive], // Asigna userId al primer parámetro ($1), username al segundo parámetro ($2) y interruptor parametro ($3)
    };
    const users = await this.databaseService.execQuery(queryDoc);
    return users.rows[0];
  }
}
