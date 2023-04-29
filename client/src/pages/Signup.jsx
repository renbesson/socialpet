import { toast } from "react-toastify";
import { useAuth } from "../utils/authProvider";
import { Link, Navigate, useNavigate } from "react-router-dom";

export default function SignIn() {
  const { user, fetchPet } = useAuth();
  const navigate = useNavigate();

  ////////////////////////////////////////////////////////////////////////////////
  // Function for signing in
  ////////////////////////////////////////////////////////////////////////////////
  const handleSignin = async (event) => {
    event.preventDefault();

    try {
      const form = new FormData(event.currentTarget);

      const res = await fetch("/api/auth/signup/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("new-password"),
          type: form.get("type"),
          species: form.get("species"),
        }),
      });
      const { message } = await res.json();

      if (res.status === 404) return toast("Wrong Email!");
      if (res.status === 401) return toast("Wrong Password!");
      if (!res.ok) return toast(`Message: ${message} | Code: ${res.status}`);
      if (res.status === 201) {
        // Saves user state

        await fetchPet();
        toast(`Welcome back!`);

        navigate("/", { replace: true });
      }
    } catch (err) {
      console.error(err);
      toast(err.message);
    }
  };

  return user ? (
    <Navigate to="/" />
  ) : (
    <div
      className="bg-no-repeat bg-cover bg-center relative"
      style={{
        backgroundImage: "url(/assets/images/signup.jpeg)",
      }}
    >
      <div className="h-[calc(100vh-64px)] sm:flex sm:flex-row mx-0 justify-center">
        <div className="flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10">
          <div className="self-start hidden lg:flex flex-col  text-white">
            <img src="" className="mb-3" />
            <h1 className="mb-3 font-bold text-5xl">Welcome!</h1>
          </div>
        </div>
        <div className="flex justify-center self-center  z-10">
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title font-semibold text-2xl text-gray-800">Sign Up</h2>
              <form className="form-control w-full max-w-xs gap-2" onSubmit={handleSignin}>
                <div>
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Eg: Bubbaloo"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Eg: bestpet@socialpet.ca"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    id="new-password"
                    name="new-password"
                    autoComplete="new-password"
                    type="password"
                    required
                    minLength="8"
                    placeholder="Type you password"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <input
                    autoComplete="type"
                    id="type"
                    name="type"
                    type="text"
                    required
                    placeholder="Eg: Dog"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div>
                  <label className="label">
                    <span className="label-text">Species</span>
                  </label>
                  <input
                    id="species"
                    name="species"
                    type="text"
                    required
                    placeholder="Eg: Chihuahua"
                    className="input input-bordered w-full max-w-xs"
                  />
                </div>

                <div className="flex justify-between text-sm">
                  <a href="#" className="text-green-400 hover:text-green-500">
                    Forgot your password?
                  </a>
                  <Link to="/signin" className="text-pink-400 hover:text-pink-500">
                    Have an account?
                  </Link>
                </div>

                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
