import React from "react";
import { useState, useEffect } from "react";
import { json, useNavigate } from "react-router-dom";
import "./Setting.css";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import { Email } from "@mui/icons-material";

const URL = "http://localhost:5000/api/customer";

function Setting() {
  useEffect(() => {
    const check = localStorage.getItem("customer");

    console.log("Customer Token : ", check);

    if (!check) {
      navigate("/");
      return;
    }
  });
  
  const navigate = useNavigate();
  let data = localStorage.getItem("customer");
  var customer = JSON.parse(data);
  var name = customer.customer[0].result.displayname;

  const [displayname, setDisplayname] = useState("");
  const [password, setPassword] = useState("");
  const [conpassword, setConpassword] = useState("");
  const [errorMessage, setErrormessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const pass64 = btoa(password);
    if (password !== conpassword) {
      setErrormessage("Invalid password, not match");
      document.querySelector(".icon-error").classList.remove("hidden");
    } else if (password.length < 6) {
      setErrormessage("Password must be at least 6 characters");
      document.querySelector(".icon-error").classList.remove("hidden");
    } else {
      setErrormessage("");
      document.querySelector(".icon-error").classList.add("hidden");
      console.log(displayname, pass64);
      fetch(URL + "/edit/" + customer.customer[0].result.id, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: customer.customer[0].result.email,
          uid: customer.customer[0].result.uid,
          displayname: displayname,
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
          console.log("Update Successfully : ", result);
          Swal.fire({
            title: "Update success!!",
            text: "Do you want to continue",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            localStorage.setItem("customer", JSON.stringify(result));
            location.reload();
          });
        })
        .catch((e) => {
          console.log("**CATCH Error(Setting) : ", e);
          Swal.fire({
            icon: "error",
            title: "SignUp Fail",
            text: e.message,
          });
        });
    }
  };

  return (
    <section id="setting-page" className="min-h-screen">
      <Navbar></Navbar>
      <div className="flex justify-center ">
        <div className="container-setting-form mt-10 rounded-box">
          <div className="text-center font-bold text-4xl mt-4 mb-4">
            <h1>Setting</h1>
          </div>
          <div className="flex justify-center items-center p-4 ">
            <form
              onSubmit={handleSubmit}
              className="flex justify-center flex-col items-center space-y-2"
            >
              <div className="avatar-form flex items-center space-x-6 mb-4">
                <div className="shrink-0">
                  <img
                    className="h-16 w-16 object-cover rounded-full"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1361&q=80"
                    alt="Current profile photo"
                  />
                </div>
                <label className="block">
                  <span className="sr-only">Choose profile photo</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-slate-50 file:text-neutral
                    hover:file:bg-slate-200
                    "
                  />
                </label>
              </div>
              <div className="form-group space-y-5">
                <div className="change-displayname flex items-center space-x-4">
                  <div className="w-42 font-semibold">
                    <h1>Displayname :</h1>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      id="displayname"
                      name="displayname"
                      className="grow overflow-hidden max-sm:text-sm"
                      value={displayname}
                      onChange={(e) => setDisplayname(e.target.value)}
                      placeholder={name}
                      required
                    />
                  </label>
                </div>
                <div className="change-password flex items-center space-x-4">
                  <div className="w-42 font-semibold">
                    <h1>Password :</h1>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
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
                <div className="change-con-password flex items-center space-x-4">
                  <div className="w-42 font-semibold">
                    <h1>Confirm Password :</h1>
                  </div>
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
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
              <div className="flex justify-center ">
                <button
                  type="submit"
                  className="btn btn-neutral w-64 text-white mt-6"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Setting;
