import { IUser } from "server/dbModels/user";

export interface IOsuUser {
  id: number;
  username: string;
  avatar_url: string;
  country_code: string;
}

export interface IUserStore {
  isLoggedIn: boolean;
  user: IUser;
  osuUser: IOsuUser;
}
