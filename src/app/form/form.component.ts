import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  form: FormGroup;
  undoStack: any[] = [];
  redoStack: any[] = [];
  historyItems: any[] = [];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      age: [''],
      subscribed: [false],
      category: ['']
    });
  }

  ngOnInit(): void {
    this.initializeFormTracking();
  }

  private initializeFormTracking(): void {
    const initialFormState = this.deepCopy(this.form.value);
    this.undoStack.push(initialFormState);
    this.historyItems.push(initialFormState);

    this.form.valueChanges.subscribe(() => {
      const newState = this.deepCopy(this.form.value);
      this.undoStack.push(newState);
      this.historyItems.push(newState);
      this.redoStack = [];
    });
  }

  undo(): void {
    if (this.undoStack.length > 1) {
      const lastState = this.undoStack.pop();
      this.redoStack.push(this.deepCopy(this.form.value));
      this.historyItems.pop();
      this.form.setValue(lastState, { emitEvent: false });
    }
  }

  redo(): void {
    if (this.redoStack.length > 0) {
      const nextState = this.redoStack.pop();
      this.undoStack.push(this.deepCopy(this.form.value));
      this.historyItems.push(this.deepCopy(this.form.value));
      this.form.setValue(nextState, { emitEvent: false });
    }
  }

  restoreFromHistory(index: number): void {
    const selectedState = this.historyItems[index];
    this.form.setValue(selectedState, { emitEvent: false });
    this.undoStack = this.historyItems.slice(0, index + 1);
    this.redoStack = [];
  }

  reset(): void {
    this.form.reset();
    const resetState = this.deepCopy(this.form.value);
    this.undoStack = [resetState];
    this.redoStack = [];
    this.historyItems = [resetState];
  }

  private deepCopy<T>(value: T): T {
    return JSON.parse(JSON.stringify(value));
  }

  canUndo(): boolean {
    return this.undoStack.length > 1;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}
