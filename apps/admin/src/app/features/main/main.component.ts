import { Component, OnDestroy, OnInit } from '@angular/core';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { FormControl } from '@angular/forms';
import { SubSink } from '../../shared/utils/sub-sink';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [MxTextareaComponent],
})
export class MainComponent implements OnInit, OnDestroy {
  schemaTextArea = new FormControl();
  private subs = new SubSink();

  ngOnInit(): void {
    this.subs.sink = this.schemaTextArea.valueChanges.subscribe((value) => {});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
