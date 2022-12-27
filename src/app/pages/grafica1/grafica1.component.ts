import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  public labelsVentas: string[] = ['Ventas 1', 'Ventas 2', 'Ventas 3'];
  public dataVentas :  number[] = [10, 70, 25] ;

}
