import { ReactNode, createContext, useState } from 'react'

interface BagContextType {
    amountShirts: number,
    setAmountShirts: React.Dispatch<React.SetStateAction<number>>,
    cartItems: IProduct[],
    setCartItems: React.Dispatch<React.SetStateAction<IProduct[]>>
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

    return (
        <BagContext.Provider value={{
            amountShirts,
            setAmountShirts,
            cartItems,
            setCartItems
        }}
        >
            {children}
        </BagContext.Provider>
    )
}