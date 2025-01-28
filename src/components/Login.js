import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { getDatabase, ref, child, set, get } from "firebase/database";

const Login = ({ onLogin }) => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      onLogin(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setError('Name is required');
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await createUserInDatabase(user);
      onLogin(user);
    } catch (error) {
      setError(error.message);
    }
  };

  const createUserInDatabase = async (user) => {
    if (email === 'rsank001@gold.ac.uk') return;

    const db = getDatabase();
    const readersRef = ref(db, 'readers');

    try {
      const snapshot = await get(ref(db, 'readers'));
      const readers = snapshot.val() || {};
      const numReaders = Object.keys(readers).length;
      const newReaderKey = `reader${numReaders + 1}`;
      const newReaderData = {
        email,
        name,
        booksTaken: ["no-book-new-user"]
      };

      await set(child(readersRef, newReaderKey), newReaderData);
      console.log('User added successfully!');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <div className={`login_container ${isSignUpMode ? 'sign-up-mode' : ''}`}>
        <div className="forms-container">
          <div className="signin-signup">
            <form onSubmit={handleLoginSubmit} className="sign-in-form">
              <h2 className="title">Sign in</h2>
              {error && <div className="error-message">{error}</div>}
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn solid">Sign in</button>
            </form>

            <form onSubmit={handleSignupSubmit} className="sign-up-form">
              <h2 className="title">Sign up</h2>
              {error && <div className="error-message">{error}</div>}
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input 
                  type="text" 
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required 
                />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input 
                  type="email" 
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input 
                  type="password" 
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </div>
              <button type="submit" className="btn solid">Sign up</button>
            </form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>New here?</h3>
              <p>Join our library community and discover a world of books at your fingertips!</p>
              <button 
                className="btn transparent" 
                onClick={() => setIsSignUpMode(true)}
              >
                Sign up
              </button>
            </div>
            <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" className="image" alt="" />
          </div>

          <div className="panel right-panel">
            <div className="content">
              <h3>One of us?</h3>
              <p>Welcome back! Sign in to access your library account and continue your reading journey.</p>
              <button 
                className="btn transparent" 
                onClick={() => setIsSignUpMode(false)}
              >
                Sign in
              </button>
            </div>
            <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/register.svg" className="image" alt="" />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="mobile-nav">
          <button onClick={() => setIsSignUpMode(!isSignUpMode)}>
            {isSignUpMode ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;