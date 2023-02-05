import { Component, OnInit } from '@angular/core';
import { IDiscount } from 'src/app/shared/interfaces/discount/discount.interface';
import { DiscountService } from 'src/app/shared/services/discount/discount.service';

@Component({
  selector: 'app-admin-discount',
  templateUrl: './admin-discount.component.html',
  styleUrls: ['./admin-discount.component.scss']
})
export class AdminDiscountComponent implements OnInit {

  public adminDiscounts!: IDiscount[];
  public description!: string;
  public imagePath = 'https://la.ua/wp-content/uploads/2021/08/6-1.jpg';
  public editStatus = false;
  public editID!: number;

  constructor(
    private discountService: DiscountService
  ) { }

  ngOnInit(): void {
    this.getDiscounts();
  }

  getDiscounts(): void {
    this.discountService.getAll().subscribe(data => {
      this.adminDiscounts = data;
    })
  }

  addDiscount(): void {
    const newDiscount = {
      description: this.description,
      imagePath: this.imagePath
    };
    this.discountService.create(newDiscount).subscribe(() => {
      this.getDiscounts();
      this.resetForm();
    })
  }

  editDiscount(discount: IDiscount): void {
    this.description = discount.description;
    this.imagePath = discount.imagePath;
    this.editStatus = true;
    this.editID = discount.id;
  }

  saveDiscount(): void {
    const updateDiscount = {
      description: this.description,
      imagePath: this.imagePath
    };
    this.discountService.update(updateDiscount, this.editID).subscribe(() => {
      this.getDiscounts();
      this.resetForm();
    })
  }

  deleteDiscount(discount: IDiscount): void {
    if(confirm('Are you sure?')){
      this.discountService.delete(discount.id).subscribe(() => {
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
