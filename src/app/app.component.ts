import { Component, OnInit } from '@angular/core';
import { NodeService } from './node.service';
import { SortFilterPipe } from './sort-filter.pipe';
import { Router } from '@angular/router';


const P_HEADER = 'header';
const P_CHECKED = 'checked';
const P_SELECT = 'select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  txtFilter: any;
  nodes;
  sorkKey: string;
  isAsc: boolean;
  clickToSelect = true;
  checkbox = true;
  keyColumn: string;
  group;
  selectedGroup;

  constructor(private nodeService: NodeService, private sortFilter: SortFilterPipe, private router: Router,){
    
  }
  ngOnInit() {
    this.getNodesList();
    this.group = [
      {id: 1, Name: 'One'},
      {id: 2, Name: 'Two'},
      {id: 3, Name: 'Three'},
      {id: 4, Name: 'Four'}
    ]
    this.selectedGroup = 4;
  }

  onGroupSelected(val:any){
    //api field
    this.customSelect(val);
  }

  customSelect(val:any){
    alert(val)
  }

  getNodesList() {
    this.nodeService.getNodes().subscribe(res => {
      this.nodes = res;
    });
  }

  startVm(row, event) {
    if (row.vm_state == 4) {
      row.vm_state = 1;
     alert('Start Successfully')
    }
  }
  stopVm(row, event) {
    if (row.vm_state == 3) {
      row.vm_state = 4;
     alert('Stop Successfully')
    }
  }
  
  public nodeState(state) {
    if (state == 0) {
      return 'Starting Up'
    } else if (state == 1) {
      return 'Starting Up'
    } else if (state == 2) {
      return 'Error'
    } else if (state == 3) {
      return 'Running'
    } else if (state == 4) {
      return 'Error'
    } else if (state == 5) {
      return 'Error'
    } else if (state == 6) {
      return 'Terminated'
    } else if (state == 8) {
      return 'Error'
    } else if (state == 9) {
      return 'Powered Off'
    } else if (state == 10) {
      return 'Saving'
    } else if (state == 11) {
      return 'Error'
    }
  }

  public addClass(txt) {
    if (txt == 0) {
      return "text-secondary";
    } else if (txt == 1) {
      return "text-secondary";
    } else if (txt == 2) {
      return "text-danger";
    } else if (txt == 3) {
      return "text-primary";
    } else if (txt == 4) {
      return "text-danger";
    } else if (txt == 5) {
      return "text-danger";
    } else if (txt == 6) {
      return "text-warning";
    } else if (txt == 8) {
      return "text-danger";
    } else if (txt == 9) {
      return "text-success";
    } else if (txt == 10) {
      return "text-primary";
    } else if (txt == 11) {
      return "text-Error";
    }
  }
  // filter key
  sort(key: string) {
    this.isAsc = !this.isAsc;
    this.sorkKey = key;
    this.nodes = this.sortFilter.transform(this.nodes, this.sorkKey, this.isAsc);
  }

  // selecte
  onClick(e, row) {
    if (this.clickToSelect) {
      this.onChange(e, row);
    }
  }

  onChange(event, row) {
    if (!row.header) {
      row.checked = !row.checked;
      if (row.checked) {
        // unSelect other selected ones
        if (this.nodes) {
          for (const tableRow of this.nodes) {
            if (tableRow.checked && tableRow[this.key] !== row[this.key]) {
              tableRow.checked = false;
              break;
            }
          }
        }
        this.router.navigate(['/vcn/list', row.id]);
      }
      if (!row.checked) {
        this.router.navigate(['/vcn/list']);
      }
    }
  }

  /**
   * Get all the columns that need to be displayed.
   * "header", "checked" and columns in hiddenColumns will be excluded.
   */
  get columns(): string[] {
    var tableSource = this.nodes;
    console.log(tableSource);
    if (tableSource && tableSource.length > 0) {
      const tableRow = tableSource.find(row => {
        return !row.hasOwnProperty('header')
      });
      const keys = Object.keys(tableRow).filter(key => (![P_HEADER, P_CHECKED].includes(key)));
      if (this.checkbox) {
        return [P_SELECT].concat(keys);
      } else {
        return keys;
      }
    }
  }

  get key(): string {
    return this.keyColumn ? this.keyColumn : this.checkbox ? this.columns[1] : this.columns[0];
  }


  // Bind/Get selected value / set default in select list

  

}
