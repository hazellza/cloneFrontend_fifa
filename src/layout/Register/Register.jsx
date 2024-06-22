import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";

const URL = "http://localhost:5000/api/customer";

function register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  useEffect(() => {
    const check = localStorage.getItem("customer");
    console.log("Customer Token : ", check);
    if (check) {
      navigate("/select");
      return;
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const pass64 = btoa(password);

    console.log("fetch : ", email, displayname);
    if (password !== conpassword) {
      setErrormessage("Invalid password, not match");
      document.querySelector('.icon-error').classList.remove('hidden')
    } else if (password.length < 6) {
      setErrormessage("Password must be at least 6 characters");
      document.querySelector('.icon-error').classList.remove('hidden')
    } else {
      setErrormessage("");
      document.querySelector('.icon-error').classList.add('hidden')
      fetch(URL + "/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          displayname: displayname,
          email: email,
          password: pass64,
        }),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return res.text().then((text) => {
            throw new Error(text);
          });
        })
        .then((result) => {
          console.log("SignUp success : ", result);
          Swal.fire({
            title: "Register success!!",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/");
          });
        })
        .catch((e) => {
          console.log("**CATCH Error(SignUp) : ", e);
          Swal.fire({
            icon: "error",
            title: "SignUp Fail",
            text: e.message,
          });
        });
    }
  };

  return (
    <section
      id="register-page"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div>
        <Logo></Logo>
      </div>
      <div className="translucent-bg">
        <div className="text-center mb-10 font-bold text-4xl">
          <h1>Register</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 mb-8">
          <div className="form-group">
            <label
              htmlFor="email"
              className="input input-bordered flex item-center gap-2 w-auto"
            >
              <input
                type="email"
                id="email"
                name="email"
                className="grow overflow-hidden max-sm:text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email ( user@email.com )"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label
              htmlFor="displayname"
              className="input input-bordered flex item-center gap-2 w-auto"
            >
              <input
                type="text"
                id="displayname"
                name="displayname"
                className="grow overflow-hidden max-sm:text-sm"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
                placeholder="Displayname"
                required
              />
            </label>
          </div>
          <div className="space-y-6 max-sm:flex max-sm:justify-center max-sm:items-center max-sm:space-y-0 max-sm:gap-1">
            <div className="form-group">
              <label
                htmlFor="password"
                className="input input-bordered flex item-center gap-2 w-auto max-sm:w-36"
              >
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="grow overflow-hidden max-sm:text-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </label>
            </div>
            <div className="form-group">
              <label
                htmlFor="con-password"
                className="input input-bordered flex item-center gap-2 w-auto max-sm:w-36"
              >
                <input
                  type="password"
                  id="con-password"
                  name="con-password"
                  className="grow overflow-hidden max-sm:text-sm"
                  value={conpassword}
                  onChange={(e) => setConpassword(e.target.value)}
                  placeholder="Con-Password"
                  required
                />
              </label>
            </div>
          </div>
          <div className="checkbox-confirm flex justify-end">
            <label className="label cursor-pointer gap-2 -mt-4 -mb-6">
              <span className="label text-sm">Confirm</span>
              <input type="checkbox" className="checkbox" required />
            </label>
          </div>
          <div className="grid justify-items-end -mb-10">
            <label className="not-match flex items-center gap-1 text-sm font-semibold text-red-700 max-sm:text-xs ">
              {errorMessage}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-error stroke-current shrink-0 h-6 w-6 opacity-70 hidden"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-neutral w-64 text-white register max-sm:w-36 max-lg:w-44 max-xl:w-56"
            >
              Register
            </button>
          </div>
          <div className="text-center">
            <label className="text-sm max-sm:text-xs">
              Already have an account?
              <a
                href="/"
                className="font-bold ml-1 underline underline-offset-1 max-sm:text-sm"
              >
                Sign in
              </a>
            </label>
          </div>
        </form>
      </div>
    </section>
  );
}

export default register;
