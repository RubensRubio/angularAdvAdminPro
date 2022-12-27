import { Component, Input, SimpleChanges } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent {




  @Input() tituloGrafica: string = 'Titulo grafica';


  @Input('labels') doughnutChartLabels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input() data : number [] = [350, 450, 100];

  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [350, 450, 100] }
    ]
  };

  ngOnChanges(changes: SimpleChanges): void {

    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [{ data: this.data }]
    }

  }

}
