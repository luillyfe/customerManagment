export interface ICustomer {
  customerID: number;
  name: IName;
  birthday: string;
  gender: string;
  lastContact: string;
  customerLifetimeValue: number;
}

export interface IName {
  first: string;
  last: string;
}
