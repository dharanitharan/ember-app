# BNY Dynamic Form

```html
<dynamic-form
  [dynamicFormUIModel]="dynamicFormUIModel"
  [form]="form"
  (formFieldsChanged)="formFieldsChanged($event)"
  (formFieldsGenerated)="formFieldsGenerated($event)"
  (onReset)="onReset($event)"
  (onResetClick)="onResetClick($event)"
  (formControlChanged)="formControlChanged($event)"
></dynamic-form>
```
