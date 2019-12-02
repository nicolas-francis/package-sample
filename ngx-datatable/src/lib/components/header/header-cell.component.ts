import {
  Component, Input, EventEmitter, Output, HostBinding,
  HostListener, ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import { SortType } from '../../types/sort.type';
import { SelectionType } from '../../types/selection.type';
import { TableColumn } from '../../types/table-column.type';
import { SortDirection } from '../../types/sort-direction.type';
import { nextSortDir } from '../../utils/sort';
import { MouseEvent } from '../../events';

@Component({
  selector: 'datatable-header-cell',
  template: `
    <div class="datatable-header-cell-template-wrap">
      <ng-template
        *ngIf="isTarget"
        [ngTemplateOutlet]="targetMarkerTemplate"
        [ngTemplateOutletContext]="targetMarkerContext">
      </ng-template>
      <label
        *ngIf="isCheckboxable"
        class="datatable-checkbox">
        <input
          type="checkbox"
          [checked]="allRowsSelected"
          (change)="select.emit(!allRowsSelected)"
        />
      </label>
      <span
        *ngIf="!column.headerTemplate"
        class="datatable-header-cell-wrapper">
        <span
          class="datatable-header-cell-label draggable"
          (click)="onSort()"
          [innerHTML]="name">
        </span>
      </span>
      <ng-template
        *ngIf="column.headerTemplate"
        [ngTemplateOutlet]="column.headerTemplate"
        [ngTemplateOutletContext]="cellContext">
      </ng-template>
      <span (click)="onSort()" [class]="sortClass"></span>
      <span *ngIf="isFilterable" (click)="onFilter($event)" [class]="filterClass">
        <i [class.filter-blue]="hasFilter()" class="fa fa-filter"></i>
      </span>      
    </div>
  `,
  host: {
    class: 'datatable-header-cell'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DataTableHeaderCellComponent {

  @Input() sortType: SortType;
  @Input() sortAscendingIcon: string;
  @Input() sortDescendingIcon: string;

  @Input() isTarget: boolean;
  @Input() targetMarkerTemplate: any;
  @Input() targetMarkerContext: any;

  _allRowsSelected: boolean;

  @Input() set allRowsSelected(value) {
    this._allRowsSelected = value;
    this.cellContext.allRowsSelected = value;
  }
  get allRowsSelected() {
    return this._allRowsSelected;
  }

  @Input() selectionType: SelectionType;

  @Input() set column(column: TableColumn) {
    this._column = column;
    this.cellContext.column = column;
    this.cd.markForCheck();
  }

  get column(): TableColumn {
    return this._column;
  }

  @HostBinding('style.height.px')
  @Input() headerHeight: number;

  @Input() set sorts(val: any[]) {
    this._sorts = val;
    this.sortDir = this.calcSortDir(val);
    this.cellContext.sortDir = this.sortDir;
    this.sortClass = this.calcSortClass(this.sortDir);
    
  }

  get sorts(): any[] {
    return this._sorts;
  }

  @Input() set filters(val: any[]) {
    this._filters = val;
    this.filterClass = this.calcFilterClass();
    this.cd.markForCheck();
  }

  @Output() sort: EventEmitter<any> = new EventEmitter();
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() filter = new EventEmitter<{ event: MouseEvent, content: any }>(false);
  @Output() columnContextmenu = new EventEmitter<{ event: MouseEvent, column: any }>(false);

  @HostBinding('class')
  get columnCssClasses(): any {
    let cls = 'datatable-header-cell';

    if (this.column.sortable) cls += ' sortable';
    if (this.column.filterable) cls += ' filterable';
    if (this.column.resizeable) cls += ' resizeable';
    if (this.column.headerClass) {
      if (typeof this.column.headerClass === 'string') {
        cls += ' ' + this.column.headerClass;
      } else if (typeof this.column.headerClass === 'function') {
        const res = this.column.headerClass({
          column: this.column
        });

        if (typeof res === 'string') {
          cls += res;
        } else if (typeof res === 'object') {
          const keys = Object.keys(res);
          for (const k of keys) {
            if (res[k] === true) cls += ` ${k}`;
          }
        }
      }
    }

    const sortDir = this.sortDir;
    if (sortDir) {
      cls += ` sort-active sort-${sortDir}`;
    }

    return cls;
  }

  @HostBinding('attr.title')
  get name(): string {
    // guaranteed to have a value by setColumnDefaults() in column-helper.ts
    return this.column.headerTemplate === undefined ? this.column.name : undefined;
  }

  @HostBinding('style.minWidth.px')
  get minWidth(): number {
    return this.column.minWidth;
  }

  @HostBinding('style.maxWidth.px')
  get maxWidth(): number {
    return this.column.maxWidth;
  }

  @HostBinding('style.width.px')
  get width(): number {
    return this.column.width;
  }

  get isFilterable(): boolean {
    return this.column.filterable;
  }

  get isCheckboxable(): boolean {
    return this.column.checkboxable &&
      this.column.headerCheckboxable &&
      this.selectionType === SelectionType.checkbox;
  }

  sortFn = this.onSort.bind(this);
  sortClass: string;
  sortDir: SortDirection;
  selectFn = this.select.emit.bind(this.select);
  filterFn = this.onFilter.bind(this);
  filterClass: string;

  cellContext: any = {
    column: this.column,
    sortDir: this.sortDir,
    sortFn: this.sortFn,
    filterFn: this.filterFn,
    allRowsSelected: this.allRowsSelected,
    selectFn: this.selectFn
  };

  private _column: TableColumn;
  private _sorts: any[];
  private _filters: any[];

  constructor(private cd: ChangeDetectorRef) { }

  @HostListener('contextmenu', ['$event'])
  onContextmenu($event: MouseEvent): void {
    this.columnContextmenu.emit({ event: $event, column: this.column });
  }

  calcSortDir(sorts: any[]): any {
    if (sorts && this.column) {
      const sort = sorts.find((s: any) => {
        return s.prop === this.column.prop;
      });

      if (sort) return sort.dir;
    }
  }

  onSort(): void {
    if (!this.column.sortable) return;

    const newValue = nextSortDir(this.sortType, this.sortDir);
    this.sort.emit({
      column: this.column,
      prevValue: this.sortDir,
      newValue
    });
  }

  calcSortClass(sortDir: SortDirection): string {
    if (sortDir === SortDirection.asc) {
      return `sort-btn sort-asc ${this.sortAscendingIcon}`;
    } else if (sortDir === SortDirection.desc) {
      return `sort-btn sort-desc ${this.sortDescendingIcon}`;
    } else {
      return `sort-btn`;
    }
  }

  onFilter(ev: MouseEvent): void {
    if (!this.column.filterable) return;
    this.filter.emit({
      event: ev,
      content: this.column
    });
  }

  calcFilterClass(): string {
    if (!this.column.filterable) return;
    return `filter-btn`;
  }

  hasFilter(): boolean {
    if (this._filters) {
      for (let i = 0; i < this._filters.length; i++) {
        if (this._filters[i].column === this.column.prop) {
          return true;
        }
      }
    }
    return false;
  }

}
