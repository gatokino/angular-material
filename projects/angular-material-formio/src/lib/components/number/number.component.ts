import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2 } from '@angular/core';
import { MaterialTextfieldComponent, TEXTFIELD_TEMPLATE } from '../textfield/textfield.component';
import NumberComponent from 'formiojs/components/number/Number.js';
import isNull from 'lodash-es/isNull';

@Component({
  selector: 'mat-formio-number',
  template: TEXTFIELD_TEMPLATE
})
export class MaterialNumberComponent extends MaterialTextfieldComponent implements AfterViewInit {
  public override inputType = 'text';

  constructor(public override element: ElementRef, public override ref: ChangeDetectorRef, private renderer: Renderer2) {
    super(element, ref);
  }

  override ngAfterViewInit() {
    super.ngAfterViewInit();
    if (this.instance) {
      const { instance } = this;

      if (this.input) {
        this.renderer.listen(this.input.nativeElement, 'blur', () => {
          let value = instance.parseValue(this.control.value);
          value = instance.formatValue(value);
          value = instance.getValueAsString(value);
          this.control.setValue(value);
        });
      }
    }
  }

  override getValue() {
    let value = this.control.value;
    if (value && this.instance) {
      value = value.replace(this.instance.prefix, '');
      return isNull(value) && value !== '' ? this.instance.parseNumber(value) : value;
    }
    return value;
  }

  override setValue(value: any) {
    if (this.instance) {
      const { instance } = this;
      value = instance.formatValue(instance.parseValue(value));
    }
    else {
      value = value.toString();
    }

    return super.setValue(value);
  }

  override onChange() {
    super.onChange(true);
  }
}
NumberComponent.MaterialComponent = MaterialNumberComponent;
export { NumberComponent };
