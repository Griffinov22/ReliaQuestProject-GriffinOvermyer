import React, { MouseEventHandler, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { Navigate, Router, useNavigate } from 'react-router-dom';

export const PokemonList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { pokemons, loading } = useGetPokemons();
  const [search, setSearch] = useState<string>('');

  const handleRowClick = (id: string, name: string) => {
    return navigate(`/pokemon/${name}/${id}`);
  };

  return (
    <div className={classes.root}>
      <div className={classes.headerStyle}>
        <h1>Search List</h1>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </div>
      <table className={classes.tableStyle}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Number</th>
            <th>Types</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr className={classes.loadingRow}>
              <td colSpan={4}>Loading...</td>
            </tr>
          ) : (
            pokemons
              .filter((x) =>
                x.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((pkmn) => (
                <tr
                  key={pkmn.id}
                  className={classes.rowStyle}
                  onClick={() => handleRowClick(pkmn.id, pkmn.name)}
                >
                  <td style={{ width: '100px', aspectRatio: '1/1' }}>
                    <img
                      style={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                      }}
                      src={pkmn.image}
                      alt={pkmn.name}
                    />
                  </td>
                  <td>{pkmn.name}</td>
                  <td>{pkmn.number}</td>
                  <td>{pkmn.types.join(', ')}</td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      borderCollapse: 'collapse',
    },
    tableStyle: {
      width: '60%',
      marginInline: 'auto',
      borderCollapse: 'collapse',
      '& th': {
        backgroundColor: 'white',
        color: 'black',
        padding: '1rem',
      },
    },
    rowStyle: {
      transition: 'all 250ms ease-in-out',
      fontSize: '1.2rem',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'darkblue',
      },
    },
    loadingRow: {
      '& td': {
        padding: '3rem',
        textAlign: 'center',
      },
      fontSize: '1.2rem',
      color: 'gray',
    },
    headerStyle: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '1rem',
      '& input': {
        padding: '0.5rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        color: 'black',
      },
    },
  },
  { name: 'PokemonList' }
);
