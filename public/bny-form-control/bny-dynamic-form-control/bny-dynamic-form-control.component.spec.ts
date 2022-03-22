import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { Attribute, BnyDynamicFormControlComponent, ControlType } from "@wmt/forms";
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { fakeAsync, TestBed, tick } from "@angular/core/testing";
import { BehaviorSubject } from "rxjs";

describe('BnyDynamicFormControlComponent', () => {
  let spectator: Spectator<BnyDynamicFormControlComponent>;
  let mockControl: FormControl;
  const createComponent = createComponentFactory({
    component: BnyDynamicFormControlComponent,
    providers: [FormBuilder]

  });

  beforeEach(() => {
    let formBuilder = TestBed.get(FormBuilder) as FormBuilder;
    mockControl = new FormControl(
      {
        value: ["mock"],
        disabled: true,
        id: 'mockId'
      },
      Validators.required
    );
    spectator = createComponent({
      props: {
        toggleConfig:{
          option1: 'option mock 1',
          option2: 'option mock 2',
          isChecked: true
        },
        form: formBuilder.group({
          mock: mockControl
        }),
        attribute: { id: 'mock' , uiOptions: { controlType: ControlType.checkbox } } as any as Attribute
      }
    })
  });
  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
  describe('ngOnInit', () => {
    beforeEach(() => {
      // @ts-ignore
      mockControl["statusChanges"] = new BehaviorSubject(null);
      // @ts-ignore
      mockControl["statusChanges"].emit = () =>{};
    })
    it('should call pipe on the mockControl statusChanges', () => {
      const pipeSpy = spyOn(mockControl.statusChanges, 'pipe').and.callThrough();
      spectator.component.ngOnInit();
      expect(pipeSpy).toHaveBeenCalled();
    });
    it('should call subscribe on the mockControl statusChange', () => {
      const subscribeSpy = spyOn(mockControl.statusChanges, 'subscribe').and.callThrough();
      spectator.component.ngOnInit();
      expect(subscribeSpy).toHaveBeenCalled();
    });
    it('should set customValidationMessages to empty array', (done) => {
      spectator.component.customValidationMessages = ['a', 'b', 'c']
      spectator.component.ngOnInit();
      mockControl.statusChanges.subscribe(() => {
        expect(spectator.component.customValidationMessages).toHaveLength(0);
        done();
      });
      // @ts-ignore
      mockControl["statusChanges"].next({a: 'b'});

    });
    it('should skip validation check if isValid', (done) => {
      const formGetSpy = spyOn(spectator.component.form, 'get').and.callThrough();
      spectator.component.customValidationMessages = ['a', 'b', 'c']
      spectator.component.ngOnInit();
      // @ts-ignore
      mockControl["statusChanges"].next({a: 'b'});
      mockControl.statusChanges.subscribe(() => {
        expect(formGetSpy).not.toHaveBeenCalled();
        done();
      });
    });
    it('should skip validation check if not isValid', (done) => {
      const formGetSpy = spyOn(spectator.component.form, 'get').and.callThrough();
      spectator.component.customValidationMessages = ['a', 'b', 'c']
      spectator.component.ngOnInit();
      mockControl.setErrors({invalid: true});
      mockControl.markAsDirty();
      spectator.detectChanges();
      // @ts-ignore
      mockControl["statusChanges"].next({a: 'b'});
      mockControl.statusChanges.subscribe(() => {
        expect(formGetSpy).toHaveBeenCalled();
        done();
      });
    });
    it('should check all validationMessages in the uiOptions of attribute', (done) => {
      // @ts-ignore
      spectator.component.attribute.uiOptions.validationMessage = {invalid: 'this is invalid', required: '', fake: 'test'};
      spectator.component.ngOnInit();
      mockControl.setErrors({invalid: 'this is invalid'});
      mockControl.markAsDirty();
      spectator.detectChanges();
      // @ts-ignore
      mockControl["statusChanges"].next({a: 'b'});
      mockControl.statusChanges.subscribe(() => {
        expect(spectator.component.customValidationMessages).toHaveLength(1);
        done();
      });
    });
    it('should set toggleConfig', () => {
      spectator.component.attribute.uiOptions.controlType = ControlType.toggle;
      spectator.component.attribute.uiOptions.toggleOptionLabels = {
        option1: 'asdfasdf',
        option2: 'pioupoiu'
      };
      spectator.component.ngOnInit();
      expect(spectator.component.toggleConfig).toBeDefined();
    });
  });
  describe('ngOnDestroy', () => {});
  describe('onFocusField', () => {
    it('should call select on the event.target', fakeAsync(() => {
      const event = {
        target: {
          select: jasmine.createSpy('select')
        }
      };
      spectator.component.onFocusField(event);
      tick(1);
      expect(event.target.select).toHaveBeenCalled();
    }));
  });
  describe('clearValue', () => {
    it('should return early when formGroup is null', () => {
      const clearInputSpy = spyOn(spectator.component.clearInput, 'emit');
      spectator.component.clearValue(null, '');
      expect(clearInputSpy).not.toHaveBeenCalled();
    });
    it('should return early when formControlName isNullOrEmpty', () => {
      const clearInputSpy = spyOn(spectator.component.clearInput, 'emit');
      spectator.component.clearValue(spectator.component.form, '');
      expect(clearInputSpy).not.toHaveBeenCalled();
    });
    it('should return early when formControlName is not a control', () => {
      const clearInputSpy = spyOn(spectator.component.clearInput, 'emit');
      spectator.component.clearValue(spectator.component.form, 'blah');
      expect(clearInputSpy).not.toHaveBeenCalled();
    });
    it('should return early when formControlName is not a control', () => {
      const clearInputSpy = spyOn(spectator.component.clearInput, 'emit');
      const markAsTouchedSpy = spyOn(mockControl, 'markAsTouched');
      const markAsDirtySpy = spyOn(mockControl, 'markAsDirty');
      const setValueSpy = spyOn(mockControl, 'setValue');
      spectator.component.clearValue(spectator.component.form, 'mock');
      expect(markAsTouchedSpy).toHaveBeenCalled();
      expect(markAsDirtySpy).toHaveBeenCalled();
      expect(setValueSpy).toHaveBeenCalledWith(null);
      expect(clearInputSpy).toHaveBeenCalled();
    });
  });
  describe('onValueChanged', () => {
    beforeEach(() => {
      spectator.component.attribute.uiOptions.toggleOptionLabels = {
        option1: 'asdfasdf',
        option2: 'pioupoiu'
      };
    })
    it('should call fieldsChanged.emit and controlChanged.emit', () => {
      const fieldsChangedSpy = spyOn(spectator.component.fieldsChanged, 'emit');
      const controlChangedSpy = spyOn(spectator.component.controlChanged, 'emit');
      const event = {a:'mockEvent'};
      const mockId = 'mockId';
      spectator.component.onValueChanged(event, mockId);
      expect(fieldsChangedSpy).toHaveBeenCalledWith(spectator.component.form);
      expect(controlChangedSpy).toHaveBeenCalledWith({ formGroup: spectator.component.form, event: event, controlId: mockId });
    });
    it('should call fieldsChanged.emit and controlChanged.emit', () => {
      const event = {a:'mockEvent', srcElement: {} as HTMLInputElement};
      const mockId = 'toggle';
      spectator.component.form.controls[mockId] = mockControl;
      spectator.component.onValueChanged(event, mockId);
      expect(spectator.component.toggleConfig.isChecked).toBeFalsy();
    });
    it('should call fieldsChanged.emit and controlChanged.emit', () => {
      const event = {a:'mockEvent', srcElement: {checked: true} as HTMLInputElement};
      const mockId = 'toggle';
      spectator.component.form.controls[mockId] = mockControl;
      spectator.component.onValueChanged(event, mockId);
      expect(spectator.component.toggleConfig.isChecked).toBeTruthy();
    });
  });
  describe('onSelectionChange', () => {
    it('should call selectChanged.emit', () => {
      const selectChangedSpy = spyOn(spectator.component.selectChanged, "emit");
      // @ts-ignore
      spectator.component.onSelectionChange('mock1', 'mock2');
      expect(selectChangedSpy).toHaveBeenCalledWith({event: 'mock1', 'controlId': 'mock2'})
    });});
  describe('typeaheadOptChange', () => {
    it('should call optionListChanged.emit', () => {
      const optionListChangedSpy = spyOn(spectator.component.optionsListChanged, "emit");
      spectator.component.typeaheadOptChange('mock1', 'mock2');
      // @ts-ignore
      expect(optionListChangedSpy).toHaveBeenCalledWith({id: 'mock2', 'list': 'mock1'})
    });
  });
  describe('getToggleOptionLabel', () => {
    it('should return the value of option.label', () => {
      const option = {label: 'mock'}
      const results = spectator.component.getToggleOptionLabel(option);
      expect(results).toEqual(option.label);
    });
    it('should return the option', () => {
      const option = "test"
      const results = spectator.component.getToggleOptionLabel(option);
      expect(results).toEqual(option);
    });
  });
});
