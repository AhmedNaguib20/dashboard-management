
export class PetsChartResponse {
  constructor(
    public categories: string[],
    public series: [{
      name: string;
      data: number[];
    }],
  ) {}
}

export class PetsResponse {
  constructor(
    public animal: string,
    public date: string,
    public price: string,
  ) {}
}
