interface ProductImage {
  disabled: boolean | null;
  label: string;
  position: string;
  url: string;
}

interface ProductDescription {
  html: string;
}

export type Product = {
  name: string;
  uid: string;
  url_key: string;
  sku: string;
  image: ProductImage;
  small_image: ProductImage;
  description: ProductDescription;
  price_range: {
    maximum_price: {
      regular_price: {
        value: number;
      };
    };
  };
};

export type ProductProps = {
  product: Product;
};
