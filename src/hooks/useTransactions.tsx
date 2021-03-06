import { createContext, ReactNode, useEffect, useState, useContext } from 'react'
import { api } from '../services/api';

interface TransactionProps {
   id: number,
   title: string,
   value: number,
   type: string,
   category:string,
   createdAt: string
 }

type TransactionInput = Omit<TransactionProps, 'id' | 'createdAt'>

 interface TransactionProviderProps {
    children: ReactNode
 }

 interface TransactionsContextData {
    transactions: TransactionProps[],
    createTransaction: (transaction: TransactionInput) => Promise<void>
 }

const TransactionContext = createContext<TransactionsContextData>(
   {} as TransactionsContextData
);

export function TransactionProvider({children}: TransactionProviderProps) {
   const [transactions, setTransactions] = useState<TransactionProps[]>([]);

   useEffect(() => {
     api.get('/transactions')
     .then(response => setTransactions(response.data.transactions))
   }, []);

   async function createTransaction(transactionInput: TransactionInput){
      const response = await api.post('/transactions', {
         ...transactionInput,
         createdAt: new Date()
      });
      const { transaction } = response.data;

      setTransactions([
         ...transactions,
         transaction
      ])
   }

   return (
      <TransactionContext.Provider value={{ transactions, createTransaction }}>
         {children}
      </TransactionContext.Provider>
   )
}

export function useTransactions() {
   const context = useContext(TransactionContext);

   return context
}