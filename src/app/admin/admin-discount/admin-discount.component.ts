import { Component, OnInit } from '@angular/core';
import { IDiscount, IDiscountResponse } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts!: IDiscountResponse[];
  public description!: string;
  public imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
  public editStatus = false;
  public editID!: number | string;

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.discountService.getAllFirebase().subscribe(data => {
      this.adminDiscounts = data as IDiscountResponse[];
    })
  }

  addDiscount(): void {
    const newDiscount = {
      description: this.description,
      imagePath: this.imagePath
    };
    // this.discountService.create(newDiscount).subscribe(() => {
    //   this.getDiscounts();
    //   this.resetForm();
    // });
    this.discountService.createFirebase(newDiscount).then(() => {
      this.getDiscounts();
      this.resetForm();
    })
  }

  editDiscount(discount: IDiscountResponse): void {
    this.description = discount.description;
    this.imagePath = discount.imagePath;
    this.editStatus = true;
    this.editID = discount.id;
  }

  saveDiscount(): void {
    const updateDiscount = {
      description: this.description,
      imagePath: this.imagePath,
      id: this.editID
    };
    // this.discountService.update(updateDiscount, this.editID).subscribe(() => {
    //   this.getDiscounts();
    //   this.resetForm();
    // })
    this.discountService.updateFirebase(updateDiscount, this.editID as string).then(() => {
      this.getDiscounts();
      this.resetForm();
    })
  }

  deleteDiscount(discount: IDiscountResponse): void {
    // if (confirm('Are you sure?')) {
    //   this.discountService.delete(discount.id).subscribe(() => {
    //     this.getDiscounts();
    //   })
    // }
    if (confirm('Are you sure?')) {
      this.discountService.deleteFirebase(discount.id as string).then(() => {
        this.getDiscounts();
      })
    }
  }

  private resetForm(): void {
    this.description = '';
    this.imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
    this.editStatus = false;
  }
}
