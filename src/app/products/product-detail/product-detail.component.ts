import { Component, Input, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable, Subscription } from 'rxjs'
import { Product } from 'src/app/models/product.interface'
import { ProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnDestroy {

  product$: Observable<Product>
  product: Product;
  sub: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) {
    const id = activatedRoute.snapshot.params.id

    // Avec pipe async
    this.product$ = productService.getProductById(id)

    // Avec subscribe/unsubscribe
    // this.sub = new Subscription();

    // this.sub.add(
    //   productService.getProductById(id)
    //     .subscribe(
    //       result => this.product = result
    //     )
    //)
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
