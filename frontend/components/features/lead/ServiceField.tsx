import { FieldShell, INPUT_CLASS } from './FieldShell';

export interface ProductOption {
  slug: string;
  title: string;
}

interface ServiceFieldProps {
  id: string;
  label: string;
  notSelected: string;
  products: ProductOption[];
  defaultValue: string;
}

/** Native select of products. The empty first option means "no product chosen". */
export function ServiceField({ id, label, notSelected, products, defaultValue }: ServiceFieldProps) {
  return (
    <FieldShell id={id} label={label}>
      <select id={id} name="product" defaultValue={defaultValue} className={INPUT_CLASS}>
        <option value="">{notSelected}</option>
        {products.map((product) => (
          <option key={product.slug} value={product.slug}>
            {product.title}
          </option>
        ))}
      </select>
    </FieldShell>
  );
}
