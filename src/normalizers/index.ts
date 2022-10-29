export abstract class Normalizer<Before, After> {
  private actions: (before: Before) => After;

  constructor(actions: (before: Before) => After) {
    this.actions = actions;
  }

  public normalize = (before: Before): After => this.actions(before);
}
