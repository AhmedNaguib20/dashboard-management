import { Attraction } from '../../../../core/data/models/attraction.model';

export const TableColumns = [
  {
    name: 'ID',
    sortOrder: null,
    sortFn: (a: Attraction, b: Attraction) => a.id - b.id,
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Name',
    sortOrder: null,
    sortFn: (a: Attraction, b: Attraction) => a.name.localeCompare(b.name),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: 'Details',
    sortOrder: null,
    sortFn: (a: Attraction, b: Attraction) => a.detail.localeCompare(b.detail),
    sortDirections: ['ascend', 'descend', null],
  },
  {
    name: '',
  },
];
