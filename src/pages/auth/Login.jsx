import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/auth/authApiSlice";
import { setCredentials } from "../../features/auth/authSlice";
import usePersist from "../../hooks/usePersist";
import { SiShopware } from "react-icons/si";
import { useStateContext } from "../../context/ContextProvider";
import { Button } from "../../components";
import MoonLoader from "react-spinners/MoonLoader";

function Login() {
    const userRef = useRef();
    const errRef = useRef();
    const { currentColor } = useStateContext();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [persist, setPersist] = usePersist();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg("");
    }, [username, password]);


    const handleUserInput = (e) => setUsername(e.target.value);
    const handlePwdInput = (e) => setPassword(e.target.value);
     const handleToggle = () => setPersist((prev) => !prev);


    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const { accessToken } = await login({ username, password }).unwrap();
            dispatch(setCredentials({ accessToken }));
            setUsername("");
            setPassword("");
            navigate("/");
        } catch (err) {
            if (!err.status) {
                setErrMsg("No server Response");
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password");
            } else if (err.status === 401) {
                setErrMsg("Unauthorized");
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    };



    const errClass = errMsg ? "bg-white text-[#F00] p-[0.25em] mb-[0.5em] inline-block" : "offscreen";



    const content = (
        <section>
            <main className="flex flex-col items-center justify-center w-full h-[100vh]">

                <h1 className="flex flex-col items-center lg:text-4xl text-2xl font-extrabold tracking-tight dark:text-white text-slate-900 my-[1em]"><SiShopware /> <span>Probiz</span></h1>
                <p className={errClass} ref={errRef} aria-live="assertive">
                    {errMsg}
                </p>
                <form className="flex [flex-flow:column_nowrap] gap-[1em] max-w-[800px] w-[60%] relative" onSubmit={handleSubmit}>
                    {isLoading && (
                        <div
                            className={`absolute inset-0 flex items-center justify-center  z-10 m-2 max-w-[800px] md:m-10 p-2 md:p-10 rounded-3xl dark:text-${currentColor} dark:bg-secondary-dark-bg`}
                        >
                            <MoonLoader color={currentColor} />
                        </div>)}
                    <label htmlFor="username" className="form__label font-semibold">Username:</label>
                    <input
                        type="text"
                        className="p-[0.5em]  rounded-[15px]"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="password" className="form__label font-semibold">Password:</label>
                    <input
                        type="password"
                        className="p-[0.5em] mb-[1rem] rounded-[15px]"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                        autoComplete="off"
                        required
                    />

                    <Button
                        color="white"
                        bgColor={currentColor}
                        text="Sign In"
                        borderRadius="10px"
                        size="lg"
                        type="submit"
                    />

                    <label htmlFor="persist" className="form__persist flex items-center w-full gap-[1rem]">
                        <input
                            type="checkbox"
                            className="w-[24px] h-[24px]"
                            id="persist"
                        onChange={handleToggle}
                        checked={persist}
                        />
                        Trust this device
                    </label>
                </form>
            </main>
        </section>
    );
    return content;
}

export default Login;
