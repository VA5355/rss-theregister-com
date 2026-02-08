export class User {
  email: string | null = null;
  username: string | null = null;
  password: string | null = null;

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
