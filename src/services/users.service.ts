import bcrypt from 'bcrypt';
import { EventsModel, UsersModel } from '../models';
import { jwtToken } from '../utils/jwt';

const signUp = (body: { username: string; password: string }) =>
  new Promise(async (rs, rj) => {
    try {
      const { username, password } = body;
      const isExist = await UsersModel.exists({ username });
      if (isExist) {
        rj('User already exist');
      }
      const user = new UsersModel({
        username,
        password,
      });

      await user.save();
      const token = jwtToken({ id: user._id, username });
      rs({
        token,
      });
    } catch (err) {
      rj(err);
    }
  });

const signIn = (body: { username: string; password: string }) =>
  new Promise(async (rs, rj) => {
    try {
      const { username, password } = body;
      const user = await UsersModel.findOne({ username });
      if (!user) return rj('Username does not exist');

      if (!bcrypt.compareSync(password, user.password))
        return rj('Password is not correct');

      rs({
        user,
        token: jwtToken({ id: user._id, username }),
      });
    } catch (err) {
      rj(err);
    }
  });

const getAll = () => {
  return UsersModel.find();
};

const events = (userId: string) =>
  new Promise(async (rs, rj) => {
    try {
      const events = await EventsModel.find({ users: userId });
      rs(events);
    } catch (err) {
      rj(err);
    }
  });

const UserService = {
  signUp,
  signIn,
  getAll,
  events,
};

export default UserService;
