import { User } from './user.model';

export class UsersResponse {
  constructor(
    public data: User[],
    public page: number,
    public per_page: number,
    public total: number,
    public total_pages: number
  ) {}
}
