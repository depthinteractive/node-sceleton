import { IUser } from "../../core/model/User";
import { crateValidator } from "../validator";
import loginSchema from '../schemas/auth/login.json';
import signupSchema from '../schemas/auth/login.json';

export const login = crateValidator<IUser>(loginSchema);
export const signup = crateValidator<IUser>(signupSchema);
