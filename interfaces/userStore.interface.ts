import { IUser } from "server/dbModels/user";

export interface IOsuUser {
  id: number;
  username: string;
  avatar_url: string;
}

export interface IUserStore {
  isLoggedIn: boolean;
  user: IUser & { _id: string };
  osuUser: IOsuUser;
}
