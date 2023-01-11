import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';

import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.models';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup;
  public hospitales: Hospital[] = [];
  public hospitalSeleccionado!: Hospital;
  public medicoSeleccionado!: Medico;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private medicoService: MedicoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({ id }) => {
      this.obtenerMedico(id);
    });


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales.find(x => x._id === hospitalId)!;
      });

  }

  obtenerMedico(id: string) {

    if (id === "nuevo") {
      return;
    }

    this.medicoService.obtenerMedicoById(id)
      .pipe(
        delay(100)
      )
      .subscribe(medico => {

        if (!medico) {
          return this.router.navigateByUrl(`/dashboard/medicos`)
        }

        const { nombre, hospital } = medico;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital: hospital?._id });
      });

  }

  cargarHospitales() {

    this.hospitalService.obtenerHospitales()
      .subscribe((resp: Hospital[]) => {
        this.hospitales = resp;
      })

  }

  guardarMedico() {

    if (this.medicoSeleccionado) {

      //TODO: Actualizar

      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }

      this.medicoService.actualizarMedico(data)
        .subscribe(resp => {
          Swal.fire(
            'Ok',
            `El médico ${data.nombre} se actualizo correctamente.`,
            'success'
          );
        })
    }
    else {

      //TODO: Insertar

      this.medicoService.crearMedico(this.medicoForm.value)
        .subscribe((resp: any) => {
          Swal.fire(
            'Ok',
            `Médico guardado correctamente.`,
            'success'
          );
          this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
        });
    }
  }

}
