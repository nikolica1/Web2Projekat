export interface Register {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  picture: string;
  role: string;
  }

  export interface Driver {
    id: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    birthday: Date;
    address: string;
    picture: string;
    role: string;
    verification: string;
    block: boolean;
  }
  export interface UserUpdate {
  id: number;
  username: string;
  email: string;
  newpassword: string;
  oldpassword: string;
  firstName: string;
  lastName: string;
  birthday: string;
  address: string;
  picture: string;
  role: string;
  verification:string
  }

  export interface LoginModel {
    
  email: string;
  password: string;

  }

  export interface VerifyOrDeny{
    action: string
}