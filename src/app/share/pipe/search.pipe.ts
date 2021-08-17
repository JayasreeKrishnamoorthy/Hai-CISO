import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(value?: any, args?: any): any {
    if (args) {
      args = args.toLowerCase();
      if (value[0]?.name) {
        return value.filter((item: any) => JSON.stringify(item?.name).toLowerCase().includes(args));
      } else {
        return value.filter((item: any) => item.indexOf(args) !== -1);
      }
    } else {
      return value;
    }
  }

}
