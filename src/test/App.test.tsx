import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react';
import ActionLogDisplay from '../components/ActionLogDisplay/ActionLogDisplay';
import MainContainer from '../components/MainContainer/MainContainer';
import SpriteCard from '../components/SpriteCard/SpriteCard';
import { createRandomPokemonInstance } from '../utils/gameHelper';

jest.mock('../components/StatsContainer/StatsContainer', () => () => <div>StatsContainer</div>);

jest.mock('../utils/gameHelper', () => ({
  createRandomPokemonInstance: jest.fn(),
  battleResultLogMap: {
    DRAW: 'It\'s a draw!',
    HAS_WINNER: ([ourPokemon, opponentPokemon]) => `${ourPokemon.name} wins!`
  }
}));

const mockPokemonSpriteImg = (name, frontSprite, backSprite) => ({
  name,
  frontSprite,
  backSprite,
});

const mockPokemonSprite = (name, moveName, power) => ({
  name,
  getMovePower: () => power,
  getMoveName: () => moveName,
});

describe('ActionLogDisplay', () => {
  it('renders the log prop correctly', () => {
    const logMessage = 'test log message';
    render(<ActionLogDisplay log={logMessage} />);
    expect(screen.getByText(logMessage)).toBeInTheDocument();
  });
});

describe('MainContainer', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle "Start Battle" and update the battle log', async () => {
    createRandomPokemonInstance.mockResolvedValueOnce(mockPokemonSprite('Charizard', 'fire', 80));
    createRandomPokemonInstance.mockResolvedValueOnce(mockPokemonSprite('Pikachu', 'fire', 50));
    await act(async () => {
      render(<MainContainer />);
    });
    await act(async () => {
      fireEvent.load(screen.getAllByRole('img')[0]);
      fireEvent.load(screen.getAllByRole('img')[1]);
    });
    const startBattleButton = screen.getByText('Start Battle');
    expect(startBattleButton).not.toBeDisabled();
    await act(async () => {
      fireEvent.click(startBattleButton);
    });
    expect(screen.getByText('Charizard wins!')).toBeInTheDocument();
  });
});

describe('SpriteCard', () => {
  it('renders loading state when pokemonInstance is null', () => {
    render(<SpriteCard pokemonInstance={null} />);
    expect(screen.getByText('LOADING...')).toBeInTheDocument();
  });

  it('renders correctly when pokemonInstance is provided (opponent)', () => {
    const mockPokemon = mockPokemonSpriteImg('Charizard', 'charizard-front.png', 'charizard-back.png');
    render(<SpriteCard pokemonInstance={mockPokemon} isOpponent={true} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'charizard-front.png');
    expect(image).toHaveAttribute('alt', 'Charizard');
    expect(screen.getByText('StatsContainer')).toBeInTheDocument();
  });

  it('renders correctly when pokemonInstance is provided (player)', () => {
    const mockPokemon = mockPokemonSpriteImg('Pikachu', 'pikachu-front.png', 'pikachu-back.png');
    render(<SpriteCard pokemonInstance={mockPokemon} isOpponent={false} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'pikachu-back.png');
    expect(image).toHaveAttribute('alt', 'Pikachu');
    expect(screen.getByText('StatsContainer')).toBeInTheDocument();
  });

  it('calls imageLoadCallback when image loads', () => {
    const mockPokemon = mockPokemonSpriteImg('Bulbasaur', 'bulbasaur-front.png', 'bulbasaur-back.png');
    const mockImageLoadCallback = jest.fn();
    render(<SpriteCard pokemonInstance={mockPokemon} imageLoadCallback={mockImageLoadCallback} />);
    const image = screen.getByRole('img');
    fireEvent.load(image);
    expect(mockImageLoadCallback).toHaveBeenCalled();
  });
});