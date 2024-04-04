import { ReactNode, createContext, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";

type ShopppingCartProviderProps = {
    children: ReactNode
}

type Cartitem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    IncreaseCartQuantity: (id: number) => void
    DecreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void 
    cartQuantity: number
    cartItems: Cartitem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider( { children } : ShopppingCartProviderProps ){
    const [isOpen, setIsOpen] = useState(false)
    const [cartItems, setCartItems] = useState<Cartitem[]>([])

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)
    
    function getItemQuantity(id: number){
        return cartItems.find(item => item.id   === id)?.quantity || 0
    }
    function IncreaseCartQuantity(id: number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, quantity: 1}]
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1}
                    } else {    
                        return item
                    }
                })
            }
        })
    }
    function DecreaseCartQuantity(id: number){
        setCartItems(currItems => {
            if (currItems.find(item => item.id == id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id: number){
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }
    return <ShoppingCartContext.Provider value={{ openCart, closeCart, cartQuantity, getItemQuantity, cartItems, removeFromCart, IncreaseCartQuantity, DecreaseCartQuantity}}>
        {children}
        <ShoppingCart/>
        </ShoppingCartContext.Provider>
}