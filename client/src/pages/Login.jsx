import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import './Login.css'; // Import the login styles

const Login = () => {
  const [formState, setFormState] = useState({ username: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({ variables: { ...formState } });
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="login-container flex-row justify-center align-items-center">
      <div className="col-12 col-md-8">
        <div className="card login-card bg-black">
          <h4 className="card-header bg-black glitch-text">Log In</h4>
          <div className="card-body">
            {data ? (
              <p className="success-message">
                Success! You may now head{' '}
                <Link className="glitch-text" to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                  required
                />
                <input
                  className="form-input"
                  placeholder="Your password"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  required
                />
                <button className="btn btn-block btn-submit" type="submit">
                  Log In
                </button>
              </form>
            )}

            {error && (
              <div className="error-message">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
