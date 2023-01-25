import { ReactNode, createContext, useEffect, useState } from 'react'

interface BagContextType {
    amountShirts: number,
    setAmountShirts: React.Dispatch<React.SetStateAction<number>>,
    cartItems: IProduct[],
    setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>,
    sumOfShirtsPrice: number,
    setSumOfShirtsPrice: React.Dispatch<React.SetStateAction<number>>,
    emptyBag: boolean
}

export const BagContext = createContext({} as BagContextType)

interface BagContextProviderProps {
    children: ReactNode
}

export interface IProduct {
    id: string,
    name: string,
    imageUrl: string,
    price: string,
    description: string,
    defaultPriceId: string
}

export function BagContextProvider({ children }: BagContextProviderProps) {
    let stateAmountShirt = 0

    if (typeof window !== 'undefined') {
        const amountShirtsLocalStorage = localStorage.getItem('@ignite-shop-2.0: amountShirts-state-1.0.0')
        if (amountShirtsLocalStorage != null) stateAmountShirt = parseInt(amountShirtsLocalStorage)
    }

    const [amountShirts, setAmountShirts] = useState(stateAmountShirt)
    const [cartItems, setCartItems] = useState<IProduct[]>([]) 
    const [sumOfShirtsPrice, setSumOfShirtsPrice] = useState(0.00)
    const [emptyBag, setEmptyBag] = useState(true)

    const checkEmptyBag = () => {
        if(cartItems.length !== 0) setEmptyBag(false)
    }
    useEffect(() => {
        checkEmptyBag()
    })

    return (
        <BagContext.Provider value={{
            amountShirts,
            setAmountShirts,
            cartItems,
            setCartItems,
            sumOfShirtsPrice, 
            setSumOfShirtsPrice,
            emptyBag
        }}
        >
            {children}
        </BagContext.Provider>
    )
}