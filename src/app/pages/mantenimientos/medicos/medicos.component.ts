import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Medico } from 'src/app/models/medico.models';

import { BusquedasService } from 'src/app/services/busquedas.service';
import { MedicoService } from 'src/app/services/medico.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public isLoading: boolean = true;
  private imgSubs!: Subscription;

  constructor(private medicoService: MedicoService,
    private busquedaService: BusquedasService,
    private modalImagenService: ModalImagenService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.rebindMedicos();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(delay(100))
      .subscribe(img => this.rebindMedicos());

  }

  rebindMedicos() {
    this.isLoading = true;
    this.medicoService.obtenerMedicos()
      .subscribe(medicos => {
        this.medicos = medicos;
        this.medicosTemp = medicos;
        this.isLoading = false;
      })
  }

  cambiarImagen(medico: Medico) {
    this.modalImagenService.abrirModal('medicos', medico._id!, medico.img);
  }

  async nuevoMedico() {

    const { value } = await Swal.fire<string>({
      text: 'Ingrese el nombre del nuevo hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital',
      showCancelButton: true,
    })

    if (value?.trim().length! > 0) {
      // this.hospitalService.crearHospital(value?.trim()!)
      //   .subscribe((resp: any) => {

      //     this.hospitales.push(resp.hospital)

      //     Swal.fire(
      //       'OK',
      //       `El hospital ${value} se creo correctamente`,
      //       'success'
      //     )
      //   })
    }

  }


  guardarHospital(medico: Medico) {
    this.medicoService.actualizarMedico(medico)
      .subscribe(resp => {

        this.rebindMedicos();

        Swal.fire(
          'Actualizado',
          `El medico ${medico.nombre} se actualizo correctamente.`,
          'success'
        )
      })
  }

  borrarMedico(medico: Medico) {


    Swal.fire({
      title: '¿Se encuentra seguro?',
      text: `Esta seguro de eliminar el medico ${medico.nombre}, esta acción no se puede reversar`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.medicoService.eliminarMedico(medico._id)
          .subscribe((resp: any) => {

            this.rebindMedicos();
            Swal.fire(
              resp.msg,
              `El medico ${medico.nombre} se elimino correctamente`,
              'success'
            )

          });

      }
    })
  }

  buscar(termino: string) {

    if (termino.length === 0) {

      return this.medicos = this.medicosTemp;
    }

    this.busquedaService.buscar('medicos', termino)
      .subscribe(resultados => {
        this.medicos = (resultados as Medico[])
      })
  }

}
