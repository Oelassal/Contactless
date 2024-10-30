# ContactlessDemo
This Angular project manages a reactive form created for Contactless.io with features for undoing, redoing, and resetting the form state. It provides user feedback through toast notifications for actions performed as well as history to track and manage user actions taken on this form.
![image](https://github.com/user-attachments/assets/e60a6972-93b5-4f23-a9bb-f99370e0b9be)

## Features

- **Reactive Form**: Utilizes Angular Reactive Forms for data management.
- **Undo/Redo Functionality**: Easily revert or redo changes made to the form.
- **History Tracking**: Keeps a record of form states for restoration.
- **Reset Functionality**: Resets the form to its initial state.
- **Toast Notifications**: Displays messages to the user upon action completion.



## Form Component Logic
a breakdown of the key methods within the FormComponent class:

Constructor

Initializes the form and sets up the snack bar for user notifications.
ngOnInit()

Lifecycle hook that calls the method to initialize form tracking when the component is loaded.
initializeFormTracking()

Tracks the initial state of the form and listens for changes to update the undo and history stacks.
undo()

Reverts the form to the last saved state in the undo stack and displays a notification.
redo()

Restores the most recently undone state from the redo stack and provides feedback to the user.
restoreFromHistory(index: number)

Restores the form to a specific historical state based on the provided index and updates the stacks accordingly.
reset()

Resets the form fields to their initial values and clears the undo and redo stacks.
deepCopy<T>(value: T): T

Creates a deep copy of the form values to ensure that the state is accurately maintained.
canUndo()

Returns a boolean indicating whether an undo action can be performed.
canRedo()

Returns a boolean indicating whether a redo action can be performed.
showToast(message: string)

Displays a snackbar notification with a custom message for user feedback.

## Setup Instructions

### 1. Install Angular Material

Make Sure Angular Material is Installed:

```bash
ng add @angular/material
```
### 2. Make sure to include all modules used

```angular2html
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  imports: [
    ReactiveFormsModule,
    MatSnackBarModule,
    // other imports...
  ],
})
export class AppModule { }
```

### 3. Run Using ng serve command
```bash
ng serve
```

## For Testing Cases

# Angular Form State Management Component Tests

This document provides an overview of the test suite for the Angular Form State Management component. The tests ensure that the form's functionalities—such as tracking changes, undoing actions, redoing actions, and resetting the form—work as expected.

## Test Suite Overview

The test suite is written using Jasmine and Angular's testing utilities, and it covers the following functionalities:

- Initialization of the form
- Tracking form value changes
- Undo functionality
- Redo functionality
- Resetting the form
- Restoring form state from history
- Checking the availability of undo and redo actions

## Test Cases

### 1. Component Creation
- **Description**: Verifies that the component is created successfully.
- **Test Method**: `it('should create the component')`

### 2. Form Initialization
- **Description**: Checks that the form is initialized with default values.
- **Test Method**: `it('should initialize form with default values')`

### 3. Form Value Change Tracking
- **Description**: Tests if the component correctly tracks changes made to the form values.
- **Test Method**: `it('should track form value changes')`

### 4. Undo Functionality
- **Description**: Validates that the last change can be undone and the corresponding toast message is displayed.
- **Test Method**: `it('should undo the last change')`

### 5. Redo Functionality
- **Description**: Checks that the last undone change can be redone and the appropriate toast message is shown.
- **Test Method**: `it('should redo the last undone change')`

### 6. Reset Functionality
- **Description**: Confirms that the form can be reset to its initial state, and a toast message appears indicating the reset.
- **Test Method**: `it('should reset the form')`

### 7. History Restoration
- **Description**: Tests that the component can restore the form state from the history correctly.
- **Test Method**: `it('should restore form state from history')`

### 8. Undo Availability
- **Description**: Checks if the `canUndo()` method correctly identifies when an undo action is possible.
- **Test Method**: `it('should return true for canUndo if undo stack length > 1')`

### 9. Redo Availability
- **Description**: Validates that the `canRedo()` method returns false when there are no actions to redo.
- **Test Method**: `it('should return false for canRedo if redo stack is empty')`

## Running the Tests

To execute the tests, run the following command in your terminal:

```bash
ng test
