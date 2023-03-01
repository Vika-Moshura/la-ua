import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { ImageService } from 'src/app/shared/services/image/image.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {

  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;
  public editStatus = false;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId!: number | string;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.initCategoryForm();
    this.loadCategories();
  }

  initCategoryForm(): void {
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      path: [null, Validators.required],
      imagePath: [null, Validators.required]
    });
  }

  loadCategories(): void {
    // this.categoryService.getAll().subscribe(data => {
    //   this.adminCategories = data;
    // })
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data as ICategoryResponse[];
    })
  }

  addCategory(): void {
    if (this.editStatus) {
      // this.categoryService.update(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
      //   this.loadCategories();
      //   this.toastr.success('Category successfully edited');
      // })
      this.categoryService.updateFirebase(this.categoryForm.value, this.currentCategoryId as string).then(() => {
        this.loadCategories();
        this.toastr.success('Category successfully edited');
      })
    } else {
      // this.categoryService.create(this.categoryForm.value).subscribe(() => {
      // this.loadCategories();
      // this.toastr.success('Category successfully added');
      // })
      this.categoryService.createFirebase(this.categoryForm.value).then(() => {
        this.loadCategories();
        this.toastr.success('Category successfully added');
      })
    }
    this.editStatus = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editCategory(category: ICategoryResponse): void {
    this.categoryForm.patchValue({
      name: category.name,
      path: category.path,
      imagePath: category.imagePath
    });
    this.editStatus = true;
    this.currentCategoryId = category.id as number;
    this.isUploaded = true;
  }

  deleteCategory(category: ICategoryResponse): void {
    // this.categoryService.delete(category.id as number).subscribe(() => {
    //   this.loadCategories();
    //   this.toastr.success('Category successfully deleted');
    // })
    this.categoryService.deleteFirebase(category.id as string).then(() => {
      this.loadCategories();
      this.toastr.success('Category successfully deleted');
    })
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
          imagePath: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  deleteImage(): void {
    this.imageService.deleteUploadFile(this.valueByControl('imagePath'))
      .then(() => {
        console.log('File deleted');
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.categoryForm.patchValue({
          imagePath: null
        })
      })
  }

  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }

}
