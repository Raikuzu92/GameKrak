 import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_USER, } from "../utils/queries";
import Auth from "../utils/auth";
// import GameForm from "../components/GameForm"; 
//  import GameList from "../components/GameList"; 

const Profile = () => {
  const { username: userParam } = useParams();
console.log(userParam)
  // Determine which query to run based on whether we have a username in params
  const { loading, data} = useQuery(QUERY_USER,
    { variables: { username: userParam } }
  );
  console.log(data);
  // Query for games
  // const { loading: gamesLoading, data: gameData } = useQuery(QUERY_GAMES);
  // console.log(data);
  // Retrieve the correct user and games data
  // const user = userData?.me || userData?.user || null;
  // const games = gameData?.games || [];

  // Redirect the user to their own profile if they're viewing their own page
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Handle loading states for both queries
  if (loading) {
    return (
      <div className="loading-container">
        {loading ? "Loading user data..." : "Loading games data..."}
      </div>
    );
  }

  // Check if user data was found
  // if (!user) {
  //   return (
  //     <div className="error-message">
  //       <h4>
  //         You need to be logged in to see this page. Please log in or sign up!
  //       </h4>
  //     </div>
  //   );
  // }

  return (
    <div className="profile-container">
      <div className="flex-row justify-center mb-3">
        {/* <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          {games.length > 0 ? (
            <GameList games={games} title="Your Listed Games" />
          ) : (
            <h4>No games to display</h4>
          )}
        </div> */}

        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
        </div>
      </div>
    </div>
  );
};

export default Profile;
