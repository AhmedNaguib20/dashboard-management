export class Attraction {
  constructor(
    public id: number = 0,
    public name: string = '',
    public latitude: string = '',
    public longitude: string = '',
    public detail: string = '',
    public coverimage: string = '',
  ) {}

  toJson() {
    return JSON.stringify(this);
  }
}
