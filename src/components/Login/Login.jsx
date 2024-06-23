import { signInWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';
import { IoCloseSharp, IoEyeOffSharp, IoEyeSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const Login = () => {
  const [successLogin, setSuccessLogin] = useState('');
  const [LoginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setSuccessLogin('');
    setLoginError('');

    // add validation
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSuccessLogin('Login have successfully');
      })
      .catch(error => {
        console.log(error);
        setLoginError(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-emerald-100">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi.
            <br /> In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-amber-50 text-lg font-semibold">
          <form onSubmit={handleLogin} className="card-body w-full ">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="form-control relative ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="password"
                className="input input-bordered w-full  "
                required
              />
              {
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-12 left-72   text-2xl"
                >
                  {showPassword ? (
                    <IoEyeSharp></IoEyeSharp>
                  ) : (
                    <IoEyeOffSharp></IoEyeOffSharp>
                  )}
                </span>
              }
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p>
              New to this website? Please{' '}
              <Link to="/register" className="text-violet-700 ml-2">
                Register
              </Link>
            </p>
          </form>
          <div className="text-center text-green-700 pb-3">
            {successLogin && <p>{successLogin}</p>}
          </div>
          <div className="text-center text-red-700 pb-3">
            {LoginError && <p>{LoginError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
