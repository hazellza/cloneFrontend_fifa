import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import Navbar from "../../components/Navbar/Navbar";

import "./History.css";
function History() {
  const navigate = useNavigate();

  useEffect(() => {
    const check = localStorage.getItem("customer");
    console.log("Customer Token : ", check);
    if (!check) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <section id="history-page" className="min-h-screen">
      <Navbar></Navbar>
      <div className="mt-40">
        <Calendar></Calendar>
      </div>
    </section>
  );
}

export default History;
