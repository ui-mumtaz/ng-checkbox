import { Pipe, PipeTransform } from '@angular/core';
import { NodeService } from './node.service';

@Pipe({
  name: 'searchListFilter'
})
export class SearchListFilterPipe implements PipeTransform {
  config: any;
  constructor(private nodeService: NodeService){
    this.nodeService.defaultCount.subscribe(x=>{
      this.config = {
        totalItems: x
      };
    })
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    //if (!searchText) return items;
    if(!searchText) {
      this.nodeService.defaultCount.next(items.length);
      return items;
    }

    searchText = searchText.toLowerCase();

    let x = items.filter(it => it.vm_name.toString().includes(searchText.toLowerCase()));
    this.nodeService.defaultCount.next(x.length);
    return x;
  }
}

