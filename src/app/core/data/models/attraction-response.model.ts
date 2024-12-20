import { Attraction } from './attraction.model';

export class AttractionsResponse {
  constructor(
    public data: Attraction[],
    public page: number,
    public per_page: number,
    public total: number,
    public total_pages: number
  ) {}
}
