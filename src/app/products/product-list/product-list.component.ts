import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  title: string = 'Products';
  //products: Product[];
  products$: Observable<Product[]>;
  productsNb: number;
  selectedProduct: Product;

  // Pagination
  pageSize = 5;
  start = 0;
  end = this.pageSize;
  pageNumber = 1;

  previousPage() {
    this.start -= this.pageSize;
    this.end -= this.pageSize;
    this.pageNumber--;
    this.selectedProduct = null;
  }

  nextPage() {
    this.start += this.pageSize;
    this.end += this.pageSize;
    this.pageNumber++;
    this.selectedProduct = null;
  }

  onSelect(product: Product) {
    this.selectedProduct = product;
    this.router.navigateByUrl('/products/' + product.id);
  }

  constructor(
    private productService: ProductService,
    private router: Router
  ) {
    this.products$ = productService
                        .products$
                        .pipe(
                          tap(products => this.productsNb = products.length)
                        );

    // productService
    //   .products$
    //   .subscribe(
    //     data => this.products = data
    //   );
  }

}
