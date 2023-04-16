import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableViewComponent } from './table-view/table-view.component';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, MatIconModule,FontAwesomeModule],
  exports: [TableViewComponent, MatIconModule]
})
export class SharedModule {}
