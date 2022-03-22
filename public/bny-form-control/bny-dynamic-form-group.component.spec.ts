import { createComponentFactory, Spectator } from "@ngneat/spectator";
import { BnyDynamicFormGroupComponent,  BnyDynamicFormControlComponent } from "@wmt/forms";
import { SimpleChanges } from "@angular/core";
import { FormGroup } from "@angular/forms";

describe('BnyDynamicFormGroupComponent', () => {
  let spectator: Spectator<BnyDynamicFormGroupComponent>;
  const createComponent = createComponentFactory({
    component: BnyDynamicFormGroupComponent
  });

  beforeEach(() => spectator = createComponent());
  it('should create', () => {
    expect(spectator.component).toBeDefined();
  });
  describe('isFormControlsNullorEmpty', () => {
    it('should return false when service.isFormControlsNullorEmpty is set to false', () => {
      // @ts-ignore
      spectator.component.service.isFormControlsNullorEmpty = false;
      const value = spectator.component.isFormControlsNullorEmpty;
      expect(value).toBeFalsy();
    });
    it('should return true when service.isFormControlsNullorEmpty is set to true', () => {
      // @ts-ignore
      spectator.component.service.isFormControlsNullorEmpty = true;
      const value = spectator.component.isFormControlsNullorEmpty;
      expect(value).toBeTruthy();
    });
  });
  describe('ngOnChanges', () => {
    let service;
    beforeEach(() => {
      // @ts-ignore
      service = spectator.component.service;
    });
    it('should not call service.addControlsToForm', () => {
      const addControlsToFormSpy = spyOn(service, "addControlsToForm");
      spectator.component.ngOnChanges({ } as SimpleChanges)
      expect(addControlsToFormSpy).not.toHaveBeenCalled();
    });
    it('should call service.addControlsToForm', () => {
      const addControlsToFormSpy = spyOn(service, "addControlsToForm");
      let changes = {} as SimpleChanges;
      changes['form'] = {
        currentValue: undefined, firstChange: false, previousValue: undefined, isFirstChange(): boolean {
          return false;
        }
      };
      spectator.component.ngOnChanges(changes)
      expect(addControlsToFormSpy).toHaveBeenCalled();
    });
    it('should not call formFieldsGenerated.emit', () => {
      const formFieldsGeneratedEmitSpy = spyOn(spectator.component.formFieldsGenerated, "emit");
      spectator.component.ngOnChanges({ } as SimpleChanges)
      expect(formFieldsGeneratedEmitSpy).not.toHaveBeenCalled();
    });
    it('should call formFieldsGenerated.emit', () => {
      const formFieldsGeneratedEmitSpy = spyOn(spectator.component.formFieldsGenerated, "emit");
      let changes = {} as SimpleChanges;
      changes['form'] = {
        currentValue: undefined, firstChange: false, previousValue: undefined, isFirstChange(): boolean {
          return false;
        }
      };
      spectator.component.ngOnChanges(changes)
      expect(formFieldsGeneratedEmitSpy).toHaveBeenCalled();
    });
  });
  describe('ngOnInit', () => {
    let service;
    beforeEach(() => {
      // @ts-ignore
      service = spectator.component.service;
    });
    it('should call service.addControlsToForm', () => {
      const addControlsToFormSpy = spyOn(service, "addControlsToForm");
      spectator.component.ngOnInit()
      expect(addControlsToFormSpy).toHaveBeenCalled();
    });

    it('should call formFieldsGenerated.emit', () => {
      const formFieldsGeneratedEmitSpy = spyOn(spectator.component.formFieldsGenerated, "emit");
      spectator.component.ngOnInit()
      expect(formFieldsGeneratedEmitSpy).toHaveBeenCalled();
    });
  });
  describe('updateAttribute', () => {
    let objectAssignSpy;
    beforeEach(() => {
      objectAssignSpy = spyOn(Object, "assign").and.callThrough();
    })
    it('should return early if attributes are null', () => {
      spectator.component.updateAttribute(null);
      expect(objectAssignSpy).not.toHaveBeenCalled();
    })
    it('should return early if uiModelAttributes are null', () => {
      spectator.component.updateAttribute({ id: 'mock' } as any);
      expect(objectAssignSpy).not.toHaveBeenCalled();
    })
    it('should call Object.assign and update the mapped attribute', () => {
      // @ts-ignore
      spectator.component.uiModelAttributes = {map: []};
      // @ts-ignore
      spectator.component.uiModelAttributes.map['mock'] = {stuff: ['a', 'b', 'c']};
      spectator.component.updateAttribute({ id: 'mock', stuff: ['d', 'e', 'f'] } as any);
      expect(objectAssignSpy).toHaveBeenCalled();
      expect(spectator.component.uiModelAttributes.map['mock'] ).toEqual({ id: 'mock', stuff: ['d', 'e', 'f'] } as any);
    })
  });
  describe('onFieldValueChanged', () => {
    it('should call formFieldsChanged.emit with provided form', () => {
      const formFieldsChangedSpy = spyOn(spectator.component.formFieldsChanged, 'emit');
      // @ts-ignore
      spectator.component.onFieldValueChanged('mockForm');
      // @ts-ignore
      expect(formFieldsChangedSpy).toHaveBeenCalledWith('mockForm');
    });
  });
  describe('onControlValueChanged', () => {
    it('should call formControlChanged.emit and service.checkFormControlsNullOrEmpty with provided form', () => {
      const formControlChangedSpy = spyOn(spectator.component.formControlChanged, 'emit');
      // @ts-ignore
      const checkFormControlsNullOrEmptySpy = spyOn(spectator.component.service, 'checkFormControlsNullOrEmpty');
      // @ts-ignore
      spectator.component.onControlValueChanged('mockForm');
      // @ts-ignore
      expect(formControlChangedSpy).toHaveBeenCalledWith('mockForm');
      // @ts-ignore
      expect(checkFormControlsNullOrEmptySpy).toHaveBeenCalledWith("mockForm");
    });
  });
  describe('resetFormFields', () => {
    it('', () => {
      const form = new FormGroup({})
      spectator.component.form = form;
      const onResetClickSpy = spyOn(spectator.component.onResetClick, 'emit');
      const onResetSpy = spyOn(spectator.component.onReset, 'emit');
      const formResetSpy = spyOn(spectator.component.form, 'reset').and.callThrough();
      // @ts-ignore
      const resetFormControlsNullorEmptySpy = spyOn(spectator.component.service, 'resetFormControlsNullorEmpty');
      spectator.component.resetFormFields();
      expect(onResetSpy).toHaveBeenCalled();
      expect(resetFormControlsNullorEmptySpy).toHaveBeenCalled();
      expect(onResetClickSpy).toHaveBeenCalledWith(form);
      // TODO get this to work
      // expect(formResetSpy).toHaveBeenCalledWith(form);
    })
  });
  describe('dynamicFormUIModel', () => {
    it('should return early if value is null', () => {
      const mock = { test: "test 1" };
      spectator.component.dynamicFormUIModel = mock as any;
      spectator.component.dynamicFormUIModel = null;
      expect(spectator.component.dynamicFormUIModel).toEqual(mock as any);
    });
    it('should update uiModelAttributes.map', () => {
      const mock = { id: 'mock', test: "test 1", attributes: [{id: 'a'}, {id: 'b'}, {id: 'c'}] };
      spectator.component.dynamicFormUIModel = mock as any;
      expect(spectator.component.uiModelAttributes.map['a']).toEqual({ id: 'a'} as any);
    });
    it('should set showReset to true', () => {
      const mock = { id: 'mock', test: "test 1", showReset: true, attributes: [{id: 'a'}, {id: 'b'}, {id: 'c'}] };
      spectator.component.dynamicFormUIModel = mock as any;
      expect(spectator.component.showReset).toBeTruthy();
    });
    it('should set showReset to false', () => {
      const mock = { id: 'mock', test: "test 1", showReset: false, attributes: [{id: 'a'}, {id: 'b'}, {id: 'c'}] };
      spectator.component.dynamicFormUIModel = mock as any;
      expect(spectator.component.showReset).toBeFalsy();
    });
    it('should set showErrorTooltip to true', () => {
      const mock = { id: 'mock', test: "test 1", showErrorTooltip: true, attributes: [{id: 'a'}, {id: 'b'}, {id: 'c'}] };
      spectator.component.dynamicFormUIModel = mock as any;
      expect(spectator.component.showErrorTooltip).toBeTruthy();
    });
    it('should set showErrorTooltip to false', () => {
      const mock = { id: 'mock', test: "test 1", showErrorTooltip: false, attributes: [{id: 'a'}, {id: 'b'}, {id: 'c'}] };
      spectator.component.dynamicFormUIModel = mock as any;
      expect(spectator.component.showErrorTooltip).toBeFalsy();
    });
  });
  describe('attributes', () => {
    it('should update uiModelAttributes.map', () => {
      const mock = [{id: 'a'}, {id: 'b'}, {id: 'c'}];
      spectator.component.attributes = mock as any;
      expect(spectator.component.uiModelAttributes.map['a']).toEqual({ id: 'a'} as any);
    });
    it('should update uiModelAttributes.map', () => {
      spectator.component.attributes = null;
      expect(spectator.component.uiModelAttributes.map).not.toBeEmpty()
    });
  });
});
