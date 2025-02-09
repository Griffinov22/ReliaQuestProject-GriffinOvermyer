import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Slide,
} from '@material-ui/core';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { forwardRef, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';

const PokemonModal = () => {
  const classes = useStyles();
  const { id, name } = useParams<{ id?: string; name?: string }>();
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const { pokemon, loading } = useGetPokemon(id || '', name || '');

  return (
    <Dialog
      open={open}
      className={classes.root}
      TransitionComponent={Transition}
      onClose={() => {
        // note the exit animation happens in the 'Transition' component below
        setOpen(false);
      }}
    >
      <div className={classes.header}>
        <DialogTitle>{name}</DialogTitle>
        {!loading && (
          <img
            src={pokemon?.image}
            alt={name}
            style={{ width: '100px', height: '100px' }}
          />
        )}
      </div>
      <DialogContent>
        {loading ? (
          <DialogContentText>Loading...</DialogContentText>
        ) : (
          <List className={classes.list}>
            <ListItem>Weight Minimum: {pokemon.weight.minimum}</ListItem>
            <ListItem>Weight Maximum: {pokemon.weight.maximum}</ListItem>
            <ListItem>Height Minimum: {pokemon.height.minimum}</ListItem>
            <ListItem>Height Maximum: {pokemon.height.maximum}</ListItem>
            <ListItem>Classification: {pokemon.classification}</ListItem>
            <ListItem>Types: {pokemon.types.join(', ')}</ListItem>
            <ListItem>Resistant: {pokemon.resistant.join(', ')}</ListItem>
            <ListItem>Weaknesses: {pokemon.weaknesses.join(', ')}</ListItem>
            <ListItem>Flee Rate: {pokemon.fleeRate}%</ListItem>
            <ListItem>Max CP: {pokemon.maxCP}</ListItem>
            <ListItem>Max HP: {pokemon.maxHP}</ListItem>
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default PokemonModal;

const useStyles = createUseStyles(
  {
    root: {
      '& .MuiDialog-paper': {
        minWidth: '400px',
        minHeight: '400px',
      },
      '& .MuiTypography-h6': {
        color: 'black',
        fontSize: '2rem',
      },
      '& .MuiListItem-root': {
        color: 'black',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingInline: '1rem',
      paddingTop: '1rem',
    },
    list: {
      width: '100%',
    },
  },
  { name: 'PokemonModal' }
);

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  const navigate = useNavigate();
  return (
    <Slide direction="up" ref={ref} {...props} onExited={() => navigate(-1)} />
  );
});
