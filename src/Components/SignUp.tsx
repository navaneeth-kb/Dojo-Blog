import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; 
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(''); // State to display error messages
  const navigate = useNavigate();

  // Regex for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSignUp = async (e:any) => {
    e.preventDefault(); // Prevent page refresh
    setError(''); // Clear any previous error messages

    // Email validation
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password matching validation
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update user profile to include the display name
      if (user) {
        await updateProfile(user, { displayName: name });
      }

      // Navigate to home page and pass the name to the home component
      navigate('/home', { state: { name } });
    } catch (error:any) {
      setError(error.message);  // Display the error message returned from Firebase
    }
  };

  const handleGoogleSignUp = async (e:any) => {
    e.preventDefault(); // Prevent page refresh
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      navigate('/home', { state: { name: user.displayName || "Guest" } });  // Pass the name to Home
    } catch (error:any) {
      console.error("Error signing up with Google: ", error);
      setError(error.message);  // Display error message for Google signup
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center ">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <br/>
          <div className="text-5xl font-KolkerBrush ">dojo blog</div>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSignUp}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="input input-bordered"
              />
            </div>
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
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control mt-6 flex flex-col gap-[10px]">
              <button className="btn btn-primary" onClick={handleSignUp}>Sign Up</button>
              <button className="btn btn-primary" onClick={handleGoogleSignUp}>Sign Up with Google</button>
            </div>
            {error && <p className="text-red-500 mt-2">{error}</p>}  {/* Display error message */}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
