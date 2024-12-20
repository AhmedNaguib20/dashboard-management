import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PetsChartResponse } from '../../../../core/data/models/pets-chart-response.model';

Chart.register(...registerables);

@Component({
  selector: 'app-pet-chart',
  templateUrl: './pet-chart.component.html',
  styleUrls: ['./pet-chart.component.scss'],
  standalone: true,
})
export class PetChartComponent implements OnInit, AfterViewInit {
  @Input() chartData: PetsChartResponse;

  constructor() {}

  ngOnInit(): void {
    console.log(this.chartData);
  }

  ngAfterViewInit(): void {
    this.createLineChart();
  }

  createLineChart(): void {
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.chartData.categories,
        datasets: this.chartData.series.map((item) => ({
          label: item.name,
          data: item.data,
          fill: false,
          borderColor: ['#0CA945', '#FFBC33', '#335F86', '#FF7859', '#4ED17E'],
          tension: 0.1,
        })),
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true,
          },
        },
        scales: {
          x: {
            title: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
          y: {
            title: {
              display: false,
            },
            grid: {
              display: false,
            },
          },
        },
      },
    });
  }
}
