import Action from "./Action"

export default class ActionManager {
  redoStack: Array<Action> = [];
  undoStack: Array<Action> = [];
  execute(action: Action) {
    action.do();
    this.undoStack.push(action);
    this.redoStack = [];
  }
  undo() {
    if (this.undoStack.length === 0) {
      return;
    }
    const action = this.undoStack.pop();
    action.undo();
    this.redoStack.push(action);
  }
  redo() {
    if (this.redoStack.length === 0) {
      return;
    }
    const action = this.redoStack.pop();
    action.do();
    this.undoStack.push(action);
  }
}
