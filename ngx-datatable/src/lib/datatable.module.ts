import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilterHiddenPipe } from './components/pipe/filter-hidden.pipe';

import { DatatableComponent } from './components/datatable.component';
import { DataTableColumnDirective } from './components/columns/column.directive';
import { DataTableHeaderComponent } from './components/header/header.component';
import { DataTableBodyComponent } from './components/body/body.component';
import { DataTableFooterComponent } from './components/footer/footer.component';
import { DataTableHeaderCellComponent } from './components/header/header-cell.component';
import { DataTablePagerComponent } from './components/footer/pager.component';
import { DataTableBodyRowComponent } from './components/body/body-row.component';
import { DataTableRowWrapperComponent } from './components/body/body-row-wrapper.component';
import { ProgressBarComponent } from './components/body/progress-bar.component';
import { DataTableBodyCellComponent } from './components/body/body-cell.component';
import { DatatableRowDetailDirective } from './components/row-detail/row-detail.directive';
import { DatatableGroupHeaderDirective } from './components/body/body-group-header.directive';
import { ScrollerComponent } from './components/body/scroller.component';
import { DataTableSelectionComponent } from './components/body/selection.component';
import { DataTableColumnHeaderDirective } from './components/columns/column-header.directive';
import { DataTableColumnCellDirective } from './components/columns/column-cell.directive';
import { DataTableColumnCellTreeToggle } from './components/columns/tree.directive';
import { DatatableRowDetailTemplateDirective } from './components/row-detail/row-detail-template.directive';
import { DataTableFooterTemplateDirective } from './components/footer/footer-template.directive';
import { DatatableFooterDirective } from './components/footer/footer.directive';
import { DatatableGroupHeaderTemplateDirective } from './components/body/body-group-header-template.directive';
import { DataTableSummaryRowComponent } from './components/body/summary/summary-row.component';

import { VisibilityDirective } from './directives/visibility.directive';
import { LongPressDirective } from './directives/long-press.directive';
import { ResizeableDirective } from './directives/resizeable.directive';
import { OrderableDirective } from './directives/orderable.directive';
import { DraggableDirective } from './directives/draggable.directive';

import { ScrollbarHelper } from './services/scrollbar-helper.service';
import { DimensionsHelper } from './services/dimensions-helper.service';
import { ColumnChangesService } from './services/column-changes.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ScrollbarHelper,
    DimensionsHelper,
    ColumnChangesService
  ],
  declarations: [
    DataTableFooterTemplateDirective,
    VisibilityDirective,
    DraggableDirective,
    ResizeableDirective,
    OrderableDirective,
    LongPressDirective,
    ScrollerComponent,
    DatatableComponent,
    DataTableColumnDirective,
    DataTableHeaderComponent,
    DataTableHeaderCellComponent,
    DataTableBodyComponent,
    DataTableFooterComponent,
    DataTablePagerComponent,
    ProgressBarComponent,
    DataTableBodyRowComponent,
    DataTableRowWrapperComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableBodyCellComponent,
    DataTableSelectionComponent,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DatatableFooterDirective,
    DatatableGroupHeaderTemplateDirective,
    DataTableSummaryRowComponent,
    FilterHiddenPipe
  ],
  exports: [
    DatatableComponent,
    DatatableRowDetailDirective,
    DatatableGroupHeaderDirective,
    DatatableRowDetailTemplateDirective,
    DataTableColumnDirective,
    DataTableColumnHeaderDirective,
    DataTableColumnCellDirective,
    DataTableColumnCellTreeToggle,
    DataTableFooterTemplateDirective,
    DatatableFooterDirective,
    DataTablePagerComponent,
    DatatableGroupHeaderTemplateDirective,
    FilterHiddenPipe
  ]
})
export class NgxDatatableModule {

  /**
   * Configure global configuration via INgxDatatableConfig
   * @param configuration
   */
  static forRoot(configuration: INgxDatatableConfig): ModuleWithProviders {
    return {
      ngModule: NgxDatatableModule,
      providers: [
        {provide: 'configuration', useValue: configuration },
      ]
    };
  }
}

/**
 * Interface definition for INgxDatatableConfig global configuration
 */
export interface INgxDatatableConfig {
  messages: {
    emptyMessage: string, // Message to show when array is presented, but contains no values
    totalMessage: string, // Footer total message
    selectedMessage: string // Footer selected message
  };
}
