import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortFilter'
})
export class SortFilterPipe implements PipeTransform {
  key: string;

  transform(items: any, key: string, asc: boolean) {
    this.key = key;
    if (items) {
      if (asc) {
        //debugger
        return items.sort((item1: any, item2: any) => {
          if(this.key === 'ram' || this.key === 'price') {
            item1[this.key] = parseInt(item1[this.key]);
            item2[this.key] = parseInt(item2[this.key]);
          }
         
          if (!item2[this.key])
            return -1
          else if (!item1[this.key])
            return 1
          else if (item1[this.key] > item2[this.key])
            return 1
          else if (item1[this.key] === item2[this.key])
            return 0
          else
            return -1
        })
      }
      else {
        return items.sort((item1: any, item2: any) => {
          if (!item2[this.key])
            return 1
          else if (!item1[this.key])
            return -1
          else if (item1[this.key] < item2[this.key])
            return 1
          else if (item1[this.key] === item2[this.key])
            return 0
          else
            return -1
        })
      }

      if(this.key==='ram'){
        return items.sort((item1: any, item2: any) => item1[this.key] > item2[this.key]);
      }
    }

  }
}
// export class SortFilterPipe implements PipeTransform {

//   transform(value: any, args?: any): any {
//     return null;
//   }

// }
