import './App.css'
//useffect
import { use, useEffect, useState } from 'react'
type ProdutoType = {
  _id: string,
  nome: string,
  preco: number,
  urlfoto: string,
  descricao: string
}

function App() {
  const [produtos, setProdutos] = useState<ProdutoType[]>([])
 
  useEffect(() => {
  fetch('/api/produtos')
  .then((response) => response.json())
  .then((data) => setProdutos(data))
  .catch((error) => console.error('Error fetching data:', error));
  },[])

  function handleForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const data = {
      nome: formData.get('nome') as string,
      preco: Number(formData.get('preco')),
      urlfoto: formData.get('urlfoto') as string,
      descricao: formData.get('descricao') as string
    }
    fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data))
    }
  }
  return (
    
    <div>
      <div> Cadastro de produtos</div>
    <form onSubmit={handleForm}>
   <input type="text" name="nome" placeholder="Nome:" />
   <input type="number" name="preco" placeholder="Preço:" />
   <input type="text" name="urlfoto" placeholder="Descricão:" />
   <button type="submit">Cadastrar</button>
    </form>


      <div>Lista de produtos</div>
      {produtos.map((produtos) => (
        <div key={produtos._id}>
          <h2>{produtos.nome}</h2>
          <p>R$ {produtos.preco}</p>
          <img src={produtos.urlfoto} alt={produtos.nome} width="200" />
          <p>{produtos.descricao}</p>
        </div>
      ))}
    </div>
  )
 
)

export default App
