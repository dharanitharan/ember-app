import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { isNullOrEmpty, generateGUID } from '@wmt/utilities';

import { Attribute, DynamicFormUIModel } from './user-control-config.entities';
import { generateValidatorsForAttribute } from './dynamic-form-group.utility';

@Injectable()
export class BnyDynamicFormGroupService {
  isFormControlsNullorEmpty = true;

  addControlsToForm(form: FormGroup, attributes: Array<Attribute>, formData: any, dynamicFormUIModel: DynamicFormUIModel) {
    const _attributes = dynamicFormUIModel && dynamicFormUIModel.attributes || attributes;
    const _formData = dynamicFormUIModel && dynamicFormUIModel.formData || formData;

    if (form && _attributes) {
      this.clearExistingControls(form);
      this.resetFormControlsNullorEmpty();

      _attributes.forEach((attribute: Attribute) => {
        //considering there can be boolean value for formData[attribute.id] we have used turnery operator
        let fcVal;
        // adding this condition to intiliaze toggle to option1 if form data is not provided.
        if (attribute.id == 'toggle' && !isNullOrEmpty(_formData) && !_formData[attribute.id]) {
          fcVal = attribute.uiOptions.toggleOptionLabels && attribute.uiOptions.toggleOptionLabels.option1;
        } else {
          fcVal = !isNullOrEmpty(_formData) && _formData[attribute.id] != null
            ? _formData[attribute.id] : (dynamicFormUIModel.allowDefault && attribute.uiOptions.default != null ? attribute.uiOptions.default : null);
        }


        form.addControl(attribute.id, new FormControl(fcVal));

        if (attribute.applyFormDisability) {
          form.controls[attribute.id].disable();
        }

        if (!isNullOrEmpty(fcVal) && this.isFormControlsNullorEmpty) {
          this.isFormControlsNullorEmpty = false;
        }

        form.controls[attribute.id].setValidators(generateValidatorsForAttribute(attribute));
      });

      if (dynamicFormUIModel.guidEnabled) {
        const guidAttribute = dynamicFormUIModel.guidAttribute || 'uniqueId';
        const guidVal = (_formData && _formData[guidAttribute]) || generateGUID();
        form.addControl(guidAttribute, new FormControl(guidVal));
      }
    }
  }

  checkFormControlsNullOrEmpty(e: { formGroup: FormGroup; event: any; controlId: string }) {
    if (!e || !e.formGroup) {
      return;
    }
    //if control that is changed has value, directly  set isFormControlsNullorEmpty = false; else loop and check
    if (!isNullOrEmpty(e.controlId) && e.formGroup.get(e.controlId) != null) {
      const fcVal = e.formGroup.get(e.controlId).value;
      if (!isNullOrEmpty(fcVal)) {
        this.isFormControlsNullorEmpty = false;
        return;
      }
    }

    this.resetFormControlsNullorEmpty();
    if (e.formGroup && e.formGroup.controls) {
      for (const fc of Object.values(e.formGroup.controls)) {
        const fcVal = fc && fc.value;
        if (!isNullOrEmpty(fcVal)) {
          this.isFormControlsNullorEmpty = false;
          break;
        }
      }
    }
  }

  resetFormControlsNullorEmpty() {
    this.isFormControlsNullorEmpty = true;
  }

  private clearExistingControls(form: FormGroup) {
    Object.keys(form.controls).forEach((key) => {
      form.removeControl(key);
    });
  }
}
