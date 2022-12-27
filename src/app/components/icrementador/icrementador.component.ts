import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-icrementador',
  templateUrl: './icrementador.component.html',
  styles: [
  ]
})
export class IcrementadorComponent implements OnInit {

  ngOnInit() {

    this.btnclass = `btn ${this.btnclass}`;

  }

  @Input('valor') progreso: number = 25;
  @Input() btnclass: string = 'btn-primary';

  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {

    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }

    if (this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }

    this.progreso = this.progreso + valor;
    this.valorSalida.emit(this.progreso);
    return this.progreso;

  }

  onChange(newValue: number) {

    if (newValue >= 100) {
      this.progreso = 100;
    } else if (newValue <= 0) {
      this.progreso = 0;
    }
    else {
      this.progreso = newValue;
    }

    this.valorSalida.emit(this.progreso);
  }

}
