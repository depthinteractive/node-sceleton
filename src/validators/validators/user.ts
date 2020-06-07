import { IUser } from "../../core/model/User";
import { crateValidator } from "../validator";
import createSchema from '../schemas/user/create.json';
import updateSchema from '../schemas/user/update.json';
import readSchema from '../schemas/user/delete.json';
import deleteSchema from '../schemas/user/delete.json';
import updatePasswordSchema from '../schemas/user/updatePassword.json';

export const createUser = crateValidator<IUser>(createSchema);
export const updateUser = crateValidator<IUser>(updateSchema);
export const deleteUser= crateValidator<IUser>(deleteSchema);
export const readUser= crateValidator<IUser>(readSchema);
export const updateUserPassword = crateValidator<IUser>(updatePasswordSchema);
