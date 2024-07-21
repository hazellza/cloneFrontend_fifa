import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectRoutes = () => {
    const [logincheck, setLoginCheck] = useState(false);

    useEffect(() => {
        const check = localStorage.getItem("customer");
        setLoginCheck(!!check);
    }, []);

    return logincheck ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectRoutes;

