import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-history-panel',
  templateUrl: './history-panel.component.html',
  styleUrl: './history-panel.component.css'
})
export class HistoryPanelComponent {
  @Input() historyItems: any[] = [];
  @Output() restoreHistoryItem = new EventEmitter<number>();

  getFormattedHistoryItem(item: any): string[] {
    let result: string[] = [];
    for (const [key, value] of Object.entries(item)) {
      const displayValue = value === null || value === undefined ? '' : (typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value);
      result.push(`${key}: ${displayValue}`);
    }
    return result;
  }

  onSelectHistoryItem(index: number): void {
    this.restoreHistoryItem.emit(index);
  }
}
