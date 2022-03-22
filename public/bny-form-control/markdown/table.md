<style>
  table {
    width: 1024px;
  }

  .desc1 {
    font-size: 12px;
    width: 250px;
  }

  .desc2 {
    font-size: 12px;
    width: 400px;
  }

  .type {
    font-size: 12px;
  }

  .req-no {
    font-size: 12px;
  }

  .req-yes {
    font-size: 12px;
    color: red;
    font-weight: bold;
  }
</style>

<table>
  <thead>
    <tr>
        <th>Input</th>
        <th>Req.</th>
        <th>Description</th>
        <th>Type</th>
        <th>Item Reference</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>dynamicFormUIModel</td>
      <td class="req-yes">yes</td>
      <td class="desc1">Main form JSON</td>
      <td class="type">Object</td>
      <td>
      ```json
      {
        isRenderedAsRow: Boolean,
        attributes: Array<Attribute>
        formData: Object,
        showErrorTooltip: Boolean,
        showReset: Boolean
      }
      ```
      </td>
    </tr>
    <tr>
      <td>form</td>
      <td class="req-yes">yes</td>
      <td class="desc1">FormGroup instance</td>
      <td class="type">FormGroup</td>
      <td>
      ```typescript
        new FormGroup({});
      ```
      </td>
    </tr>
    <tr>
      <td>attributes</td>
      <td class="req-no">no</td>
      <td class="desc1">Array of form elements that will feed into the component</td>
      <td class="type">Array\<Attributes\></td>
      <td>
      [goto Attribute](#attribute)
      </td>
    </tr>
    <tr>
      <td>showReset</td>
      <td class="req-no">no</td>
      <td class="desc1">Whether or not to show reset button</td>
      <td class="type">boolean</td>
      <td>
      ```typescript
      true || false;
      ```
      </td>
    </tr>
    <tr>
      <td>showErrorTooltip</td>
      <td class="req-no">no</td>
      <td class="desc1">Whether or not to show tooltip</td>
      <td class="type">boolean</td>
      <td>
      ```typescript
      true || false;
      ```
      </td>
    </tr>
  </tbody>
</table>
