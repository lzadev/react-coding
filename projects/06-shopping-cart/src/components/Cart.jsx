import { useId } from 'react'
import { useCart } from '../hooks/useCart'
import './Cart.css'
import { CartIcon, ClearCartIcon } from './Icons'


const CartItem = ({ thumbnail, title, price, quantity, addToCart }) => {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong> - ${price}
            </div>
            <footer>
                <small>
                    Qty: {quantity}
                </small>
            </footer>
            <button onClick={addToCart}>+</button>
        </li>
    )
}

export function Cart() {
    const cartCheckboxId = useId()
    const { cart, clearCart, addToCart } = useCart()


    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input type='checkbox' id={cartCheckboxId} hidden />

            <aside className='cart'>
                <ul>
                    {
                        cart.map((product) => {
                            return (
                                <CartItem key={product.id} {...product} addToCart={() => addToCart(product)} />
                            )
                        })
                    }
                </ul>
                <button onClick={clearCart}>
                    <ClearCartIcon />
                </button>
            </aside>
        </>
    )
}