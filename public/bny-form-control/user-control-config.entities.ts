import { Observable } from 'rxjs';

export enum ControlType {
  label = 'label',
  ddl = 'ddl',
  txt = 'txt',
  radio = 'radio',
  checkbox = 'checkbox',
  date = 'date',
  typeahead = 'typeahead',
  toggle = 'toggle',
  toggleOneSwitch = "toggleOneSwitch"
}
export interface Attribute {
  desc: string;
  id: string;
  order: number;
  uiOptions: UIControl;
  mandatory: boolean;
  dataType: string;
  min?: number;
  max?: number;
  maxDate?: any;
  minDate?: any;
  tooltip?: string;
  placeholder?: string;
  info?: string;
  hint?: Array<string>;
  disabled?: boolean;
  hidden?: boolean;
  applyFormDisability?: boolean;
  applicableTo?: Array<string>;
  selectClass?: string;
  selectListClass?: string;
  labelKey?: string;
  showLabel?: string;
  isHighlightedOnMobile?: boolean;
  typeaheadCB?: (searchKey: string, searchValue?: any) => Observable<any>;
}

export interface UIControl {
  controlType: ControlType;
  textType?: TextValueType;
  selectOptions?: Array<MultiSelectControlOption>;
  validations?: UIValidations;
  className?: string;
  validationMessage?: {
    // To set custom validation message
    required?: string;
    min?: string;
    max?: string;
    range?: string;
    minLength?: string;
    maxLength?: string;
  };
  validationHint?: {
    // To set custom validation hints
    required?: string;
    min?: string;
    max?: string;
    range?: string;
    minLength?: string;
    maxLength?: string;
    lengthRange?: string;
  };
  allowDecimal?: boolean;
  decimalPrecision?: number;
  default?: any; // while setting a default for an attribute we need to check it's type of dataType
  suppressNullValue?: boolean;
  typeaheadTriggererLen?: number;
  labelKey?: string; // For typeahead labelKey
  valueKey?: string; // For typeahead valueKey
  appendTo?: any; // For typeahead appendto
  virtualScroll?: boolean; // For virtual scroll
  itemSize?: number; // For virtual scroll
  isCheckBox?: boolean; // For multi select
  autoSelect?: boolean; //For auto selecting if only one option available
  toggleOptionLabels?: {
    option1: string | ToggleOption;
    option2: string | ToggleOption;
  };
}
export interface ToggleOption {
  label: string;
  value: string | boolean;
}
export interface UIValidations {
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  endDateCF?: boolean;
}

export interface MultiSelectControlOption {
  value: any;
  text: string | number;
  disabled?: boolean;
}

export enum TextValueType {
  text = 'text',
  number = 'number',
  nonNegativeNumber = 'nonNegativeNumber',
  currency = 'currency'
}

export interface DynamicFormUIModel {
  isRenderedAsRow: boolean;
  attributes?: Attribute[];
  formData?: any;
  showErrorTooltip?: boolean;
  isMobile?: boolean;
  showReset?: boolean;
  guidEnabled?: boolean;
  allowDefault?: boolean;
  guidAttribute?: string;
}
