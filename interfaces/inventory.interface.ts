export interface IGift {
  ticket: string;
  to: string;
  from: string;
  giftedAt: Date;
}

export interface ITickets {
  ticket: string;
  isGifted: Boolean;
  createdAt: Date;
}

export interface IInventory {
  owner: string;
  tickets: ITickets[];
  gifts: IGift[];
}
