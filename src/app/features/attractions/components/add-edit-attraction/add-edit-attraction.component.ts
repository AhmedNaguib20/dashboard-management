import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { ToastrService } from 'ngx-toastr';
import { Constants } from '../../../../core/common/constants';
import { AttractionsService } from '../../services/attractions.service';
import { Attraction } from '../../../../core/data/models/attraction.model';
import { LoadingService } from '../../../../shared/services/loading.service';
import { SHARED_IMPORTS } from '../../../../shared/shared-standalone-imports';

@Component({
  selector: 'app-add-edit-attraction',
  imports: [SHARED_IMPORTS],
  templateUrl: './add-edit-attraction.component.html',
  styleUrl: './add-edit-attraction.component.scss',
  standalone: true,
})
export class AddEditAttractionComponent implements OnInit {
  @Input() selectedAttraction: Attraction;
  @Output() closeModal = new EventEmitter<void>();
  public form: FormGroup = new FormGroup({});
  public fileList: NzUploadFile[] = [];

  constructor(
    private attractionsService: AttractionsService,
    private toastr: ToastrService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  onCloseModal(): void {
    this.closeModal.emit();
  }

  submitForm(): void {
    this.loadingService.startLoading();
    if (this.selectedAttraction) {
      this.attractionsService
        .updateAttraction({
          ...this.form.value,
          id: this.selectedAttraction.id,
          coverimage: 'https://placehold.co/60x40',
        })
        .subscribe((response) => {
          this.closeModal.emit();
          this.toastr.success(Constants.SUCCESS_UPDATE_ATTRACTION);
          this.loadingService.stopLoading();
        });
    } else {
      this.attractionsService
        .createAttraction({
          ...this.form.value,
          coverimage: 'https://placehold.co/60x40',
        })
        .subscribe((response) => {
          this.closeModal.emit();
          this.toastr.success(Constants.SUCCESS_ADD_ATTRACTION);
          this.loadingService.stopLoading();
        });
    }
  }

  // private methods
  private initForm(): void {
    this.form = new FormGroup({
      name: new FormControl(
        this.selectedAttraction ? this.selectedAttraction.name : '',
        Validators.required
      ),
      detail: new FormControl(
        this.selectedAttraction ? this.selectedAttraction.detail : '',
        Validators.required
      ),
      latitude: new FormControl(
        this.selectedAttraction ? this.selectedAttraction.latitude : '',
        Validators.required
      ),
      longitude: new FormControl(
        this.selectedAttraction ? this.selectedAttraction.longitude : '',
        Validators.required
      ),
    });
  }
}
