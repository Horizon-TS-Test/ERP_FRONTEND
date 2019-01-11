import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Table } from 'src/app/interfaces/table.interface';

@Component({
  selector: 'table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {
  @Input() tableData: Table;
  @Output() clickedRow: EventEmitter<string>;

  constructor() {
    this.clickedRow = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  /**
   * METODO PARA HABILITAR LA SECCION DE NUEVO REGISTRO:
   * @param clickedBtn
   */
  public onClickRow(event: any, index: number) {
    event.preventDefault();
    
    if (!this.tableData.rows[index].isSelectedRow) {
      this.clickedRow.emit(this.tableData.rows[index].id);
      for (let i = 0; i < this.tableData.rows.length; i++) {
        if (i == index) {
          this.tableData.rows[i].isSelectedRow = true;
        }
        else {
          this.tableData.rows[i].isSelectedRow = false;
        }
      }
    }
  }

}
