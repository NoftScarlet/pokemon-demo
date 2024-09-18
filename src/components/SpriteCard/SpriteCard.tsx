import React from 'react';
import PropTypes from 'prop-types';
import PokemonSprite from '../../core/PokemonSprite';
import classNames from 'classnames';
import './SpriteCard.css';
import StatsContainer from '../StatsContainer/StatsContainer';

interface SpriteCardProps {
  pokemonInstance: PokemonSprite | null;
  isOpponent?: boolean;
  imageLoadCallback?: () => void;
}

const SpriteCard: React.FC<SpriteCardProps> = ({ pokemonInstance, isOpponent = false, imageLoadCallback }) => {
  if (!pokemonInstance) {
    return <div className="sprite-card loading-text">LOADING...</div>;
  }
  return (
    <div className={classNames('sprite-card', {
      'row-reverse': isOpponent,
      'row-original': !isOpponent
    })}>
      <div className="pokemon-image">
        <img
          src={isOpponent ? pokemonInstance.frontSprite : pokemonInstance.backSprite}
          alt={pokemonInstance.name}
          onLoad={imageLoadCallback}
        />
      </div>
      <StatsContainer
        isOpponent={isOpponent}
        pokemonInstance={pokemonInstance}
      />
    </div>
  );
};

SpriteCard.propTypes = {
  pokemonInstance: PropTypes.instanceOf(PokemonSprite).isRequired,
  isOpponent: PropTypes.bool,
  imageLoadCallback: PropTypes.func,
};

export default SpriteCard;