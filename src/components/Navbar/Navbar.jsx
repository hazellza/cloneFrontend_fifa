import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const URL = "http://localhost:5000/api/customer";

function Navbar() {
  const navigate = useNavigate();
  let data = localStorage.getItem("customer");
  var customer = JSON.parse(data);
  var name = customer.customer[0].result.displayname;

  const handleClick = (e) => {
    e.preventDefault();
    fetch(URL + "/logout", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
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
        console.log("SignOut success : ", result);
        Swal.fire({
          title: "Do you want to Logout ?",
          showCancelButton: true,
          confirmButtonText: "Logout",
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.removeItem("customer");
            navigate("/");
          }
        });
      })
      .catch((e) => {
        console.log("**CATCH Error (SignOut) : ", e);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: e.message,
        });
      });
  };

  return (
    <section id="navbar">
      <div className="navbar bg-base-100 flex justify-between items-center rounded-box shadow-lg">
        <div className="flex">
          <a href="/select" className="btn btn-ghost text-2xl font-bold topic">
            Green World
          </a>
        </div>
        <div className="flex">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar mr-4"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-4 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a href="/setting">Settings</a>
              </li>
              <li>
                <a type="submit" onClick={handleClick}>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Navbar;
