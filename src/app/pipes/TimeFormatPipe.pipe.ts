import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat'
})
export class TimeFormatPipe implements PipeTransform {
  transform(value: string): string {
    const [hours, minutes, seconds] = value.split(':');
    return `${hours}h ${minutes}m ${seconds}s`;
  }
}