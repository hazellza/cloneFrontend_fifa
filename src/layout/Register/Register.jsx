import React from "react";
import { useState, useEffect } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Logo from "../../components/Logo/Logo";

const URL = "http://localhost:5000/api/customer";

function register() {
  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem("customer");
    console.log("Customer Token : ", check);
    if (check) {
      navigate("/select");
      return;
    }
  }, []);

  const showError = () => {
    document.querySelector(".not-match").classList.remove("hidden");
  };
  const delError = () => {
    document.querySelector(".not-match").classList.add("hidden");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, displayname, password, conpassword);
    if (password != conpassword) {
      showError();
    } else {
      delError();
      Swal.fire({
        title: "Register success!!",
        text: "Do you want to continue",
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/");
      });
    }
  };

  const [email, setEmail] = useState("");
  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");

  return (
    <section
      id="register-page"
      className="min-h-screen flex flex-col items-center justify-center bg-gray-100"
    >
      <div>
        <Logo></Logo>
      </div>
      <div className="translucent-bg">
        <div className="text-center mb-14 font-bold text-4xl">
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
                className="grow overflow-hidden"
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
                className="grow overflow-hidden"
                value={displayname}
                onChange={(e) => setDisplayname(e.target.value)}
                placeholder="Displayname"
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label
              htmlFor="password"
              className="input input-bordered flex item-center gap-2 w-auto"
            >
              <input
                type="password"
                id="password"
                name="password"
                className="grow overflow-hidden"
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
              className="input input-bordered flex item-center gap-2 w-auto"
            >
              <input
                type="password"
                id="con-password"
                name="con-password"
                className="grow overflow-hidden"
                value={conpassword}
                onChange={(e) => setConpassword(e.target.value)}
                placeholder="Confirm-Password"
                required
              />
            </label>
          </div>
          <div
            className="checkbox-confirm flex justify-end"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label className="label cursor-pointer gap-2 -mt-4 -mb-6">
              <span className="label text-sm">Confirm</span>
              <input type="checkbox" className="checkbox" required />
            </label>
          </div>
          <div
            className="text-right"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label className="not-match text-sx font-semibold text-red-700 hidden">
              invalid password not match
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="btn btn-neutral w-64 text-white register"
            >
              Register
            </button>
          </div>
          <div
            className="text-end"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label className="text-sm">
              Already have an account?
              <a
                href="/"
                className="font-bold ml-1 underline underline-offset-1"
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
