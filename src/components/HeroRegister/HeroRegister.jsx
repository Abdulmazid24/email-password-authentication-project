import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';

const HeroRegister = () => {
  const [heroRegisteError, setHeroRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  console.log(heroRegisteError);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    setHeroRegisterError('');
    if (password.length < 6) {
      setHeroRegisterError(
        'password should be at least 6 characters or longer'
      );
      return;
    } else if (!/[A-Z]/.test(password)) {
      setHeroRegisterError(
        'Your password should have at least one Uppercase character'
      );
      return;
    }
    setHeroRegisterError('');
    setSuccess('');
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSuccess('User Created Successfully');
      })
      .catch(error => {
        console.log(error.message);
        setHeroRegisterError(error.message);
      });
  };
  return (
    <div className="hero min-h-screen bg-slate-300 ">
      <div className=" font-bold hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi.
            <br /> In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-slate-400">
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  name="password"
                  className="input input-bordered w-full"
                  required
                />
                <span
                  className="absolute top-3 right-3 text-3xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <IoEyeSharp></IoEyeSharp>
                  ) : (
                    <IoEyeOffSharp></IoEyeOffSharp>
                  )}
                </span>
              </div>
              <br />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-violet-700 hover:bg-violet-950 text-white text-lg font-extrabold">
                Login
              </button>
            </div>
          </form>

          <div className="text-center pb-4">
            {heroRegisteError && (
              <p className="text-red-800">{heroRegisteError}</p>
            )}
            {success && <p className="text-green-700">{success}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroRegister;
