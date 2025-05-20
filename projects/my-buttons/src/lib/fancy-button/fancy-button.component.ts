import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-fancy-button',
  templateUrl: './fancy-button.component.html',
  styleUrls: ['./fancy-button.component.scss'],
})
export class FancyButtonComponent {
  // selected value in edit or when check or click
  @Input() noDataFoundclass: any; // the selected value in case of edit, -->
  @Input() filterPopUpWidthClass: string = 'dropdown'; // this is the default width of the search secton and scroll
  // options send it with 'dropdownSmallWidth' for smaller width
  @Input() all_selected_values: Array<{ [key: string]: any }> = new Array<{
    [key: string]: any;
  }>();
  // above is the whole values that will appear
  @Input() data: Array<any> = new Array<{ [key: string]: any }>(); /// the data that will appear in the listing
  @Input() topValue!: string; // the position of the field
  @Input() allSelectedIds: any; // the selected value in case of edit, -->
  // also in multiple when chosing a value and reset the search
  // --> or the selected when click, as object, as can be single of multipe
  @Input() isDataLoading: boolean = false; // the spinner for the loading data
  @Input() selectPlaceHolder!: string; // the select place holder text
  @Input() searchPlaceHolder!: string; // the search place holder text
  @Input() zIndex!: string; // if there is two select below each other, the top have more zIndex
  @Input() firstData!: string; // if tags show tags.id and tags.tagName, else -->
  // --> anything else show the names.englishNames
  @Input() secondData!: string; // the second data in each row
  @Input() disableConditionField!: string; // in case you want to disable the field depending on a certain record
  // or as below if you have array of inputs
  @Input() allDisabledIds: number[] = []; // in case of multiple if i want to disable certain ids
  // or another way to make it disable is to add the third paramenter
  // like first name and last name to add the disableField
  @Input() checkBoxParmeter!: string; // to show if it is single of mutliple, if single don't send it in the html,
  // --> if multiple send the columid for example
  @Input() className!: string; // the color and the BG of the input with Arrow field eigher normal(white) or grey
  @Input() error!: any; // if there is an error in the field
  @Output() onChange = new EventEmitter<any>();
  @Output() search = new EventEmitter<any>();
  @Output() listData = new EventEmitter<any>();
  @Output() onScroll = new EventEmitter<any>();
  @Output() onTouch = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  @HostListener('document:click', ['$event']) onDocumentClick(event: any) {
    this.showDropdown = false;
    this.filterForm.reset();
  }
  mainDivWidth: any; // the width of the main div, to show the dropdown
  showDropdown: boolean = false;
  filterForm = this.fb.group({
    searchField: [null],
  });
  public changeValue(value: any): void {
    if (!this.checkBoxParmeter) {
      // this parameter to show if multiple select of single,
      // if single close the pop up
      this.showDropdown = false;
    }
    this.onChange.emit(value);
  }
  onSearch(event: Event) {
    this.search.emit(event);
  }
  showHideDropDown() {
    this.mainDivWidth = document.getElementById('mainDiv')?.offsetWidth;

    const topValue = document.getElementById('dropdownBtn')?.clientTop;

    if (topValue) {
      this.topValue = topValue + 43 + 'px !important';
    }
    this.showDropdown = !this.showDropdown;
    this.onTouch.emit();
    this.filterForm.reset();
    this.listData.emit({ offset: 0, limit: 20, filter: '' });
  }
  scrollFn(event: any) {
    this.onScroll.emit(event);
  }
}
