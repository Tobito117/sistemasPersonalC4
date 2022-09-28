import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'relojChecador';

  constructor(
    private _config: PrimeNGConfig,
  ) { }

  ngOnInit() {
    //Cambia las etiquetas de los nombres de meses y días a español
    this._config.setTranslation({
      "dayNames": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sábado"],
      "dayNamesShort": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sáb"],
      "dayNamesMin": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sá"],
      "monthNames": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
      "monthNamesShort": ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
    });
  }
}
