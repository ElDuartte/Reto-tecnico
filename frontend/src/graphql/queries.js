import { gql } from '@apollo/client';

export const GET_POKEMONS = gql`
  query Pokemons {
    pokemons {
      id
      name
      imageUrl
      types
      hp
      attack
    }
  }
`;
