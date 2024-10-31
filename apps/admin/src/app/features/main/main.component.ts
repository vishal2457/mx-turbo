import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MxTextareaComponent } from '../../shared/ui/form/textarea';
import { FormControl } from '@angular/forms';
import { SubSink } from '../../shared/utils/sub-sink';
import { ApiService } from '../../shared/services/api.service';
import { MxCardModule } from '../../shared/ui/card/card.module';
import { KeyValuePipe, NgClass } from '@angular/common';
import { MxBadgeComponent } from '../../shared/ui/badge';

@Component({
  standalone: true,
  selector: 'app-main',
  templateUrl: './main.component.html',
  imports: [MxCardModule, NgClass, MxBadgeComponent, KeyValuePipe],
})
export class MainComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);

  schemaList: any[] = [];
  selectedSchema: any = {};

  ngOnInit(): void {
    this.api.get<any[]>('/get-all-schema').subscribe((data) => {
      this.schemaList = data.data;
      this.selectedSchema = this.schemaList[0];
    });
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

  selectSchema(schema: any) {
    this.selectedSchema = schema;
  }

  getKeyAsString(item: any): string {
    return typeof item?.key === 'string'
      ? `${item.key}: ${item.value.type}`
      : '';
  }
}
