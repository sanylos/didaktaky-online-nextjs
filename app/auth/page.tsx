"use client";
import { useEffect, useState } from "react";
import "./page.scss"
import { supabase } from "@/api";

const Auth = () => {
    const [authType, setAuthType] = useState("login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [someData, setSomeData] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (authType == "register") {
            const { data, error } = await supabase.auth.signUp({
                email: email,
                password: password,
            })
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })
            if (error) {
                console.log(error);
            } else {
                console.log(data);
            }
        }
    }

    return <div className="background d-flex flex-row justify-content-center align-items-center">
        {
            authType == "login" &&
            <div className="card w-auto">
                <h5 className="card-header">Login</h5>
                <div className="card-body">
                    <h5 className="card-title text-center fw-medium">Přihlášení do systému DIDAKTAKY-ONLINE</h5>
                    <p className="card-text fst-italic">Přihlášením získáte přístup k interním funkcím systému!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Heslo</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1"></input>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <a className="link-opacity-100-hover" onClick={() => setAuthType("register")}>Registrace</a>
                            <button type="submit" className="btn btn-primary">Přihlásit</button>
                        </div>
                    </form>
                </div>
            </div>
        }
        {
            authType == "register" &&
            <div className="card w-auto">
                <h5 className="card-header">Registrace</h5>
                <div className="card-body">
                    <h5 className="card-title text-center fw-medium">Registrace do systému DIDAKTAKY-ONLINE</h5>
                    <p className="card-text fst-italic">Registrací získáte přístup k interním funkcím systému!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Heslo</label>
                            <input type="password" className="form-control" id="exampleInputPassword1"></input>
                        </div>
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <a className="link-opacity-100-hover" onClick={() => setAuthType("login")}>Přihlášení</a>
                            <button type="submit" className="btn btn-primary">Registrovat</button>
                        </div>
                    </form>
                </div>
            </div>
        }
    </div>
}

export default Auth;