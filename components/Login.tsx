import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true);

  const { login, signup } = useAuth();

  async function submitHandler(): Promise<void> {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }
    if (isLoggingIn) {
      try {
        await login(email, password);
      } catch (err) {
        setError("Incorrect email or password");
      }
      return;
    }
    await signup(email, password);
  }

  return (
    <div className="flex-1 text-xs sm:text-sm flex flex-col justify-center items-center gap-2 sm:gap-4">
      <h1 className="font-extrabold select-none text-2xl sm:text-4xl uppercase">
        {isLoggingIn ? "Login" : "register"}
      </h1>
      {error && (
        <div className="select-none w-full max-w-[40ch] border-rose-400 border text-center border-solid text-rose-400 py-2">
          {error}
        </div>
      )}
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email Address"
        className="outline-none duration-300 border-b-2 border-solid border-cyan-500 focus:border-orange-600 text-slate-900 px-2 py-1 w-full max-w-[40ch]"
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="outline-none duration-300 border-b-2 border-solid border-cyan-500 focus:border-orange-600 text-slate-900 px-2 py-1 w-full max-w-[40ch]"
      />
      <button
        onClick={submitHandler}
        className="w-full max-w-[40ch] border border-white border-solid uppercase py-2 duration-300 relative
         after:absolute after:top-0 after:right-full after:bg-orange-600 after:w-full after:h-full 
         overflow-hidden hover:after:translate-x-full after:duration-300 hover:text-white"
      >
        <h2 className="relative z-10 duration-200 hover:scale-110">SUBMIT</h2>
      </button>
      <h2
        className="duration-300 hover:scale-110 cursor-pointer underline"
        onClick={() => setIsLoggingIn(!isLoggingIn)}
      >
        {!isLoggingIn ? "Login" : "Register"}
      </h2>
    </div>
  );
}
