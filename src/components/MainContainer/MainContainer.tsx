import PokemonSprite from '../../core/PokemonSprite';
import { ActionLogDisplay, SpriteCard } from '..';
import { useEffect, useState } from 'react';
import { battleResultLogMap, createRandomPokemonInstance } from '../../utils/gameHelper';
import './MainContainer.css';

const MainContainer: React.FC = () => {
  const [ourPokemon, setOurPokemon] = useState<PokemonSprite | null>(null);
  const [opponentPokemon, setOpponentPokemon] = useState<PokemonSprite | null>(null);
  const [toggleState, setToggleState] = useState<boolean>(true);
  const [log, setLog] = useState<string>('');

  function handleSelectPokemon() {
    setLog('');
    setOurPokemon(null);
    setOpponentPokemon(null);
    createRandomPokemonInstance().then(instance => setOurPokemon(instance));
    createRandomPokemonInstance().then(instance => setOpponentPokemon(instance));
  }

  useEffect(() => {
    handleSelectPokemon();
  }, []);

  async function handleStartBattle() {
    if (!ourPokemon || !opponentPokemon) {
      return;
    }
    const isDraw = ourPokemon.getMovePower() === opponentPokemon.getMovePower();
    const logString = isDraw ?
      battleResultLogMap.DRAW :
      battleResultLogMap.HAS_WINNER([ourPokemon, opponentPokemon]);
    setLog(logString);
    setToggleState(true);
  }

  return (<>
    <div className="main-container">
      <div className="sprite-container">
        <SpriteCard pokemonInstance={opponentPokemon} isOpponent imageLoadCallback={() => setToggleState(false)} />
        <SpriteCard pokemonInstance={ourPokemon} imageLoadCallback={() => setToggleState(false)} />
      </div>
      <div className="title">Battle Log</div>
      <div className="control-area-container">
        <ActionLogDisplay log={log} />
        <div className="buttons-container">
          <button className="button" onClick={handleStartBattle}
            disabled={toggleState || !ourPokemon || !opponentPokemon}>Start Battle</button>
          <button className="button" onClick={handleSelectPokemon} disabled={!toggleState}>Pick Pokemon</button>
        </div>
      </div>
    </div>
  </>
  );
};

export default MainContainer;