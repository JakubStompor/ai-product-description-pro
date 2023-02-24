import { ProductDto } from "../../api";

export interface ProductListItem extends ProductDto {
  checked: boolean;
}
