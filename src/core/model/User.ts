import { Schema, model, Document } from 'mongoose';
import { NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import i18n  from 'i18n';
import uniqueValidator from 'mongoose-unique-validator';
// core
import { _e } from '../NodeError';

const SALT: number = 12;

export type InputCreate = {
  input: {
    email: string,
    password: string
  }
}

export type InputUpdate = {
  input: {
    _id: string,
    name: string,
    role: string,
    status: number
  }
}

export type InputUpdatePassword = {
  input: {
    _id: string,
    password: string,
    newPassword: string
  }
}

export type InputID = {
  input: {
    _id: string
  }
}

export type InputFetch = {
  input: {
    condition: object
  }
}

export interface IUser extends Document {
  _doc: IUser | PromiseLike<IUser>;
  name: string;
  email: string;
  role: string;
  password: string;
  status: number;
  resetToken: string;
  resetTokenExpiration: Date;
  comparePassword?(password: string): Promise<boolean>;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: null
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    role: {
      type: String,
      required: true,
      default: 'ROLE_USER'
    },
    password: {
      type: String,
      required: true
    },
    status: {
      type: Number,
      required: true,
      default: 0
    },
    resetToken: String,
    resetTokenExpiration: Date,
    pages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Page'
      }
    ]
  },
  { timestamps: true }
).pre<IUser>('save', function(next: NextFunction) {
    const user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  }
);
UserSchema.methods.comparePassword = function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};
UserSchema.plugin(uniqueValidator,
  { message: `${'{PATH}'}_ALREADY_EXISTS` }
);

export const User = model<IUser>('User', UserSchema);
