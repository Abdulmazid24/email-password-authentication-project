import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../../firebase/firebase.config';

const Register = () => {
  const handleRegister = e => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
      })
      .catch(error => console.error(error));
  };
  return (
    <div className="bg-slate-300 w-screen h-screen text-center">
      <h2 className="  text-3xl font-bold py-3 ">Please Register</h2>

      <div className="bg-gray-500 rounded-lg  w-1/3 py-5 px-3 shadow-2xl border-b-2 border-white mx-auto ">
        <form onSubmit={handleRegister} className="">
          <input
            className="bg-gray-300 font-bold my-1 px-2 py-1 w-full rounded-lg hover:bg-white text-black"
            type="email"
            name="email"
            placeholder="Enter your Email"
            id=""
          />
          <br />
          <input
            className="bg-gray-300 font-bold my-1 px-2 py-1 w-full rounded-lg hover:bg-white text-black no-underline"
            type="password"
            name="password"
            placeholder="Enter your Password"
            id=""
          />
          <br />
          <input
            className="bg-purple-400 text-white font-bold my-1 px-2 py-1 w-full shadow-2xl border-b-2 border-black rounded-b-xl rounded-t-lg  hover:bg-black"
            type="submit"
            value=" Please Register"
          />
        </form>
      </div>
    </div>
  );
};

export default Register;
