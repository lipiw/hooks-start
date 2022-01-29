import React, {useEffect, useState} from "react";

export default function App() {

  const [repositories, setRepositories] = useState([])

  //useEffect recebe dois parametros, 1) oq ele ira fazer, 2) quando ele ira fazer. (array vazio representa apenas uma vez quando o componente for carregado)
  
  useEffect(async () => {
    const response = await fetch('https://api.github.com/users/lipiw/repos');
    const data = await response.json();

    setRepositories(data);
  }, []);

  useEffect(() =>{
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`
  }, [repositories]);

  function handleFavorite(id){
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <ul>
      {repositories.map(repo => (
        <li key={repo.id}>
          {repo.name}
          {repo.favorite ? <span>(Favorito)</span> : <span></span>}
          <button onClick={() => handleFavorite(repo.id)}>ADICIONAR</button>
          </li>
      ))}
    </ul>
  );
}

