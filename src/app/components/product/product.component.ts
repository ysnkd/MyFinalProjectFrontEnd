import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
//Pipe konusu

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  //any:herşey olur 
  //sen bir product arraysın. 
  filterText = '';
  products: Product[] = [];
  dataLoaded = false;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private cartService: CartService
  ) {}
  //activatedtrue:Aftikliştirilmiş route demektir.
//servis ekleyeceksek bunu yapacağız.
//amaç productComponent'in newlemesi için 
//constructor kullanılır.
//httpclient kullanmak için constructor'a yazarız.
//private:http client sadece burda çalışsın 
//istiyorum.

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) {
        this.getProductsByCategory(params['categoryId']);
      } else {
        this.getProducts();
      }
    });
    //observable'lara subscribe oluyoruz.
  }

  //tek tek operasyon yazıyoruz(api getirmek)


  getProducts() {
    this.productService.getProducts().subscribe((response) => {
      this.products = response.data;
      this.dataLoaded = true;
    });
  }

  getProductsByCategory(categoryId: number) {
    this.productService
      .getProductsByCategory(categoryId)
      .subscribe((response) => {
        this.products = response.data;
      });
  }

  addToCart(product: Product) {
    this.toastrService.success('Sepete Eklendi', product.productName);
    this.cartService.addToCart(product);
  }
}
//toastr ürünü eklediğimizde yeşil bir css'de anlık
//uyarı verir.
