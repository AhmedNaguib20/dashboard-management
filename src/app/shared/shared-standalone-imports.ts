import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzUploadModule } from 'ng-zorro-antd/upload';

const MATERIAL_IMPORT = [MatPaginatorModule];

const ANT_IMPORTS = [
  NzTableModule,
  NzModalModule,
  NzButtonModule,
  NzFormModule,
  NzInputModule,
  NzUploadModule,
  NzIconModule,
  NzDatePickerModule,
];

export const SHARED_IMPORTS = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  ...MATERIAL_IMPORT,
  ...ANT_IMPORTS,
];
