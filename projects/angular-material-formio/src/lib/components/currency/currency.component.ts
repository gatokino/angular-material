import { Component } from '@angular/core';
import { TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import { MaterialNumberComponent } from '../number/number.component';
import CurrencyComponent from 'formiojs/components/currency/Currency.js';
import isNull from 'lodash-es/isNull';

@Component({
  selector: 'mat-formio-currency',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialCurrencyComponent extends MaterialNumberComponent {
  public override inputType : string = 'text';

  override onChange() {
    const newValue = isNull(this.getValue()) ? '' : this.getValue();
    this.instance.updateValue(newValue, {modified: true});
  }
}
CurrencyComponent.MaterialComponent = MaterialCurrencyComponent;
export { CurrencyComponent };
