import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const { name, email, password, confirm } = form;

  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const nameRegex = /^[a-zA-Z\s]{2,30}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{6,}$/;

  const validate = (vals = form) => {
    const newErr = {};
    if (!nameRegex.test(vals.name.trim()))
      newErr.name = "2-30 letters (A-Z a-z) only.";
    if (!emailRegex.test(vals.email.trim())) newErr.email = "Invalid email.";
    if (!passwordRegex.test(vals.password.trim()))
      newErr.password = "Min 6 chars, include letter, number & symbol.";
    if (vals.confirm.trim() !== vals.password.trim())
      newErr.confirm = "Passwords do not match.";
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
    console.log("Submitted:", form);
    setSubmitted(true);
    // reset
    setForm({ name: "", email: "", password: "", confirm: "" });
    setErrors({});
    setShowErrors(false);
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
            Create your account
          </h1>
          <p className="text-xs text-rose-500 mt-1 mb-6">
            Join SenCart to explore more.
          </p>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-5"
          >
            <div className={fieldWrap}>
              <label htmlFor="name" className={labelCls}>
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                placeholder="Sushnak Lamichhane"
                autoComplete="name"
                className={`${baseInput} ${
                  showErrors && errors.name ? errorInput : ""
                }`}
              />
              {showErrors && errors.name && (
                <span className="text-[10px] text-red-500">{errors.name}</span>
              )}
            </div>

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
                  autoComplete="new-password"
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

            <div className={fieldWrap}>
              <label htmlFor="confirm" className={labelCls}>
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  name="confirm"
                  value={confirm}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  autoComplete="new-password"
                  type={showConfirmPwd ? "text" : "password"}
                  className={`${baseInput} pr-16 ${
                    showErrors && errors.confirm ? errorInput : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd((p) => !p)}
                  className="absolute top-1/2 -translate-y-1/2
                   right-2 text-[11px] font-semibold text-rose-600
                    hover:text-rose-700"
                >
                  {showConfirmPwd ? "Hide" : "Show"}
                </button>
              </div>
              {showErrors && errors.confirm && (
                <span className="text-[10px] text-red-500">
                  {errors.confirm}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!name || !email || !password || !confirm}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-rose-600 hover:to-pink-600 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              Sign Up
            </button>

            <div
              aria-live="polite"
              className="min-h-[18px] text-xs font-medium mt-1"
            >
              {submitted && (
                <span className="text-emerald-600">
                  Registration successful.
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/login" className="text-rose-600 hover:underline">
                Login
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

export default SignUp;
