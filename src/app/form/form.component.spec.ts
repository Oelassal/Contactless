import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ReactiveFormsModule} from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [FormComponent],
      providers: [
        { provide: MatSnackBar, useValue: { open: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      name: '',
      email: '',
      age: '',
      subscribed: false,
      category: ''
    });
  });

  it('should track form value changes', () => {
    component.form.controls['name'].setValue('John Doe');
    expect(component.undoStack.length).toBe(2);
    expect(component.historyItems.length).toBe(2);
    expect(component.form.value.name).toBe('John Doe');
  });

  it('should undo the last change', () => {
    component.form.controls['name'].setValue('John Doe');
    component.undo();
    expect(component.form.value.name).toBe('');
    expect(snackBar.open).toHaveBeenCalledWith('Undo successful!', 'Close', { duration: 3000 });
  });

  it('should redo the last undone change', () => {
    component.form.controls['name'].setValue('John Doe');
    component.undo(); // Undo
    component.redo(); // Redo
    expect(component.form.value.name).toBe('John Doe');
    expect(snackBar.open).toHaveBeenCalledWith('Redo successful!', 'Close', { duration: 3000 });
  });

  it('should reset the form', () => {
    component.form.controls['name'].setValue('John Doe');
    component.reset();
    expect(component.form.value).toEqual({
      name: '',
      email: '',
      age: '',
      subscribed: false,
      category: ''
    });
    expect(snackBar.open).toHaveBeenCalledWith('Form reset!', 'Close', { duration: 3000 });
  });

  it('should restore form state from history', () => {
    component.form.controls['name'].setValue('John Doe');
    component.form.controls['email'].setValue('john@example.com');
    component.restoreFromHistory(0); // Assume the history index exists
    expect(component.form.value.name).toBe('John Doe');
    expect(component.form.value.email).toBe('john@example.com');
  });

  it('should return true for canUndo if undo stack length > 1', () => {
    expect(component.canUndo()).toBe(true);
  });

  it('should return false for canRedo if redo stack is empty', () => {
    expect(component.canRedo()).toBe(false);
  });
});
