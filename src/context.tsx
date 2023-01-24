import { ReactNode, createContext, useState } from 'react'

interface BagContextType {
    amountShirts: number,
    setAmountShirts: React.Dispatch<React.SetStateAction<number>>
}

export const BagContext = createContext({} as BagContextType)

interface BagContextProviderProps {
    children: ReactNode
}

export function BagContextProvider({ children }: BagContextProviderProps) {
    const [amountShirts, setAmountShirts] = useState(0)

    return (
        <BagContext.Provider value={{
            amountShirts, 
            setAmountShirts
        }}
        >
            {children}
        </BagContext.Provider>
    )
}