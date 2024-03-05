import { useCart } from "../hooks/useCart";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Products.css";

export function Products({ products }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id)
  }

  return (
    <main className="products">
      <ul>
        {products.slice(0, 10).map((product) => {
          const isproductInCart = checkProductInCart(product)


          return (< li key={product.id} >
            <img src={product.thumbnail} alt={product.title} />
            <div>
              <strong>{product.title}</strong> - ${product.price}
            </div>
            <div>
              <button style={{ backgroundColor: isproductInCart ? 'red' : '#09f' }} onClick={() => isproductInCart ? removeFromCart(product) : addToCart(product)}>
                {
                  isproductInCart ? <RemoveFromCartIcon /> : <AddToCartIcon />
                }

              </button>
            </div>
          </li>)
        })}
      </ul>
    </main >
  );
}
