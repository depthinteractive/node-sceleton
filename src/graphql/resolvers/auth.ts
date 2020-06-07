// model
import { IAuth, Auth } from '../../core/model/Auth'; 
import { User, IUser } from '../../core/model/User';
// validator
import { login, signup } from "../../validators/validators/auth";
import { NodeError, _e, Error } from '../../core/NodeError';
import { ErrorObject } from 'ajv';

export default {
  login: async (input: { email: string, password: string }): Promise<IAuth> => {
    try{
      if(!login.isValid(input)) throw new NodeError<ErrorObject[]>(422, login.getErrors()!)

      const user: IUser | null = await User.findOne({ email: input.email });

      if(!user){
        throw new NodeError<Error[]>(422, [{ message: _e.USER_DOES_NOT_EXISTS, field: 'email' }]);
      }else if(!await user.comparePassword!(input.password)){
        throw new NodeError<Error[]>(422, [{ message: _e.PASSWORD_IS_ICORRECT, field: 'password' }]);
      }
      
      return new Auth(user);
    }catch(err){
      throw err;
    }
  },

  signup: async (input: { email: string, password: string} ): Promise<IAuth> => {
    try{
      if(!signup.isValid(input)) throw new NodeError<ErrorObject[]>(422, signup.getErrors()!)

      if(await User.findOne({ email: input.email })){
        throw { message: _e.USER_DOES_NOT_EXISTS, field: 'email' };
      }

      const user: IUser = await new User({ email: input.email, password: input.password }).save();
      return new Auth(user);
    }catch(err){
      throw err;
    }
  }
}