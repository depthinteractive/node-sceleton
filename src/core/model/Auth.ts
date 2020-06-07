import jwt from 'jsonwebtoken';
// model
import { IUser } from './User';

export interface IAuth {
  id: string;
  email: string,
  token: string;
}

export class Auth implements IAuth {
  private _id!: string;
  private _email!: string;
  
  readonly token: string;
  readonly expiresIn: number = 1;

  protected readonly secret: string = 'nodesceletonappsupersecretkey';

  constructor(user: IUser){
    this.id = user.id;
    this.email = user.email;
    this.token = jwt.sign({ id: this.id, email: this.email }, this.secret, { expiresIn: `${this.expiresIn}h` });
  }

  get id(): string {
    return this._id;
  }
  set id(value: string){
    this._id = value;
  }

  get email(): string {
    return this._email;
  }
  set email(value: string){
    this._email = value;
  }
  
}