import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Container } from "./styles";

interface TransactioProps {
  id: number,
  title: string,
  value: number,
  type: string,
  category:string,
  createdAt: string
}

export function TransactionTable() {
  const [transaction, setTransaction] = useState<TransactioProps[]>([]);

  useEffect(() => {
    api.get('/transactions')
    .then(response => setTransaction(response.data.transactions))
  }, []);
  return(
    <Container>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          { transaction.map( t => (
            <tr key={t.id}>
              <td>{t.title}</td>
               <td className={t.type}>R$ {t.value}</td>
              <td>{t.category}</td>
              <td>{t.createdAt}</td>
        </tr>
          ))}         
        </tbody>
      </table>
    </Container>
  )
}