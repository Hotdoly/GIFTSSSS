import React from 'react';
import giftIdeas from '../data/giftIdeas.json';

export default function GiftSuggestions({ interesses }) {
  const interessesArray = interesses.toLowerCase().split(',').map(i => i.trim());

  const sugestões = giftIdeas.flatMap(item => {
    const match = item.keywords.some(keyword =>
      interessesArray.includes(keyword)
    );
    return match ? item.suggestions.map(s => ({
      categoria: item.category,
      nome: s
    })) : [];
  });

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Sugestões de Presentes:</h2>
      {sugestões.length > 0 ? (
        <ul className="space-y-2">
          {sugestões.map((sug, index) => (
            <li key={index} className="border p-2 rounded">
              <strong>{sug.categoria}:</strong> {sug.nome}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma sugestão encontrada com os interesses informados.</p>
      )}
    </div>
  );
}
