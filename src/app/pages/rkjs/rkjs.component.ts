import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rkjs',
  templateUrl: './rkjs.component.html',
  styles: [
  ]
})
export class RkjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // this.retornaObservable().pipe(
    //   retry(2)
    // ).subscribe({
    //   next: valor => console.log('Subs:', valor),
    //   error: err => console.warn('Error:', err),
    //   complete: () => console.info('Obs termino')
    // });
    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);



  }

  ngOnDestroy(): void {

    this.intervalSubs.unsubscribe();

  }

  retornaIntervalo(): Observable<number> {
    return interval(100)
      .pipe(
        // take(10),
        map(valor => valor + 1),
        filter(valor => (valor % 2 === 0 ? true : false)),
      );
  }


  retornaObservable(): Observable<number> {
    let i = -1;

    return new Observable<number>(observer => {

      const interval = setInterval(() => {

        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(interval);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Ocurrio un error')
        }

      }, 1000)

    });

  }



}
