import { IInventory } from "./inventory.interface";

export interface IUser {
  id: string;
  username: string;
  osuId: number;
  inventory: IInventory;
  email: string;
  discordId: string;
  createdAt: Date;
}

export interface IUserState {
  isLoggedIn: boolean;
  user: IUser;
}
