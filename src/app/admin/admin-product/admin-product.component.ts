import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICategoryResponse } from 'src/app/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/app/shared/interfaces/product/product.interface';
import { CategoryService } from 'src/app/shared/services/category/category.service';
import { ProductService } from 'src/app/shared/services/product/product.service';
import { ImageService } from 'src/app/shared/services/image/image.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  public productForm!: FormGroup;
  public adminProducts: Array<IProductResponse> = [];
  public adminCategories: Array<ICategoryResponse> = [];
  public editStatus = false;
  public uploadPercent = 0;
  public isUploaded = false;
  public currentCategoryId!: string | number;
  private currentProductId!: string | number;
  public isOpen = false;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private imageService: ImageService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadCategories();
    this.loadProducts();

  }
  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      name: [null, Validators.required],
      path: [null, Validators.required],
      description: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      proteins: [null, Validators.required],
      carbohydrates: [null, Validators.required],
      fats: [null, Validators.required],
      calories: [null, Validators.required],
      imagePath: [null, Validators.required],
      count: [1]
    });
  }

  loadCategories(): void {
    this.categoryService.getAllFirebase().subscribe(data => {
      this.adminCategories = data  as ICategoryResponse[];
      this.productForm.patchValue({
        category: this.adminCategories[0].id
      })
    })
  }

  loadProducts(): void {
    // this.productService.getAll().subscribe(data => {
    //   this.adminProducts = data;
    // })
    this.productService.getAllFirebase().subscribe(data => {
      this.adminProducts = data as IProductResponse[];
    })
  }

  addProduct(): void {
    if (this.editStatus) {
      // this.productService.update(this.productForm.value, this.currentProductId).subscribe(() => {
      //   this.loadProducts();
      //   this.isOpen = false;
      //   this.editStatus=false;
      //   this.toastr.success('Product successfully updated');
      // });
      this.productService.updateFirebase(this.productForm.value, this.currentProductId as string).then(() => {
        this.loadProducts();
        this.isOpen = false;
        this.editStatus=false;
        this.toastr.success('Product successfully updated');
      });
    }
    else {
      // this.productService.create(this.productForm.value).subscribe(() => {
      //   this.loadProducts();
      //   this.isOpen = false;
      //   this.editStatus=false;
      //   this.toastr.success('Product successfully created');
      // });
      this.productService.createFirebase(this.productForm.value).then(() => {
        this.loadProducts();
        this.isOpen = false;
        this.editStatus=false;
        this.toastr.success('Product successfully created');
      });
    };
    this.editStatus = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }
  editProduct(product: IProductResponse): void {
    this.productForm.patchValue({
      category: product.category,
      name: product.name,
      path: product.path,
      description: product.description,
      weight: product.weight,
      price: product.price,
      proteins: product.proteins,
      carbohydrates: product.carbohydrates,
      fats: product.fats,
      calories: product.calories,
      imagePath: product.imagePath,
      count: [1]
    });
    this.isOpen=true;
    this.isUploaded=true;
    this.editStatus=true;
    this.currentProductId=product.id as string
  }
  deleteProduct(product: IProductResponse): void {
    // this.productService.delete(product.id).subscribe(() => {
    //   this.loadProducts();
    //   this.toastr.success('Product successfully deleted');
    // })
    this.productService.deleteFirebase(product.id as string).then(() => {
      this.loadProducts();
      this.toastr.success('Product successfully deleted');
    })
  }

  changeCategory(categoryElem: any): void {
    console.log(categoryElem.value);

  }
  upload(event: any): void {
    const file = event.target.files[0];
    this.imageService.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
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
        this.isUploaded = false;
        this.uploadPercent = 0;
        this.productForm.patchValue({
          imagePath: null
        })
      })
      .catch(err => {
        console.log(err);
      })
  }
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }

  toggleOpenForm(): void {
    this.isOpen = !this.isOpen;
  }
}
