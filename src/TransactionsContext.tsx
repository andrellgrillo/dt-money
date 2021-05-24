import { createContext, ReactNode, useEffect, useState } from 'react'
import { api } from './services/api';

interface TransactioProps {
   id: number,
   title: string,
   value: number,
   type: string,
   category:string,
   createdAt: string
 }

 interface TransactionProviderProps {
    children: ReactNode
 }

export const TransactionContext = createContext<TransactioProps[]>([]);

export function TransactionProvider({children}: TransactionProviderProps) {
   const [transactions, setTransactions] = useState<TransactioProps[]>([]);

   useEffect(() => {
     api.get('/transactions')
     .then(response => setTransactions(response.data.transactions))
   }, []);

   return (
      <TransactionContext.Provider value={transactions}>
         {children}
      </TransactionContext.Provider>
   )
}