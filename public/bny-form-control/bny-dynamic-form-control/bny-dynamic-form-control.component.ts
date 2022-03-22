import {
    Component,
    Input,
    ViewEncapsulation,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { isNullOrEmpty, generateGUID } from '@wmt/utilities';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { Attribute } from '../user-control-config.entities';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'form-control',
    templateUrl: './dynamic-form-control.component.html',
    styleUrls: ['./dynamic-form-control.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: [
        trigger('simpleFadeAnimation', [
            // route 'enter' transition
            transition(':enter', [
                // styles at start of transition
                style({ opacity: 0 }),

                // animation and styles at end of transition
                animate('.2s', style({ opacity: 1 }))
            ]),
            transition(':leave', [
                // styles at start of transition
                style({ opacity: 1 }),

                // animation and styles at end of transition
                animate('.5s', style({ opacity: 0 }))
            ])
        ])
    ]
})
export class BnyDynamicFormControlComponent implements OnInit, OnDestroy {
    @Input() attribute: Attribute;
    @Input() form: FormGroup;
    @Input() focusControl: string;
    @Input() disabled: boolean = false;
    @Input() viewOnly: boolean = false;
    @Input() showErrorTooltip: boolean = false;
    @Input() isMobile: boolean = false;
    @Input() showInfoAlways: boolean = false;

    @Output('fieldsChanged') fieldsChanged: EventEmitter<FormGroup> = new EventEmitter();
    @Output() clearInput: EventEmitter<FormGroup> = new EventEmitter();
    @Output('controlChanged') controlChanged = new EventEmitter<{ formGroup: FormGroup; event: any; controlId: string }>();
    @Output('selectChanged') selectChanged: EventEmitter<{ event: any; controlId: string }> = new EventEmitter();
    @Output() optionsListChanged: EventEmitter<{ id: string; list: Array<any> }> = new EventEmitter();

    public toogleGuid: string = generateGUID();
    private unSubscriber: Subject<any> = new Subject();

    isFocus: boolean = false;
    toggleConfig: { option1: string, option2: string, isChecked: boolean } | any;
    get isValid() {
        return this.form.controls[this.attribute.id].valid;
    }

    customValidationMessages: string[] = [];

    constructor() { }
    ngOnInit(): void {
        this.form.controls[this.attribute.id].statusChanges.pipe(takeUntil(this.unSubscriber)).subscribe((c) => {
            this.customValidationMessages = [];
            if (!this.isValid) {
                for (let validation in this.attribute.uiOptions.validationMessage) {
                    if (['required', 'min', 'max'].indexOf(validation) > -1) {
                        continue;
                    }
                    if (this.form.get(this.attribute.id).hasError(validation)) {
                        this.customValidationMessages.push(this.attribute.uiOptions.validationMessage[validation]);
                    }
                }
            }
        });
        if (this.attribute.uiOptions.controlType == 'toggle') {
            this.toggleConfig = {
                option1: this.attribute.uiOptions.toggleOptionLabels.option1,
                option2: this.attribute.uiOptions.toggleOptionLabels.option2,
                isChecked: this.form.controls[this.attribute.id].value
            };
        }
    }

    ngOnDestroy() {
        this.unSubscriber.next();
        this.unSubscriber.complete();
    }

    onFocusField($event) {
        setTimeout(() => {
            $event.target.select();
        }, 0);
    }

    public clearValue(formGroup: FormGroup, formControlName: string) {
        if (formGroup == null || isNullOrEmpty(formControlName) || formGroup.controls == null || formGroup.controls[formControlName] == null) {
            return;
        }
        const ctrl = formGroup.controls[formControlName];
        ctrl.markAsTouched();
        ctrl.markAsDirty();
        ctrl.setValue(null);
        this.clearInput.emit(this.form);
    }

    public onValueChanged(e: any, id: string): void {
        if ((this.attribute.uiOptions.controlType === 'toggle' || this.attribute.uiOptions.controlType === 'checkbox') && this.form && this.form.controls && this.form.controls[id]) {
            if (this.toggleConfig && this.attribute.uiOptions.controlType === 'toggle') {
                this.toggleConfig.isChecked = e.srcElement.checked;
            }
            this.form.controls[id].setValue(e.srcElement.checked);
        }

        this.fieldsChanged.emit(this.form);
        this.controlChanged.emit({ formGroup: this.form, event: e, controlId: id });
    }

    public onSelectionChange(evt: Event, controlId: string): void {
        this.selectChanged.emit({ event: evt, controlId: controlId });
        this.controlChanged.emit({ formGroup: this.form, event: evt, controlId });
    }

    typeaheadOptChange(ev: any, id: string) {
        this.optionsListChanged.emit({ id: id, list: ev });
    }

    getToggleOptionLabel(toggleOption): string {
        if (toggleOption && toggleOption.label) {
            return toggleOption.label;
        }
        return toggleOption;
    }

    // private transformValue(value:string) {
    //     if(isNullOrEmpty(value)){
    //         value;
    //     }

    //     return value.toString().replace('$','').replace(/,/g,'');
    // }
}
