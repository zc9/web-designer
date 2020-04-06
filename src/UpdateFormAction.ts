import Action from "./Action"
import Component from "./Component"

export default class UpdateFormAction implements Action {
  oldFormData: any = null;
  newFormData: any = null;
  component: Component = null;
  constructor(component: Component) {
    this.component = component;
  }
  setOldFormData(formData) {
    this.oldFormData = JSON.parse(JSON.stringify(formData));
  }
  setNewFormData(formData) {
    this.newFormData = formData;
  }
  do() {
    if (this.component && this.newFormData) {
      this.component.formData = this.newFormData;
      this.component.doUpdate(this.newFormData);
      this.component.initPorpPanel();
    }
  }

  undo() {
    if (this.component && this.oldFormData) {
      this.component.formData = this.oldFormData;
      this.component.doUpdate(this.oldFormData);
      this.component.initPorpPanel();
    }
  }

}
