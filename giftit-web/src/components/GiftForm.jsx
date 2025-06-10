import React, { useState } from 'react';

export default function GiftForm({ onSubmit }) {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    interesses: ''
  });

const [personalidade, setPersonalidade] = useState('');

// No seu formulário JSX:
<label>Personalidade:</label>
<select
  value={personalidade}
  onChange={(e) => setPersonalidade(e.target.value)}
>
  <option value="">Selecione</option>
  <option value="Aventureiro">Aventureiro</option>
  <option value="Criativo">Criativo</option>
  <option value="Caseiro">Caseiro</option>
  <option value="Intelectual">Intelectual</option>
  <option value="Engraçado">Engraçado</option>
  <option value="Romântico">Romântico</option>
  <option value="Moderno">Moderno</option>
  <option value="Empreendedor">Empreendedor</option>
  <option value="Esportista">Esportista</option>
  <option value="Minimalista">Minimalista</option>
  <option value="Tech Lover">Tech Lover</option>
  <option value="Artista">Artista</option>
  <option value="Gourmet">Gourmet</option>
  <option value="Sustentável">Sustentável</option>
  <option value="Leitor">Leitor</option>
</select>


  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <input className="w-full p-2 border" name="nome" placeholder="Nome do destinatário" onChange={handleChange} />
      <input className="w-full p-2 border" name="idade" placeholder="Idade" onChange={handleChange} />
      <input className="w-full p-2 border" name="interesses" placeholder="Interesses (separados por vírgula)" onChange={handleChange} />
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Ver sugestões</button>
    </form>
  );
}
