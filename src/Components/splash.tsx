import { useNavigate } from 'react-router-dom';
import Typewriter from './Typewriter';

const Splash = () => {
  const navigate = useNavigate(); // Initialize navigate function

  return(
    <div
  className="hero min-h-screen  bg-base-200 "
  >
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-neutral-content text-center">
    <div className="max-w-md">
      <h1 className=" text-9xl font-KolkerBrush relative top-[5px]">dojo blog</h1>
      <Typewriter/>
      <br/>
      <div className="flex flex-row gap-[8px] justify-center items-center">
        <button className="btn btn-primary" onClick={() => navigate('/signup')}>
          Sign Up
        </button>
        <button className="btn btn-primary" onClick={() => navigate('/login')}>
          Log In
        </button>
      </div>
    </div>
  </div>
</div>
  )
};

export default Splash;
