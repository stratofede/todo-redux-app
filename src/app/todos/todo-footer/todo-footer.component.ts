import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as filterActions from '../filtro/filtro.actions';
import * as todoActions from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filterActions.filtrosValidos = 'todos';
  filtros: filterActions.filtrosValidos[] = ['todos', 'completados', 'pendientes'];

  pendientes: number = 0;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {

    // this.store.select('filtro').subscribe(filtro => this.filtroActual = filtro )
    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })
  }

  cambiarFiltro(filtro: filterActions.filtrosValidos) {
    console.log(filtro);
    this.store.dispatch( filterActions.setFiltro({filtro}));
  }

  limpiarCompletados() {
    this.store.dispatch( todoActions.limpiarCompletados());
  }

}
