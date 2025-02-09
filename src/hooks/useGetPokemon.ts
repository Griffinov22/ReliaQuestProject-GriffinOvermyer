import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: Weight;
  height: Height;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

type Weight = {
  minimum: string;
  maximum: string;
};

type Height = {
  minimum: string;
  maximum: string;
};

export const GET_POKEMON = gql`
  query pokemon($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
    }
  }
`;

export const useGetPokemon = (id: string, name: string) => {
  const { data, ...queryRes } = useQuery(GET_POKEMON, {
    variables: {
      id,
      name,
    },
  });

  const pokemon: Pokemon = useMemo(() => data?.pokemon || [], [data]);

  return {
    pokemon,
    ...queryRes,
  };
};
