import { AfterViewInit, Component, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { MaterialComponent } from './MaterialComponent';

@Component({
  selector: 'mat-formio-nested',
  template: '<ng-template #components></ng-template>'
})
export class MaterialNestedComponent extends MaterialComponent implements AfterViewInit {
  public viewContainers?: ViewContainerRef[];
  @ViewChildren('components', { read: ViewContainerRef }) components?: QueryList<ViewContainerRef>;
  override setInstance(instance: any) {
    instance.viewContainer = () => {
      return this.viewContainers ? this.viewContainers[0] : null;
    };
    super.setInstance(instance);
  }


  override renderComponents() {
    if (this.instance.renderComponents) {
      this.instance.renderComponents();
    }
  }

  render() {
    if (this.components)
      this.viewContainers = this.components.toArray();
    this.renderComponents();
    this.ref.detectChanges();
  }

  override ngAfterViewInit() {
    if (this.components)
      this.components.changes.subscribe(() => this.render());
    this.render();
  }
}
