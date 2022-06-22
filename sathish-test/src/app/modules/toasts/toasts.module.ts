import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';

@NgModule({
  declarations: [ToastComponent, ToasterComponent],
  imports: [CommonModule],
  exports: [ToastComponent, ToasterComponent],
})
export class ToastsModule {}
