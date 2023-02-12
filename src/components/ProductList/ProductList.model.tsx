import { Product } from "../../api/products/products.model";

export interface ProductListItem extends Product {
  checked: boolean;
}
