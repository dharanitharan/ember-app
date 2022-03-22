import { ValidatorFn, Validators } from '@angular/forms';
import { Attribute } from './user-control-config.entities';

// TODO: Move this function to forms-utility.ts in Navigator Utils
export function generateValidatorsForAttribute(attribute: Attribute): Array<ValidatorFn> {
  const validators: Array<ValidatorFn> = [];

  if (!attribute) {
    return validators;
  }

  if (attribute.mandatory === true) {
    validators.push(Validators.required);
  }
  if (attribute.uiOptions && attribute.uiOptions.validations) {
    if (attribute.uiOptions.validations.min) {
      validators.push(Validators.min(attribute.uiOptions.validations.min));
    }
    if (attribute.uiOptions.validations.max) {
      validators.push(Validators.max(attribute.uiOptions.validations.max));
    }
    if (attribute.uiOptions.validations.minLength) {
      validators.push(Validators.minLength(attribute.uiOptions.validations.minLength));
    }
    if (attribute.uiOptions.validations.maxLength) {
      validators.push(Validators.maxLength(attribute.uiOptions.validations.maxLength));
    }
  }

  return validators;
}
