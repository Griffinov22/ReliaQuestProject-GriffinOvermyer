import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonList } from '../components';
import { Outlet } from 'react-router-dom';

export const ListPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PokemonList />
      <Outlet />
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      height: '100%',
    },
  },
  { name: 'ListPage' }
);
