import React, { useState } from "react";
import { create, getSpecific, login } from "../../data/users";
import { invite } from "../../data/documents";

type Props = {
  callBack: any;
};

export function Login({ callBack }: Props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signInUp, setSignInUp] = useState(true);
  const [errorUser, setErrorUser] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const checkParams = async (token: string) => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("id") !== null) {
      await invite(params.get("id"), username, token);
    }
  };

  const handleErrorMessages = () => {
    let ifReturn = false;
    if (!username) {
      setErrorUser("Oops! You need to add a username.");
      ifReturn = true;
    }
    if (!password) {
      setErrorPassword("Oops! You need to add a password.");
      ifReturn = true;
    }

    if (password.length < 4) {
      setErrorPassword("Your password needs to be at least 4 characters long.");
    }

    return ifReturn;
  };

  const handleSignUp = async (event: any) => {
    event.preventDefault();

    if (handleErrorMessages()) {
      return;
    }

    let specific = await getSpecific(username);

    if (specific.length == 0) {
      let res = await create(username, password);

      await checkParams(res.token);
      callBack(res.token, res.id);
    } else {
      setErrorUser("The username is already taken.");
    }
  };

  const handleSignIn = async (event: any) => {
    event.preventDefault();
    if (handleErrorMessages()) {
      return;
    }

    let specific = await getSpecific(username);
    if (specific.length !== 0) {
      let res = await login(username, password);
      if (res) {
        await checkParams(res.token);
        callBack(res.token, specific[0]._id);
      } else {
        setErrorUser("");
        setErrorPassword("Wrong password.");
      }
    } else {
      setErrorUser("The user does not exist.");
      setErrorPassword("");
    }
  };

  return (
    <div className="w-1/4 mx-auto my-10 bg-gray-100 p-10 rounded shadow">
      {/* SIGN UP */}
      <form onSubmit={(event) => handleSignUp(event)}>
        <div className={signInUp ? "" : "hidden"}>
          <h4 className="text-lg mb-4">Sign up to JSEditor</h4>
          <label>Username</label>
          <p className={errorUser ? "text-red-600" : "hidden"}>{errorUser}</p>
          <input
            className="mb-4 p-1 mt-1 bg-gray-100 border-2 border-gray-200 w-full rounded"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label>
            Password{" "}
            <span className="text-xs text-yellow-600">
              (Must be at least 4 characters)
            </span>
          </label>
          <p className={errorPassword ? "text-red-600" : "hidden"}>
            {errorPassword}
          </p>
          <input
            className="mb-4 p-1 mt-1 bg-gray-100 border-2 border-gray-200 w-full rounded"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg p-1 pl-3 pr-3 bg-green-600 shadow w-full"
          >
            <p className="text-gray-100">Submit</p>
          </button>
          <p className="text-center mt-8 mb-2">Already a user?</p>
          <button
            type="button"
            className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow w-full"
            onClick={() => setSignInUp(!signInUp)}
          >
            <p className="text-gray-100">Login</p>
          </button>
        </div>
      </form>

      {/* LOGIN IN */}
      <form onSubmit={(event) => handleSignIn(event)}>
        <div className={signInUp ? "hidden" : ""}>
          <h4 className="text-xl mb-4">Log in</h4>
          <label>Username</label>
          <p className={errorUser ? "text-red-600" : "hidden"}>{errorUser}</p>
          <input
            className="mb-4 p-1 mt-1 bg-gray-100 border-2 border-gray-200 w-full rounded"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <label>Password</label>
          <p className={errorPassword ? "text-red-600" : "hidden"}>
            {errorPassword}
          </p>
          <input
            className="mb-4 p-1 mt-1 bg-gray-100 border-2 border-gray-200 w-full rounded"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button
            type="submit"
            className="rounded-lg p-1 pl-3 pr-3 bg-green-600 shadow w-full"
          >
            <p className="text-gray-100">Submit</p>
          </button>
          <p className="text-center mt-8 mb-2">Don't have a account yet?</p>
          <button
            type="button"
            className="rounded-lg p-1 pl-3 pr-3 bg-blue-500 shadow w-full"
            onClick={() => setSignInUp(!signInUp)}
          >
            <p className="text-gray-100">Sign up</p>
          </button>
        </div>
      </form>
    </div>
  );
}
