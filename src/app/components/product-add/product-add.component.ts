
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder, //FluentValidation kuralları, ilgili nesnelere form oluşturuyor.
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css'],
})
export class ProductAddComponent implements OnInit {
  productAddForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder, // form oluşturma
    private productService: ProductService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createProductAddForm();
  }

  createProductAddForm() { //form oluşturma
    this.productAddForm = this.formBuilder.group({
      //servis ile build etme
      productName: ['', Validators.required],
      //her bir nesneyle ilgelenme.
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      categoryId: ['', Validators.required],
    });
  }

  add() {
    if (this.productAddForm.valid)  { //form kurallara uyarsa
      let productModel = Object.assign({}, this.productAddForm.value);
      //object.assign : bizim için obje oluşturup,
      //productAddForm'daki değerlerini alıyor.(oluşturulan obje için)
      this.productService.add(productModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Successful');
          //toastr'daki information bilgisi aslında
          //apiden geliyor.buradan anlıyoruz.
          //api'den gelen hatalarda middleware kullanırız.
        },
        //Back-end'de Validation kuralları
        //yerine gelmediğinde error mesajı verir.
        (responseError) => {
          if (responseError.error.Errors.length > 0) //error http'den gelen error
          {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error'
              );
              //Object olarak gelen Validation hatalarını
              //for döngüsüyle sadece mesaj gelecek sekılde 
              //toastrlara ekliyoruz.
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form Has Absent Values', 'Be Carefull');
    }
  }
}
