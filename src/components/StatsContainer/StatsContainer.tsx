import React from 'react';
import PropTypes from 'prop-types';
import PokemonSprite from '../../core/PokemonSprite';
import classNames from 'classnames';
import './StatsContainer.css';

interface StatsContainerProps {
  isOpponent: boolean;
  pokemonInstance: PokemonSprite;
}

const StatsContainer: React.FC<StatsContainerProps> = ({ isOpponent, pokemonInstance }) => (
  <div className={classNames('stats-container', {
    'row-reverse': isOpponent,
    'row-original': !isOpponent
  })}>
    <div className={classNames('triangle', {
      'triangle-right': isOpponent,
      'triangle-left': !isOpponent,
    })}>&#9651;</div>
    <div className="pokemon-properties">
      <div className="pokemon-name">
        {pokemonInstance.name}
      </div>
      <div className={classNames('move-power', {
        'our-move-power': !isOpponent
      })}>
        {`${pokemonInstance.getMoveName()} ${pokemonInstance.getMovePower()}`}
      </div>
    </div>
  </div>
);

StatsContainer.propTypes = {
  pokemonInstance: PropTypes.instanceOf(PokemonSprite).isRequired,
  isOpponent: PropTypes.bool.isRequired,
};

export default StatsContainer;