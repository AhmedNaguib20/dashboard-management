export class User {
  constructor(
    public id: number = 0,
    public fname: string = '',
    public lname: string = '',
    public password: string = '',
    public username: string = '',
    public email: string = '',
    public avatar: string = ''
  ) {}

  toJson() {
    return JSON.stringify(this);
  }
}
