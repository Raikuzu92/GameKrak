import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import MonsterForm from "../components/MonsterForm";
import MonsterList from "../components/MonsterList";
import { QUERY_USER, QUERY_ME, QUERY_MONSTERS } from "../utils/queries";
import Auth from "../utils/auth";

const Profile = () => {
  const { username: userParam } = useParams();

  // Determine which query to run based on whether we have a username in params
  const { loading: userLoading, data: userData } = useQuery(
    userParam ? QUERY_USER : QUERY_ME,
    { variables: { username: userParam } }
  );
  const { loading: monstersLoading, data: monsterData } = useQuery(QUERY_MONSTERS);

  // Retrieve the correct user and monsters data
  const user = userData?.me || userData?.user || null;
  const monsters = monsterData?.monsters || [];

  // Redirect the user to their own profile if they're viewing their own page
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  // Handle loading states for both queries
  if (userLoading || monstersLoading) {
    return (
      <div className="loading-container">
        {userLoading ? "Loading user data..." : "Loading monsters data..."}
      </div>
    );
  }

  // Check if user data was found
  if (!user) {
    return (
      <div className="error-message">
        <h4>
          You need to be logged in to see this page. Please log in or sign up!
        </h4>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} profile.
        </h2>

        <div className="col-12 col-md-10 mb-5">
          {monsters.length > 0 ? (
            <MonsterList monsters={monsters} title="Witcher Monsters" />
          ) : (
            <h4>No monsters to display</h4>
          )}
        </div>

        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: "1px dotted #1a1a1a" }}
        >
          <MonsterForm />
        </div>
      </div>
    </div>
  );
};

export default Profile;
