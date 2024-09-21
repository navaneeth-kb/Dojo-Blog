import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e:any) => {
    e.preventDefault();  // Prevent form from reloading the page
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      navigate('/home', { state: { name: userCredential.user.displayName || 'User' } });
    } catch (error) {
      console.error("Error logging in: ", error);
    }
  };

  const handleGoogleLogin = async (e:any) => {
    e.preventDefault();  // Prevent form from reloading the page
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      navigate('/home', { state: { name: result.user.displayName } });
    } catch (error) {
      console.error("Error logging in with Google: ", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <br/>
          <div className="text-5xl font-KolkerBrush ">dojo blog</div>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6 flex flex-col gap-[10px]">
              <button className="btn btn-primary" onClick={handleLogin}>Login</button>
              <button className="btn btn-primary" onClick={handleGoogleLogin}>Login with Google</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
