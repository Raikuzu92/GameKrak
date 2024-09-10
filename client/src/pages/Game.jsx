import { useQuery } from "@apollo/client";

import GameList from "../components/MonsterList";

import { QUERY_GAMES } from "../utils/queries";
import { QUERY_SINGLE_GAME } from "../utils/queries";

const Game = () => {
  const { loading, data } = useQuery(QUERY_GAMES);
  const games = data?.games || [];

  return (
    <main>
      <div className='container d-flex justify-space-evenly flex-wrap'>
        <div className='col-12 col-md-8 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <GameList games={games} title='Witcher Monsters' />
          )}
        </div>
      </div>
    </main>
  );
};

export default Game;


// return (
//   <main>
//     <div className='flex-row justify-center'>
//       <div
//         className='col-12 col-md-10 mb-3 p-3'
//         style={{ border: "1px dotted #1a1a1a" }}
//       >
//         <MonsterForm />
//       </div>
//       <div className='col-12 col-md-8 mb-3'>
//         {loading ? (
//           <div>Loading...</div>
//         ) : (
//           <MonsterList monsters={monsters} title='Witcher Monsters' />
//         )}
//       </div>
//     </div>
//   </main>
// );