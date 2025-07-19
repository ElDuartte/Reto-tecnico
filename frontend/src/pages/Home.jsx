import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POKEMONS } from '../graphql/queries';
import ProductCard from '../components/ProductCard';

function Home() {
  const { data, loading, error } = useQuery(GET_POKEMONS);

  const pokemons = data?.pokemons ?? [];

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div className="error">Error: {error.message}</div>;
  if(error)return console.error(error)

  return (
    <div className="home-page">
      <h1 className="search-container">Pokémon List</h1>

      <p className="results-count">{pokemons.length} results found</p>

      <div className="product-card__grid">
        {pokemons.map((pokemon) => (
          <ProductCard
            key={pokemon.id}
            product={{
              name: pokemon.name,
              image: pokemon.imageUrl,
              type: pokemon.types,
              hp: pokemon.hp,
              attack: pokemon.attack,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
