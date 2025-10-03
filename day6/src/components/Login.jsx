import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const { email, password } = form;

    const [errors, setErrors] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showPwd, setShowPwd] = useState(false);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/; // min 6 chars

    const validate = (vals = form) => {
        const newErr = {};
        if (!emailRegex.test(vals.email.trim())) newErr.email = "Invalid email.";
        if (!passwordRegex.test(vals.password.trim()))
            newErr.password = "Min 6 characters required.";
        setErrors(newErr);
        return Object.keys(newErr).length === 0;
    };

    const handleChange = (e) => {
        const { name: key, value } = e.target;
        const next = { ...form, [key]: value };
        setForm(next);
        if (showErrors) validate(next);
        setSubmitted(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowErrors(true);
        if (!validate()) return;
        console.log("Login attempt:", form);
        setSubmitted(true);
        // (perform real login here)
    };

    const baseInput =
        "w-full rounded-xl border border-rose-200 bg-white/70 backdrop-blur-sm px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-400 transition";
    const errorInput =
        "border-red-400 focus:ring-red-400 focus:border-red-400 animate-pulse";
    const labelCls = "text-xs font-medium text-rose-700 ml-1";
    const fieldWrap = "flex flex-col gap-1";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 p-4">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white/80 backdrop-blur-md rounded-3xl shadow-xl overflow-hidden border border-rose-100">
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
                        Welcome back
                    </h1>
                    <p className="text-xs text-rose-500 mt-1 mb-6">
                        Login to continue to SenCart.
                    </p>

                    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                        <div className={fieldWrap}>
                            <label htmlFor="email" className={labelCls}>
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                placeholder="mail@sushanka.com"
                                autoComplete="email"
                                className={`${baseInput} ${
                                    showErrors && errors.email ? errorInput : ""
                                }`}
                                type="email"
                            />
                            {showErrors && errors.email && (
                                <span className="text-[10px] text-red-500">{errors.email}</span>
                            )}
                        </div>

                        <div className={fieldWrap}>
                            <label htmlFor="password" className={labelCls}>
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    onChange={handleChange}
                                    placeholder="••••••"
                                    autoComplete="current-password"
                                    type={showPwd ? "text" : "password"}
                                    className={`${baseInput} pr-16 ${
                                        showErrors && errors.password ? errorInput : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPwd((p) => !p)}
                                    className="absolute top-1/2 -translate-y-1/2 right-2 text-[11px] font-semibold text-rose-600 hover:text-rose-700"
                                >
                                    {showPwd ? "Hide" : "Show"}
                                </button>
                            </div>
                            {showErrors && errors.password && (
                                <span className="text-[10px] text-red-500">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center justify-between -mt-2">
                            <label className="flex items-center gap-2 text-[11px] text-rose-700">
                                <input
                                    type="checkbox"
                                    className="accent-rose-500"
                                    onChange={()=>{}}
                                />
                                Remember me
                            </label>
                            <a
                                href="/forgot-password"
                                className="text-[11px] font-medium text-rose-600 hover:text-rose-700"
                            >
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={!email || !password}
                            className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-rose-600 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
                        >
                            Login
                        </button>

                        <div
                            aria-live="polite"
                            className="min-h-[18px] text-xs font-medium mt-1"
                        >
                            {submitted && (
                                <span className="text-emerald-600">
                                    Login successful .
                                </span>
                            )}
                        </div>

                        <p className="text-gray-600 text-sm">
                            Don't have an account?{" "}
                            <Link to="/signup" className="text-rose-600 hover:underline">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>

                <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-rose-300 via-rose-200 to-pink-200 items-center justify-center p-6">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.5),transparent)]" />
                    <img
                        src="https://cdna.iconscout.com/img/sales-banner-home-page.48dda0e.png?f=webp&w=600"
                        alt="Promo banner"
                        width={360}
                        className="relative drop-shadow-2xl select-none"
                        loading="lazy"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
