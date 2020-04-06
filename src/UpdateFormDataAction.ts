import Action from "./Action"
import Component from "./Component"

export default class UpdateFormDataAction implements Action {
  oldFormData: any = null;
  newFormData: any = null;
  component: Component = null;
  constructor(component: Component) {
    this.component = component;
  }
  setOldFormData() {
    this.oldFormData = JSON.parse(JSON.stringify(this.component.formData));
  }
  setNewFormData() {
    this.oldFormData = JSON.parse(JSON.stringify(this.component.formData));
  }
  do() {
    if (this.component && this.newFormData) {
      this.component.formData = this.newFormData;
      this.component.update(this.newFormData);
    }
  }

  undo() {
    if (this.component && this.oldFormData) {
      this.component.formData = this.oldFormData;
      this.component.update(this.oldFormData);
    }
  }

}
