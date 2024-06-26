import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from 'firebase/auth';
import auth from '../../firebase/firebase.config';
import { useRef, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { IoEyeOffSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const HeroRegister = () => {
  const [heroRegisteError, setHeroRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  console.log(heroRegisteError);
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);

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

        if (result.user.emailVerified) {
          setSuccess('User Created Successfully');
        } else {
          alert('Please verify your email address');
        }

        // send varification email:
        sendEmailVerification(result.user).then(() => {
          alert('Please Check your email or varify your account');
        });
      })
      .catch(error => {
        console.log(error.message);
        setHeroRegisterError(error.message);
      });
  };

  const handleResetPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      console.log('Please provider an  email', emailRef.current.value);
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      console.log('please write a valid email');
      return;
    }
    // send validation email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('please check your email');
      })
      .catch(error => {
        console.log(error);
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
                ref={emailRef}
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
                <a
                  onClick={handleResetPassword}
                  href="#"
                  className="label-text-alt link link-hover"
                >
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
          <div className="text-center">
            <p>
              Already have an account?
              <Link to="/login" className="text-yellow-300 ml-2">
                Login
              </Link>
            </p>
          </div>
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
