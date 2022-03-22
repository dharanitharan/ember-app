## Attribute
<table>
    <thead>
        <tr>
          <th>Property</th>
          <th>Req.</th>
          <th>Description</th>
          <th>Type</th>
          <th>Reference</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>desc</td>
        <td class="req-yes">yes</td>
        <td class="desc1">Description of Form Element</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>id</td>
        <td class="req-yes">yes</td>
        <td class="desc1">Element Id</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>order</td>
        <td class="req-yes">yes</td>
        <td class="desc1">Order in which the elements are rendered</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>uiOptions</td>
        <td class="req-yes">yes</td>
        <td class="desc1">Control options</td>
        <td class="type">UIControl</td>
        <td>
        [goto UIControl](#uicontrol)
        </td>
      </tr>
      <tr>
        <td>mandatory</td>
        <td class="req-yes">yes</td>
        <td class="desc1">Whether the control was mandatory</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>dataType</td>
        <td class="req-yes">yes</td>
        <td class="desc1">particular kind of data item, as defined by the values it can take</td>
        <td class="type">String</td>
        <td>
        ```typescript
        /* possible options,
        select one... */
        [
          '',
          'number',
          'percent',
          'text',
          'usd',
        ]
        ```
        </td>
      </tr>
      <tr>
        <td>min</td>
        <td class="req-no">no</td>
        <td class="desc1">minimum number in range allowed</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>max</td>
        <td class="req-no">no</td>
        <td class="desc1">maximum number in range allowed</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>maxDate</td>
        <td class="req-no">no</td>
        <td class="desc1">maximum date in range allowed</td>
        <td class="type">Any</td>
        <td>-</td>
      </tr>
      <tr>
        <td>minDate</td>
        <td class="req-no">no</td>
        <td class="desc1">minimum date in range allowed</td>
        <td class="type">Any</td>
        <td>-</td>
      </tr>
      <tr>
        <td>tooltip</td>
        <td class="req-no">no</td>
        <td class="desc1">string used to specify extra information when the mouse pointer moves over an element</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>placeholder</td>
        <td class="req-no">no</td>
        <td class="desc1">a character, word, or string of characters that takes the place of final data temporarily</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>hint</td>
        <td class="req-no">no</td>
        <td class="desc1">array of additional text that accompanies controls in form</td>
        <td class="type">Array\<string\></td>
        <td>
        ```typescript
        [
          "hint 1",
          "hint 2"
        ];
        ```
        </td>
      </tr>
      <tr>
        <td>disabled</td>
        <td class="req-no">no</td>
        <td class="desc1">whether or not the control is enabled</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>hidden</td>
        <td class="req-no">no</td>
        <td class="desc1">whether or not the control is hidden</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>applyFormDisability</td>
        <td class="req-no">no</td>
        <td class="desc1">set form disability</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>applicableTo</td>
        <td class="req-no">no</td>
        <td class="desc1">relationship class that form applies to</td>
        <td class="type">Array\<string\></td>
        <td>
        ```typescript
        [
          'client',
          'partner',
          'institution'
        ];
        ```
        </td>
      </tr>
      <tr>
        <td>selectClass</td>
        <td class="req-no">no</td>
        <td class="desc1">css class that gets applied to select control</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>selectListClass</td>
        <td class="req-no">no</td>
        <td class="desc1">css class that gets applied to select list</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>labelKey</td>
        <td class="req-no">no</td>
        <td class="desc1">label used with typeahead control</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>isHighlightedOnMobile</td>
        <td class="req-no">no</td>
        <td class="desc1">Whether or not to highlight on mobile device</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>typeaheadCB</td>
        <td>no</td>
        <td class="desc1">callback to use with the typeahead control</td>
        <td class="type">Observable\<any\></td>
        <td>
        ```typescript
        (searchKey: string,
        searchValue?: any)
        ```
        </td>
      </tr>
    </tbody>
</table>

##UIControl
<table>
    <thead>
        <tr>
          <th>Property</th>
          <th>Req.</th>
          <th>Description</th>
          <th>Type</th>
          <th>Reference</th>
        </tr>
    </thead>
    <tbody>
      <tr>
        <td>controlType</td>
        <td class="req-yes">yes</td>
        <td class="desc2">Type of form control</td>
        <td class="type">ControlType</td>
        <td>
        ```typescript
        enum ControlType {
          label = 'label',
          ddl = 'ddl',
          txt = 'txt',
          radio = 'radio',
          checkbox = 'checkbox',
          date = 'date',
          typeahead = 'typeahead',
          toggle = 'toggle'
        };
        ```
        </td>
      </tr>
      <tr>
        <td>textType</td>
        <td class="req-no">no</td>
        <td class="desc2">Type of Textbox</td>
        <td class="type">TextValueType</td>
        <td>
        ```typescript
        enum TextValueType {
          text = 'text',
          number = 'number',
          nonNegativeNumber = 'nonNegativeNumber',
          currency = 'currency'
        };
        ```
        </td>
      </tr>
      <tr>
        <td>selectOptions</td>
        <td class="req-no">no</td>
        <td class="desc2">options to be used with select control</td>
        <td class="type">Array\<MultiSelectControlOption\></td>
        <td>
        [goto MultiSelectControlOption](#multiselectcontroloption)
        </td>
      </tr>
      <tr>
        <td>validations</td>
        <td class="req-no">no</td>
        <td class="desc2">form control validations</td>
        <td class="type">UIValidations</td>
        <td>[goto UIValidations](#uivalidations)</td>
      </tr>
      <tr>
        <td>className</td>
        <td class="req-no">no</td>
        <td class="desc2">class to be applied to form control</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>validationMessage</td>
        <td class="req-no">no</td>
        <td class="desc2">validationMessage configuration to set custom validation message</td>
        <td class="type">Object</td>
        <td>
        ```typescript
        {
          // To set custom validation message
          required?: string;
          min?: string;
          max?: string;
          range?: string;
          minLength?: string;
          maxLength?: string;
        }
        ```
        </td>
      </tr>
      <tr>
        <td>validationHint</td>
        <td class="req-no">no</td>
        <td class="desc2">validationHint configuration to set custom validation hint</td>
        <td class="type">Object</td>
        <td>
        ```typescript
        {
          // To set custom validation hint
          required?: string;
          min?: string;
          max?: string;
          range?: string;
          minLength?: string;
          maxLength?: string;
          lengthRange?: string;
        }
        ```
        </td>
      </tr>
      <tr>
        <td>allowDecimal</td>
        <td class="req-no">no</td>
        <td class="desc2">allow value to be a decimal</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>decimalPrecision</td>
        <td class="req-no">no</td>
        <td class="desc2">number of digits in the the number</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>default</td>
        <td class="req-no">no</td>
        <td class="desc2">default for attribute *** note: need to check dataType when setting ***</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>suppressNullValue</td>
        <td class="req-no">no</td>
        <td class="desc2">prevent null values from showing</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>typeaheadTriggererLen</td>
        <td class="req-no">no</td>
        <td class="desc2">text length before typeahead callback triggers</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>labelKey</td>
        <td class="req-no">no</td>
        <td class="desc2">label for typeahead option</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>valueKey</td>
        <td class="req-no">no</td>
        <td class="desc2">value for typeahead option</td>
        <td class="type">String</td>
        <td>-</td>
      </tr>
      <tr>
        <td>appendTo</td>
        <td class="req-no">no</td>
        <td class="desc2">typeahead element to append to</td>
        <td class="type">Any</td>
        <td>-</td>
      </tr>
      <tr>
        <td>virtualScroll</td>
        <td class="req-no">no</td>
        <td class="desc2">typeahead virtual scroll option</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>itemSize</td>
        <td class="req-no">no</td>
        <td class="desc2">typeahead virtual scroll option</td>
        <td class="type">Number</td>
        <td>-</td>
      </tr>
      <tr>
        <td>isCheckbox</td>
        <td class="req-no">no</td>
        <td class="desc2">select options are checkbox</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>autoSelect</td>
        <td class="req-no">no</td>
        <td class="desc2">for automatically selecting option if there is only one option</td>
        <td class="type">Boolean</td>
        <td>
        ```typescript
        true || false;
        ```
        </td>
      </tr>
      <tr>
        <td>toggleOptionLabels</td>
        <td class="req-no">no</td>
        <td class="desc2">labels for toggle options</td>
        <td class="type">String | ToggleOption</td>
        <td>[goto ToggleOption](#toggleoption)</td>
      </tr>
    </tbody>
</table>

##MultiSelectControlOption
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Req.</th>
      <th>Description</th>
      <th>Type</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>value</td>
      <td class="req-yes">yes</td>
      <td class="desc1">value to be used on the option</td>
      <td class="type">Any</td>
      <td>-</td>
    </tr>
    <tr>
      <td>text</td>
      <td class="req-yes">yes</td>
      <td class="desc1">string or number used as the text</td>
      <td class="type">String | Number</td>
      <td>-</td>
    </tr>
    <tr>
      <td>disabled</td>
      <td class="req-no">no</td>
      <td class="desc1">whether option is enabled or not</td>
      <td class="type">Boolean</td>
      <td>
      ```typescript
      true || false;
      ```
      </td>
    </tr>
  </tbody>
</table>

##UIValidations
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Req.</th>
      <th>Description</th>
      <th>Type</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>min</td>
      <td class="req-no">no</td>
      <td class="desc1">minimum number in number range</td>
      <td class="type">Number</td>
      <td>-</td>
    </tr>
    <tr>
      <td>max</td>
      <td class="req-no">no</td>
      <td class="desc1">maximum number in number range</td>
      <td class="type">Number</td>
      <td>-</td>
    </tr>
    <tr>
      <td>minLength</td>
      <td class="req-no">no</td>
      <td class="desc1">minimum length of string necessary to validate</td>
      <td class="type">Number</td>
      <td>-</td>
    </tr>
    <tr>
      <td>maxLength</td>
      <td class="req-no">no</td>
      <td class="desc1">maximum length of string necessary to validate</td>
      <td class="type">Number</td>
      <td>-</td>
    </tr>
    <tr>
      <td>endDateCF</td>
      <td class="req-no">no</td>
      <td class="desc1">use callback function to validate endDate</td>
      <td class="type">Boolean</td>
      <td>-</td>
    </tr>
  </tbody>
</table>

##ToggleOption
<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Req.</th>
      <th>Description</th>
      <th>Type</th>
      <th>Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>label</td>
      <td class="req-yes">yes</td>
      <td class="desc1">String used for toggle lable</td>
      <td class="type">String</td>
      <td>-</td>
    </tr>
    <tr>
      <td>value</td>
      <td class="req-yes">yes</td>
      <td class="desc1">String used for toggle value</td>
      <td class="type">String</td>
      <td>-</td>
    </tr>
  </tbody>
</table>
