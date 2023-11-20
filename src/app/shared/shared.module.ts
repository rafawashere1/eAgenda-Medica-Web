import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardHoverDirective } from './directives/card-hover-directive';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    CardHoverDirective
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ],
  exports: [
    CardHoverDirective,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatButtonModule
  ]
})
export class SharedModule { }
