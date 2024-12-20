import { User } from "../../../../core/data/models/user.model";

export const TableColumns = [
  {
    name: 'ID',
    sortOrder: null,
    sortFn: (a: User, b: User) => a.id - b.id,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: User, b: User) => a.fname.localeCompare(b.fname),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'User name',
    sortOrder: null,
    sortFn: (a: User, b: User) => a.username.localeCompare(b.username),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: '',
  },
];