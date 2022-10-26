import { CartProduct } from "../redux/cartSlice";

export const calculateBaseTotal = (cart: CartProduct[]): number => {
    return cart.reduce((total, cartItem) => {
        return total + ( cartItem.product.price as number * cartItem.quantity )
    }, 0)
}