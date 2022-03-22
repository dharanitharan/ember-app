// also exported from '@storybook/angular' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/angular/types-6-0';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { Observable, of } from 'rxjs';

import { WMTCommonModule } from '@wmt/common';
import { WMTUtilitiesModule } from '@wmt/utilities';

import {
  Attribute,
  ControlType,
  TextValueType,
  DynamicFormUIModel,
  BnySelectItemComponent,
  BnySelectComponent,
  BnyDatepickerComponent,
  BnyTypeaheadComponent,
  BnyDynamicFormGroupComponent,
  BnyDynamicFormControlComponent,
  BnyDynamicFormGroupService,
  BNYInfoIconComponent,
  BnySelectedComponent,
  BnySelectTemplateDirective,
  BNYSelectInputComponent,
  DateSyntaxValidator,
  BnySearchComponent,
  BnySearchDirective,
  BnySearchCloseDirective,
  AnimatedCheckboxComponent,
  BNYChipsInput
} from '../index';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { ExpandCollapseAnimation } from '@wmt/utilities';

// tslint:disable-next-line: no-var-requires
const intro = require('./markdown/intro.md');
// tslint:disable-next-line: no-var-requires
const entities = require('./markdown/entities.md');
// tslint:disable-next-line: no-var-requires
const table = require('./markdown/table.md');

export default {
  title: 'Forms/Dynamic Form Control',
  component: BnyDynamicFormGroupComponent,
  parameters: {
    notes: {
      Docs: intro + table + entities
    }
  },
  argTypes: {
    attributes: {
      table: {
        disable: true
      },
      control: {
        type: 'object'
      }
    },
    dynamicFormUIModel: {
      control: {
        type: 'object'
      }
    },
    form: {
      table: {
        disable: true
      },
      control: {
        type: 'object'
      }
    },
    formData: {
      table: {
        disable: true
      },
      control: {
        type: 'object'
      }
    },
    formFieldsChanged: {
      action: 'formFieldsChanged',
      table: {
        disable: true
      }
    },
    formFieldsGenerated: {
      action: 'formFieldsGenerated',
      table: {
        disable: true
      }
    },
    onReset: {
      action: 'onReset',
      table: {
        disable: true
      }
    },
    onResetClick: {
      action: 'onResetClick',
      table: {
        disable: true
      }
    },
    formControlChanged: {
      action: 'formControlChanged',
      table: {
        disable: true
      }
    },
  },
  excludeStories: [
    'StoryHelpers'
  ]
} as Meta;

const formData: any = {
  amt: null,
  amtInc: null,
  rstDesc1: 'yes',
  rstDesc2: 'no',
  toggle: {
    label: 'Percentage',
    value: 'P'
  }
};
const getDataCB: (key: any, value: any) => Observable<any> = (key, value) => getData(key, value);
const attributes: Attribute[] = [
  {
    desc: "Request Type",
    id: "GI-RQ-TYPE",
    order: 1,
    uiOptions: {
      controlType: ControlType.typeahead,
      textType: TextValueType.text,
      validations: {},
      validationMessage: {
        required: "Request Type is a mandatory field. Please select some value."
      },
      validationHint: {
        required: "Mandatory Hint"
      },
      typeaheadTriggererLen: 0
    },
    "typeaheadCB": getDataCB,
    mandatory: true,
    dataType: "",
    tooltip: "",
    placeholder: "Select a Type",
    info: "Request type",
    hint: ["Request type hint 1", "Request type hint 2"]
  },
  {
    id: "amt",
    order: 1,
    desc: "Amount",
    mandatory: true,
    dataType: "usd",
    uiOptions: {
      controlType: ControlType.txt,
      textType: TextValueType.number,
      validations: {
        min: 0,
        max: 120000
      },
      validationMessage: {
        required: "Amount is a mandatory field. Please enter some value.",
        min: "Amount should be more than 0",
        max: "Amount should be less than 120000"
      },
      validationHint: {
        required: "Mandatory Hint",
        range: "Valid range is $0 - $120,000 Hint",
        min: "Valid value is above $0 Hint",
        max: "Valid value is below $120,000 Hint"
      },
      allowDecimal: true,
      decimalPrecision: 0
    },
    placeholder: "Amount ($)",
    info: "Amount",
    hint: ["Amount hint 1", "Amount hint 2"]
  },
  {
    desc: "Text Field With Min Length",
    id: "textFieldWithMinLength",
    order: 1,
    uiOptions: {
      controlType: ControlType.txt,
      textType: TextValueType.text,
      validations: {
        minLength: 10
      },
      validationMessage: {},
      validationHint: {}
    },
    mandatory: true,
    dataType: "",
    tooltip: ""
  },
  {
    desc: "Text Field With Max Length",
    id: "textFieldWithMaxLength",
    order: 1,
    uiOptions: {
      controlType: ControlType.txt,
      textType: TextValueType.text,
      validations: {
        maxLength: 30
      },
      validationMessage: {},
      validationHint: {}
    },
    mandatory: true,
    dataType: "",
    tooltip: ""
  },
  {
    desc: "Text Field With Min And Max Length",
    id: "textFieldWithMinAndMaxLength",
    order: 1,
    uiOptions: {
      controlType: ControlType.txt,
      textType: TextValueType.text,
      validations: {
        minLength: 10,
        maxLength: 30
      },
      validationMessage: {},
      validationHint: {}
    },
    mandatory: true,
    dataType: "",
    tooltip: ""
  },
  {
    id: "amtInc",
    order: 1,
    desc: "Annual Increase",
    mandatory: true,
    dataType: "percent",
    uiOptions: {
      controlType: ControlType.txt,
      textType: TextValueType.nonNegativeNumber,
      validations: {
        min: null,
        max: 111
      },
      allowDecimal: true,
      decimalPrecision: 10
    },
    info: "Annual Increase",
    hint: ["Annual Increase hint 1", "Annual Increase hint 2"]
  },
  {
    id: "amtIncCurr",
    order: 1,
    desc: "Annual Increase Currency",
    mandatory: true,
    dataType: "number",
    uiOptions: {
      controlType: ControlType.label,
      textType: TextValueType.currency,
      validations: {
        min: 0,
        max: 100
      }
    },
    info: "Annual Increase Currency",
    hint: ["Annual Increase Currency hint 1", "Annual Increase Currency hint 2"]
  },
  {
    id: "rstDesc1",
    order: 2,
    desc: "Restricted Discretionary",
    mandatory: true,
    dataType: "text",
    uiOptions: {
      controlType: ControlType.radio,
      selectOptions: [
        {
          text: "Yes",
          value: "yes"
        },
        {
          text: "No",
          value: "no"
        }
      ],
      validationHint: {
        required: "Mandatory Hint"
      }
    },
    info: "Restricted Discretionary",
    hint: ["Restricted Discretionary hint 1", "Restricted Discretionary hint 2"]
  },
  {
    id: "toggle",
    order: 1,
    desc: "",
    mandatory: false,
    dataType: "",
    uiOptions: {
      controlType: ControlType.toggle,
      textType: TextValueType.text,
      toggleOptionLabels: {
        option1: { "label": "Percentage", "value": "P" },
        option2: { "label": "Dollar", "value": "D" }
      }
    }
  },
  {
    id: "rstDesc2",
    order: 2,
    desc: "Restricted Discretionary",
    mandatory: true,
    dataType: "text",
    uiOptions: {
      controlType: ControlType.ddl,
      selectOptions: [
        {
          text: "Yes",
          value: "yes"
        },
        {
          text: "No",
          value: "no"
        }
      ]
    },
    info: "Restricted Discretionary",
    hint: ["Restricted Discretionary hint 1", "Restricted Discretionary hint 2"],
    disabled: true
  },
  {
    id: "inf",
    order: 3,
    desc: "Inflation (Yes/No)",
    mandatory: true,
    dataType: "text",
    uiOptions: {
      default: "yes",
      controlType: ControlType.checkbox
    },
    disabled: false
  }
];
const getData = (key: any, value: any) => of(['Abcde', 'Bcde', 'Cdef', 'Defg']);
const StoryForm: FormGroup = new FormGroup({});
const dynamicFormUIModel: DynamicFormUIModel = {
  isRenderedAsRow: true,
  formData,
  showErrorTooltip: true,
  showReset: true
};

const Template: Story<BnyDynamicFormGroupComponent> = (args: BnyDynamicFormGroupComponent) => ({
  moduleMetadata: {
    animations: [
      ExpandCollapseAnimation
    ],
    providers: [
      BnyDynamicFormGroupService
    ],
    declarations: [
      BNYInfoIconComponent,
      BnySelectComponent,
      BnySelectItemComponent,
      BnySelectedComponent,
      BnySelectTemplateDirective,
      BNYSelectInputComponent,
      BnyDatepickerComponent,
      DateSyntaxValidator,
      BnySearchComponent,
      BnySearchDirective,
      BnySearchCloseDirective,
      AnimatedCheckboxComponent,
      BNYChipsInput,
      BnyDynamicFormGroupComponent,
      BnyDynamicFormControlComponent,
      BnyTypeaheadComponent
    ],
    imports: [
      BrowserAnimationsModule,
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      ScrollingModule,
      MatTabsModule,
      WMTCommonModule,
      WMTUtilitiesModule
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
  },
  props: args,
});

export const Typeahead = Template.bind({});
Typeahead.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[0]
    ]
  },
  form: StoryForm
};

export const Amount = Template.bind({});
Amount.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[1]
    ]
  },
  form: StoryForm
};

export const TextControls = Template.bind({});
TextControls.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[2],
      attributes[3],
      attributes[4],
      attributes[5],
    ]
  },
  form: StoryForm
}

export const TextWithMinLength = Template.bind({});
TextWithMinLength.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[2]
    ]
  },
  form: StoryForm
};

export const TextWithMaxLength = Template.bind({});
TextWithMaxLength.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[3]
    ]
  },
  form: StoryForm
};

export const TextWithMinMaxLength = Template.bind({});
TextWithMinMaxLength.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[4]
    ]
  },
  form: StoryForm
};

export const TextNonNegative = Template.bind({});
TextNonNegative.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[5]
    ]
  },
  form: StoryForm
};

export const Label = Template.bind({});
Label.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[6]
    ]
  },
  form: StoryForm
};

export const Radio = Template.bind({});
Radio.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[7]
    ]
  },
  form: StoryForm
};

export const Toggle = Template.bind({});
Toggle.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[8]
    ]
  },
  form: StoryForm
};

export const Dropdown = Template.bind({});
Dropdown.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[9]
    ]
  },
  form: StoryForm
};

export const Checkbox = Template.bind({});
Checkbox.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes: [
      attributes[10]
    ]
  },
  form: StoryForm
};

export const Playground = Template.bind({});
Playground.args = {
  dynamicFormUIModel: {
    ...dynamicFormUIModel,
    attributes
  },
  form: StoryForm
}
