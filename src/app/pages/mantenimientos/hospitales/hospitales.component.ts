import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Hospital } from 'src/app/models/hospital.model';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public isLoading: boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {

    this.rebindHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.rebindHospitales());

  }

  rebindHospitales() {

    this.isLoading = true;

    this.hospitalService.obtenerHospitales()
      .subscribe(hospitales => {
        this.isLoading = false;
        this.hospitales = hospitales;
        this.hospitalesTemp = hospitales;
      })

  }

  guardarHospital(hospital: Hospital) {
    this.hospitalService.actualizarHospital(hospital._id, hospital.nombre)
      .subscribe(resp => {

        this.rebindHospitales();

        Swal.fire(
          'Actualizado',
          `El hospital ${hospital.nombre} se actualizo correctamente.`,
          'success'
        )
      })
  }

  borrarHospital(hospital: Hospital) {


    Swal.fire({
      title: '¿Se encuentra seguro?',
      text: `Esta seguro de eliminar el hospital ${hospital.nombre}, esta acción no se puede reversar`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.hospitalService.eliminarHospital(hospital._id)
          .subscribe((resp: any) => {

            this.rebindHospitales();
            Swal.fire(
              resp.msg,
              `El hospital ${hospital.nombre} se elimino correctamente`,
              'success'
            )

          });

      }
    })
  }

  async nuevoHospital() {

    const { value } = await Swal.fire<string>({
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value?.trim().length! > 0) {
      this.hospitalService.crearHospital(value?.trim()!)
        .subscribe((resp: any) => {

          this.hospitales.push(resp.hospital)

          Swal.fire(
            'OK',
            `El hospital ${value} se creo correctamente`,
            'success'
          )
        })
    }

  }

  cambiarImagen(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id!, hospital.img);
  }

  buscar(termino: string) {

    if (termino.length === 0) {

      return this.hospitales = this.hospitalesTemp;
    }

    this.busquedaService.buscar('hospitales', termino)
      .subscribe(resultados => {
        this.hospitales = (resultados as Hospital[])
      })
  }


}
