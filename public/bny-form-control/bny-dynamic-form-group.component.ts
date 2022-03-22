import {
  Component,
  Input,
  Output,
  OnInit,
  ViewEncapsulation,
  OnChanges,
  SimpleChanges,
  EventEmitter, ElementRef, ViewChild, ChangeDetectorRef
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { cloneDeep } from 'lodash';
import { deepCopy, isNullOrEmpty, ExpandCollapseAnimation, isObjectEmpty, detectViewChanges } from '@wmt/utilities';

import { BnyDynamicFormGroupService } from './dynamic-form-group.service';
import { Attribute, DynamicFormUIModel } from './user-control-config.entities';

@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form-group.component.html',
  styleUrls: ['./dynamic-form-group.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [BnyDynamicFormGroupService],
  animations: [ExpandCollapseAnimation]
})
export class BnyDynamicFormGroupComponent implements OnInit, OnChanges {
  _form: FormGroup = new FormGroup({});
  isRenderedAsRow = true;
  isMobile = false;
  showReset = false;
  showErrorTooltip = false;
  isLoading: boolean = false;
  private _dynamicFormUIModel: DynamicFormUIModel;
  private _attributes: Array<Attribute> = [];
  uiModelAttributes: { map: { [key: string]: Attribute }, list: Array<Attribute> } = { map: {}, list: [] };

  @Input() set dynamicFormUIModel(value: DynamicFormUIModel) {
    if (!value) {
      return;
    }
    this._dynamicFormUIModel = deepCopy(value);
    if (this._dynamicFormUIModel.attributes) {
      this.uiModelAttributes = { map: {}, list: [] };
      this._dynamicFormUIModel.attributes.forEach(attr => {
        this.uiModelAttributes.map[attr.id] = attr;
        this.uiModelAttributes.list.push(attr);
      })
    }

    this.isRenderedAsRow = this._dynamicFormUIModel.isRenderedAsRow;
    if (this._dynamicFormUIModel.isMobile != null) {
      this.isMobile = this._dynamicFormUIModel.isMobile;
    }
    if (this._dynamicFormUIModel.showReset != null) {
      this.showReset = this._dynamicFormUIModel.showReset;
    }
    if (this._dynamicFormUIModel.showErrorTooltip != null) {
      this.showErrorTooltip = this._dynamicFormUIModel.showErrorTooltip;
    }
  }

  get dynamicFormUIModel() {
    return this._dynamicFormUIModel;
  }

  @Input() set form(value) {
    this._form = value;
  }
  get form() {
    return this._form;
  }

  @Input() set attributes(values: Array<Attribute>) {
    this._attributes = cloneDeep(values);
    if (this._attributes) {
      this.uiModelAttributes = { map: {}, list: [] };
      this._attributes.forEach(attr => {
        this.uiModelAttributes.map[attr.id] = attr;
        this.uiModelAttributes.list.push(attr);
      })
    }
  }

  get attributes() {
    return this._attributes;
  }

  @Input() formData: any;

  @ViewChild('dynamicFGTpl', { static: true }) dynamicFGTpl: ElementRef;

  @Output('formFieldsChanged') formFieldsChanged: EventEmitter<FormGroup> = new EventEmitter();
  @Output('formFieldsGenerated') formFieldsGenerated: EventEmitter<FormGroup> = new EventEmitter();
  @Output('formFieldsReInitialized') formFieldsReInitialized: EventEmitter<FormGroup> = new EventEmitter();
  @Output('onReset') onReset: EventEmitter<FormGroup> = new EventEmitter();
  @Output('onResetClick') onResetClick: EventEmitter<FormGroup> = new EventEmitter();
  @Output('formControlChanged') formControlChanged = new EventEmitter<{ formGroup: FormGroup; event: any; controlId: string }>();

  get isFormControlsNullorEmpty() {
    return this.service.isFormControlsNullorEmpty;
  }

  constructor(private service: BnyDynamicFormGroupService, private changeDetectionSvc: ChangeDetectorRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['form'] || changes['dynamicFormUIModel'] || changes['attributes'] || changes['formData']) {
      this.isLoading = true;
      detectViewChanges(this.changeDetectionSvc);
      this.service.addControlsToForm(this.form, this.attributes, this.formData, this.dynamicFormUIModel);
      this.isLoading = false;
      this.formFieldsReInitialized.emit(this.form);
    }
    if (changes['form']) {
      this.formFieldsGenerated.emit(this.form);
    }
  }

  ngOnInit() {
    this.service.addControlsToForm(this.form, this.attributes, this.formData, this.dynamicFormUIModel);
    this.formFieldsGenerated.emit(this.form);
  }

  updateAttribute(attribute: Attribute) {
    if (!attribute || isNullOrEmpty(attribute.id) || !this.uiModelAttributes || !this.uiModelAttributes.map) {
      return;
    }
    if (!isObjectEmpty(this.uiModelAttributes.map[attribute.id])) {
      Object.assign(this.uiModelAttributes.map[attribute.id], (attribute));
    }
  }

  public onFieldValueChanged(form: FormGroup): void {
    this.formFieldsChanged.emit(form);
  }

  public onControlValueChanged(e: { formGroup: FormGroup; event: any; controlId: string }): void {
    this.service.checkFormControlsNullOrEmpty(e);
    this.formControlChanged.emit(e);
  }

  public resetFormFields() {
    this.onResetClick.emit(this.form);
    this.form.reset();
    this.service.resetFormControlsNullorEmpty();
    this.onReset.emit(this.form);
  }
}
