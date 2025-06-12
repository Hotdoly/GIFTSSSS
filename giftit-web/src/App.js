import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './index.css'

const perfisPersonalidade = [
  'Aventureiro', 'Criativo', 'Caseiro', 'Intelectual', 'Engraçado', 'Romântico',
  'Moderno', 'Empreendedor', 'Esportista', 'Minimalista', 'Tech Lover', 'Artista',
  'Gourmet', 'Sustentável', 'Leitor', 'Animais',
];

// Página inicial para selecionar presente direto + mostrar pessoas cadastradas
// Dentro do Home:
function Home({ pessoas }) {
  const [personalidade, setPersonalidade] = useState('');
  const [interesses, setInteresses] = useState('');
  const [sugestoes, setSugestoes] = useState([]);

  const gerarSugestoes = (pessoaPersonalidade, pessoaInteresses) => {
    const chave = `${pessoaPersonalidade.toLowerCase()} ${pessoaInteresses.toLowerCase()}`;

    const bancoSugestoes = [
      { perfil: ['aventureiro', 'esportes'], sugestao: 'Mochila impermeável para trilhas' },
      { perfil: ['aventureiro', 'viagem'], sugestao: 'Kit de sobrevivência portátil' },
      { perfil: ['criativo', 'artes'], sugestao: 'Kit completo de pintura a óleo' },
      { perfil: ['caseiro', 'cozinha'], sugestao: 'Máquina de fazer pão automática' },
      { perfil: ['intelectual', 'livros'], sugestao: 'Assinatura de clube do livro' },
      { perfil: ['engraçado', 'humor'], sugestao: 'Caneca com frases engraçadas personalizadas' },
      { perfil: ['romântico', 'música'], sugestao: 'Vinil de uma banda favorita' },
      { perfil: ['moderno', 'tecnologia'], sugestao: 'Fones de ouvido sem fio com cancelamento de ruído' },
      { perfil: ['esportista', 'esportes'], sugestao: 'Relógio esportivo com GPS e monitor de batimentos' },
      { perfil: ['minimalista', 'moda'], sugestao: 'Relógio de design clean e elegante' },
      { perfil: ['tech lover', 'gadgets'], sugestao: 'Carregador portátil ultrafino' },
      { perfil: ['artista', 'fotografia'], sugestao: 'Câmera instantânea estilizada' },
      { perfil: ['gourmet', 'cozinha'], sugestao: 'Kit de especiarias exóticas' },
      { perfil: ['sustentável', 'ecologia'], sugestao: 'Kit reutilizável de utensílios para viagem' },
      { perfil: ['leitor', 'livros'], sugestao: 'Luminária de leitura flexível' },
      { perfil: ['animais', 'pets'], sugestao: 'Brinquedo interativo para pets' },
    ];

    const filtradas = bancoSugestoes.filter(item =>
      item.perfil.some(p => chave.includes(p))
    );

    setSugestoes(
      filtradas.length > 0
        ? filtradas
        : [{ sugestao: 'Vale-presente personalizado com embalagem temática!' }]
    );
  };

  // quando clica em pessoa na lista
  const selecionarPessoa = (pessoa) => {
    setPersonalidade(pessoa.personalidade);
    setInteresses(pessoa.interesses || '');
    gerarSugestoes(pessoa.personalidade, pessoa.interesses || '');
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>GiftIt - Escolha um presente</h1>

      <div style={styles.form}>
        <select
          style={styles.input}
          value={personalidade}
          onChange={e => setPersonalidade(e.target.value)}
        >
          <option value="">Selecione a personalidade</option>
          {perfisPersonalidade.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Interesses (ex: livros, música)"
          style={styles.input}
          value={interesses}
          onChange={e => setInteresses(e.target.value)}
        />

        <button
          style={styles.button}
          onClick={() => gerarSugestoes(personalidade, interesses)}
          disabled={!personalidade}
        >
          Gerar sugestões
        </button>

        <Link to="/cadastro" style={styles.linkButton}>Cadastrar conhecido</Link>
      </div>

      {sugestoes.length > 0 && (
        <div style={styles.sugestoes}>
          <h2>Sugestões de presentes:</h2>
          <ul>
            {sugestoes.map((s, i) => (
              <li key={i}>{s.sugestao}</li>
            ))}
          </ul>
        </div>
        
      )}

      {pessoas.length > 0 && (
        <div style={{ marginTop: '3rem', color: '#ca9ee6'}}>
          <h2>Pessoas cadastradas (clique para gerar presentes):</h2>
          <ul>
            {pessoas.map((p, i) => (
              <li
                key={i}
                onClick={() => selecionarPessoa(p)}
                style={{ cursor: 'pointer', textDecoration: 'underline', color: '#99d1db', marginBottom: 6 }}
                title="Clique para gerar sugestões para essa pessoa"
              >
                {p.nome} - {p.personalidade}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}


// Página para cadastrar aniversariante
function Cadastro({ adicionarPessoa }) {
  const [form, setForm] = useState({
    nome: '',
    idade: '',
    interesses: '',
    personalidade: '',
  });

  const navigate = useNavigate();

  const onSubmit = () => {
    if (!form.nome || !form.personalidade || !form.idade) {

      alert('Por favor, preencha Nome, Personalidade e idade');
      return;
    }
    adicionarPessoa(form);
    setForm({ nome: '', idade: '', interesses: '', personalidade: ''});

    navigate('/'); // volta para home
  };

  return (

    <div style={styles.page}>
      <h1 style={styles.title}>Cadastrar Aniversariante</h1>

      <div style={styles.form}>
        <input
          placeholder="Nome"
          style={styles.input}
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
        />
        <input
          placeholder="Idade"
          type="number"
          style={styles.input}
          value={form.idade}
          onChange={e => setForm({ ...form, idade: e.target.value })}
        />
        <input
          placeholder="Interesses (ex: livros, música)"
          style={styles.input}
          value={form.interesses}
          onChange={e => setForm({ ...form, interesses: e.target.value })}
        />
        <select
          style={styles.input}
          value={form.personalidade}
          onChange={e => setForm({ ...form, personalidade: e.target.value })}
        >
          <option value="">Selecione a personalidade</option>
          {perfisPersonalidade.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>

        <button style={styles.button} onClick={onSubmit}>Adicionar Pessoa</button>
        <button style={styles.linkButton } onClick={() => navigate('/')}>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [pessoas, setPessoas] = useState([]);

  // função para adicionar pessoa na lista
  const adicionarPessoa = (pessoa) => {
    setPessoas(prev => [...prev, pessoa]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home pessoas={pessoas} />} />
        <Route path="/cadastro" element={<Cadastro adicionarPessoa={adicionarPessoa} />} />
      </Routes>
    </Router>
  );
}

const styles = {
  fundo: {
    background: "#303446"
  },
  page: {

    background: '#1e1e2e',
    minHeight: '100vh',
    padding: '3rem 1rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#cdd6f4',
    maxWidth: '600px',
    margin: 'auto',
  },
  title: {
    marginBottom: '1.5rem',
    fontWeight: '700',
    fontSize: '2.2rem',
    textAlign: 'center',
    color: '#cba6f7',

  },
  form: {
    display: 'grid',
    gap: '1rem',
    padding: '0 1rem',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #626880',
    outline: 'none',
  },
  button: {
    padding: '0.9rem',
    backgroundColor: '#04a5e5',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  linkButton: {
    textAlign: 'center',
    padding: '0.9rem',
    marginTop: '0.4rem',
    backgroundColor: '#40a02b',
    border: 'none',
    color: 'white',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
  },
  sugestoes: {
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#313244',
    borderRadius: '12px',
  },
};
