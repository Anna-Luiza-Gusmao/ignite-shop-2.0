import { ReactNode, createContext, useEffect, useState } from 'react'

interface BagContextType {
    amountShirts: number,
    setAmountShirts: React.Dispatch<React.SetStateAction<number>>,
    bagItems: IProduct[],
    setBagItems: React.Dispatch<React.SetStateAction<IProduct[]>>,
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
    const [bagItems, setBagItems] = useState<IProduct[]>([]) 
    const [sumOfShirtsPrice, setSumOfShirtsPrice] = useState(0.00)
    const [emptyBag, setEmptyBag] = useState(true)

    const checkEmptyBag = () => {
        if(bagItems.length === 0) {
            setEmptyBag(true)
        } else {
            setEmptyBag(false)
        }
    }
    
    useEffect(() => {
        checkEmptyBag()
        if (document.readyState === 'complete') {
            localStorage.clear()
        }
    }, [amountShirts])

    return (
        <BagContext.Provider value={{
            amountShirts,
            setAmountShirts,
            bagItems,
            setBagItems,
            sumOfShirtsPrice, 
            setSumOfShirtsPrice,
            emptyBag
        }}
        >
            {children}
        </BagContext.Provider>
    )
}