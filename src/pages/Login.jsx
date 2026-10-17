
// // // import { useState } from "react";
// // // import {
// // //   LockKeyhole,
// // //   UserRound,
// // //   Eye,
// // //   EyeOff,
// // // } from "lucide-react";

// // // export default function Login({ onLogin }) {
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [show, setShow] = useState(false);
// // //   const [error, setError] = useState("");

// // //   function submit(e) {
// // //     e.preventDefault();

// // //     if (!username.trim() || !password.trim()) {
// // //       setError("Please enter username and password.");
// // //       return;
// // //     }

// // //     setError("");
// // //     onLogin();
// // //   }

// // //   function cancelLogin() {
// // //     setUsername("");
// // //     setPassword("");
// // //     setError("");
// // //   }

// // //   function exitLogin() {
// // //     const confirmExit = window.confirm(
// // //       "Are you sure you want to exit?"
// // //     );

// // //     if (confirmExit) {
// // //       window.close();
// // //     }
// // //   }

// // //   return (
// // //     <main className="login-page">

// // //       <div className="login-card">

// // //         {/* =====================================================
// // //             LEFT IMAGE
// // //         ====================================================== */}

// // //         <div className="login-image-panel">
// // //           <img
// // //             src="/images/login-art.jpg"
// // //             alt="School login"
// // //             className="login-image"
// // //             onError={(e) => {
// // //               e.currentTarget.style.display = "none";
// // //             }}
// // //           />
// // //         </div>

// // //         {/* =====================================================
// // //             RIGHT BLUE PANEL
// // //         ====================================================== */}

// // //         <div className="login-blue-panel">

// // //           {/* TITLE */}

// // //           <div className="login-title-area">
// // //             <h1>USER LOGIN</h1>
// // //           </div>

// // //           {/* =================================================
// // //               LOGIN FORM
// // //           ================================================== */}

// // //           <div className="login-form-curve">

// // //             <form
// // //               onSubmit={submit}
// // //               className="login-form"
// // //             >

// // //               {/* USERNAME */}

// // //               <div className="login-input">
// // //                 <UserRound
// // //                   size={24}
// // //                   strokeWidth={1.7}
// // //                   className="login-input-icon"
// // //                 />

// // //                 <input
// // //                   type="text"
// // //                   value={username}
// // //                   onChange={(e) =>
// // //                     setUsername(e.target.value)
// // //                   }
// // //                   placeholder="User Name"
// // //                   autoComplete="username"
// // //                 />
// // //               </div>

// // //               {/* PASSWORD */}

// // //               <div className="login-input password-input">

// // //                 <LockKeyhole
// // //                   size={23}
// // //                   strokeWidth={1.8}
// // //                   className="login-input-icon"
// // //                 />

// // //                 <input
// // //                   type={
// // //                     show
// // //                       ? "text"
// // //                       : "password"
// // //                   }
// // //                   value={password}
// // //                   onChange={(e) =>
// // //                     setPassword(e.target.value)
// // //                   }
// // //                   placeholder="Password"
// // //                   autoComplete="current-password"
// // //                 />

// // //                 <button
// // //                   type="button"
// // //                   className="password-toggle"
// // //                   onClick={() =>
// // //                     setShow(!show)
// // //                   }
// // //                 >
// // //                   {show ? (
// // //                     <EyeOff size={17} />
// // //                   ) : (
// // //                     <Eye size={17} />
// // //                   )}
// // //                 </button>

// // //               </div>

// // //               {/* ERROR */}

// // //               {error && (
// // //                 <div className="login-error">
// // //                   {error}
// // //                 </div>
// // //               )}

// // //               {/* BUTTONS */}

// // //               <div className="login-buttons">

// // //                 <button
// // //                   type="submit"
// // //                   className="login-btn login-btn-login"
// // //                 >
// // //                   LOGIN
// // //                 </button>

// // //                 <button
// // //                   type="button"
// // //                   onClick={cancelLogin}
// // //                   className="login-btn login-btn-cancel"
// // //                 >
// // //                   CANCEL
// // //                 </button>

// // //                 <button
// // //                   type="button"
// // //                   onClick={exitLogin}
// // //                   className="login-btn login-btn-exit"
// // //                 >
// // //                   EXIT
// // //                 </button>

// // //               </div>

// // //             </form>

// // //           </div>

// // //           {/* VERSION */}

// // //           <div className="login-version">
// // //             Version : 2025 : H 1.0.3
// // //           </div>

// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           RESPONSIVE CSS
// // //       ====================================================== */}

// // //       <style>{`

// // //         * {
// // //           box-sizing: border-box;
// // //         }

// // //         /* =====================================================
// // //            PAGE
// // //         ====================================================== */

// // //         .login-page {
// // //           min-height: 100vh;
// // //           width: 100%;

// // //           background: #F8FAFC;

// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;

// // //           padding: 30px;

// // //           overflow-x: hidden;

// // //           font-family:
// // //             Arial,
// // //             Helvetica,
// // //             sans-serif;
// // //         }

// // //         /* =====================================================
// // //            DESKTOP CARD
// // //         ====================================================== */

// // //         .login-card {
// // //           width: 760px;
// // //           height: 500px;

// // //           max-width: 94vw;

// // //           position: relative;

// // //           display: flex;

// // //           overflow: hidden;

// // //           border-radius: 20px;

// // //           background: #073B73;

// // //           border:
// // //             3px solid
// // //             rgba(216, 174, 69, 0.65);

// // //           box-shadow:
// // //             0 15px 35px
// // //             rgba(5, 42, 82, 0.22),

// // //             0 3px 10px
// // //             rgba(0, 0, 0, 0.12);
// // //         }

// // //         /* =====================================================
// // //            IMAGE
// // //         ====================================================== */

// // //         .login-image-panel {
// // //           width: 50%;
// // //           height: 100%;

// // //           flex-shrink: 0;

// // //           position: relative;

// // //           overflow: hidden;

// // //           background: #073B73;
// // //         }

// // //         .login-image {
// // //           width: 100%;
// // //           height: 100%;

// // //           display: block;

// // //           object-fit: cover;

// // //           object-position: center;
// // //         }

// // //         /* =====================================================
// // //            BLUE PANEL
// // //         ====================================================== */

// // //         .login-blue-panel {
// // //           width: 50%;
// // //           height: 100%;

// // //           flex-shrink: 0;

// // //           position: relative;

// // //           background:
// // //             linear-gradient(
// // //               145deg,
// // //               #073B73 0%,
// // //               #052A52 100%
// // //             );
// // //         }

// // //         /* =====================================================
// // //            TITLE
// // //         ====================================================== */

// // //         .login-title-area {
// // //           height: 135px;

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;

// // //           padding-left: 45px;
// // //         }

// // //         .login-title-area h1 {
// // //           margin: 0;

// // //           color: #FFF3D6;

// // //           font-family:
// // //             Georgia,
// // //             "Times New Roman",
// // //             serif;

// // //           font-size: 27px;

// // //           font-weight: 700;

// // //           letter-spacing: 0.5px;
// // //         }

// // //         /* =====================================================
// // //            DESKTOP WHITE FORM
// // //         ====================================================== */

// // //         .login-form-curve {
// // //           position: absolute;

// // //           z-index: 5;

// // //           left: -82px;

// // //           top: 135px;

// // //           width: 450px;

// // //           height: 285px;

// // //           background: #FFFFFF;

// // //           border-radius:
// // //             150px 0 0 150px;

// // //           border:
// // //             7px solid #D8AE45;

// // //           box-shadow:
// // //             0 5px 15px
// // //             rgba(5, 42, 82, 0.16);

// // //           padding-left: 105px;

// // //           padding-right: 35px;

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;
// // //         }

// // //         /* =====================================================
// // //            FORM
// // //         ====================================================== */

// // //         .login-form {
// // //           width: 100%;

// // //           display: flex;

// // //           flex-direction: column;

// // //           align-items: center;
// // //         }

// // //         /* =====================================================
// // //            INPUT
// // //         ====================================================== */

// // //         .login-input {
// // //           width: 100%;

// // //           height: 50px;

// // //           border-radius: 28px;

// // //           background:
// // //             linear-gradient(
// // //               145deg,
// // //               #F8FAFC,
// // //               #E9EEF3
// // //             );

// // //           border:
// // //             1px solid #CBD5E1;

// // //           box-shadow:
// // //             inset 2px 2px 5px
// // //             rgba(0, 0, 0, 0.07),

// // //             inset -2px -2px 4px
// // //             rgba(255, 255, 255, 0.9);

// // //           display: flex;

// // //           align-items: center;

// // //           padding: 0 15px;

// // //           margin-bottom: 17px;
// // //         }

// // //         .login-input-icon {
// // //           flex-shrink: 0;

// // //           margin-right: 10px;

// // //           color: #073B73;
// // //         }

// // //         .login-input input {
// // //           width: 100%;

// // //           min-width: 0;

// // //           border: none;

// // //           outline: none;

// // //           background: transparent;

// // //           font-size: 14px;

// // //           color: #1E293B;

// // //           font-family:
// // //             Arial,
// // //             Helvetica,
// // //             sans-serif;
// // //         }

// // //         .login-input input::placeholder {
// // //           color: #64748B;
// // //         }

// // //         /* =====================================================
// // //            PASSWORD
// // //         ====================================================== */

// // //         .password-input {
// // //           margin-bottom: 23px;

// // //           padding-right: 13px;
// // //         }

// // //         .password-toggle {
// // //           flex-shrink: 0;

// // //           border: none;

// // //           background: transparent;

// // //           padding: 4px;

// // //           cursor: pointer;

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;

// // //           color: #64748B;
// // //         }

// // //         .password-toggle:hover {
// // //           color: #073B73;
// // //         }

// // //         /* =====================================================
// // //            ERROR
// // //         ====================================================== */

// // //         .login-error {
// // //           width: 100%;

// // //           color: #B91C1C;

// // //           font-size: 11px;

// // //           margin-top: -12px;

// // //           margin-bottom: 10px;

// // //           text-align: center;
// // //         }

// // //         /* =====================================================
// // //            BUTTONS
// // //         ====================================================== */

// // //         .login-buttons {
// // //           width: 100%;

// // //           display: flex;

// // //           align-items: center;

// // //           justify-content: center;

// // //           gap: 8px;
// // //         }

// // //         .login-btn {
// // //           height: 43px;

// // //           border: none;

// // //           border-radius: 10px;

// // //           cursor: pointer;

// // //           color: #FFFFFF;

// // //           font-weight: 700;

// // //           font-size: 13px;

// // //           padding:
// // //             0 12px;

// // //           white-space: nowrap;

// // //           transition:
// // //             transform 0.2s ease,
// // //             filter 0.2s ease;
// // //         }

// // //         .login-btn:hover {
// // //           transform:
// // //             translateY(-2px);

// // //           filter:
// // //             brightness(1.08);
// // //         }

// // //         .login-btn:active {
// // //           transform:
// // //             translateY(0);
// // //         }

// // //         /* LOGIN */

// // //         .login-btn-login {
// // //           min-width: 78px;

// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #073B73,
// // //               #0A5CA8
// // //             );

// // //           box-shadow:
// // //             0 4px 9px
// // //             rgba(7, 59, 115, 0.30);
// // //         }

// // //         /* CANCEL */

// // //         .login-btn-cancel {
// // //           min-width: 82px;

// // //           color: #073B73;

// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #FFF3D6,
// // //               #D8AE45
// // //             );

// // //           box-shadow:
// // //             0 4px 9px
// // //             rgba(216, 174, 69, 0.30);
// // //         }

// // //         /* EXIT */

// // //         .login-btn-exit {
// // //           min-width: 70px;

// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #052A52,
// // //               #073B73
// // //             );

// // //           box-shadow:
// // //             0 4px 9px
// // //             rgba(5, 42, 82, 0.30);
// // //         }

// // //         /* =====================================================
// // //            VERSION
// // //         ====================================================== */

// // //         .login-version {
// // //           position: absolute;

// // //           right: 30px;

// // //           bottom: 22px;

// // //           color: #FFF3D6;

// // //           font-size: 12px;

// // //           font-weight: 500;
// // //         }

// // //         /* =====================================================
// // //            TABLET
// // //         ====================================================== */

// // //         @media (max-width: 760px) {

// // //           .login-page {
// // //             padding: 20px;
// // //           }

// // //           .login-card {
// // //             width: 680px;

// // //             max-width: 100%;

// // //             height: 470px;
// // //           }

// // //           .login-form-curve {
// // //             left: -70px;

// // //             width: 410px;

// // //             padding-left: 90px;
// // //           }

// // //         }

// // //         /* =====================================================
// // //            MOBILE
// // //         ====================================================== */

// // //         @media (max-width: 600px) {

// // //           .login-page {
// // //             min-height: 100vh;

// // //             width: 100%;

// // //             padding: 12px;

// // //             display: flex;

// // //             align-items: flex-start;

// // //             justify-content: center;

// // //             overflow-y: auto;

// // //             overflow-x: hidden;
// // //           }

// // //           /* -------------------------------------------------
// // //              CARD
// // //           ------------------------------------------------- */

// // //           .login-card {
// // //             width: 100%;

// // //             max-width: 430px;

// // //             height: auto;

// // //             min-height: 0;

// // //             display: flex;

// // //             flex-direction: column;

// // //             overflow: visible;

// // //             border-radius: 18px;

// // //             margin:
// // //               10px 0 20px;
// // //           }

// // //           /* -------------------------------------------------
// // //              IMAGE
// // //           ------------------------------------------------- */

// // //           .login-image-panel {
// // //             width: 100%;

// // //             height: 220px;

// // //             flex-shrink: 0;

// // //             border-radius:
// // //               15px 15px 0 0;
// // //           }

// // //           .login-image {
// // //             width: 100%;

// // //             height: 100%;

// // //             object-fit: cover;

// // //             object-position: center;
// // //           }

// // //           /* -------------------------------------------------
// // //              BLUE SECTION
// // //           ------------------------------------------------- */

// // //           .login-blue-panel {
// // //             width: 100%;

// // //             height: auto;

// // //             min-height: 390px;

// // //             flex-shrink: 0;

// // //             border-radius:
// // //               0 0 15px 15px;

// // //             padding-bottom: 25px;

// // //             display: flex;

// // //             flex-direction: column;

// // //             align-items: center;
// // //           }

// // //           /* -------------------------------------------------
// // //              TITLE
// // //           ------------------------------------------------- */

// // //           .login-title-area {
// // //             width: 100%;

// // //             height: 78px;

// // //             padding: 0;

// // //             display: flex;

// // //             align-items: center;

// // //             justify-content: center;
// // //           }

// // //           .login-title-area h1 {
// // //             font-size: 23px;

// // //             letter-spacing: 0.4px;
// // //           }

// // //           /* -------------------------------------------------
// // //              FORM CARD
// // //           ------------------------------------------------- */

// // //           .login-form-curve {
// // //             position: relative;

// // //             left: auto;

// // //             top: auto;

// // //             z-index: 2;

// // //             width: calc(100% - 28px);

// // //             height: auto;

// // //             min-height: 270px;

// // //             margin:
// // //               0 14px;

// // //             background: #FFFFFF;

// // //             border-radius: 24px;

// // //             border:
// // //               5px solid #D8AE45;

// // //             padding:
// // //               25px 20px;

// // //             display: flex;

// // //             align-items: center;

// // //             justify-content: center;

// // //             box-shadow:
// // //               0 7px 18px
// // //               rgba(5, 42, 82, 0.20);
// // //           }

// // //           /* -------------------------------------------------
// // //              FORM
// // //           ------------------------------------------------- */

// // //           .login-form {
// // //             width: 100%;

// // //             max-width: 360px;
// // //           }

// // //           /* -------------------------------------------------
// // //              INPUT
// // //           ------------------------------------------------- */

// // //           .login-input {
// // //             width: 100%;

// // //             height: 48px;

// // //             margin-bottom: 14px;

// // //             padding:
// // //               0 13px;
// // //           }

// // //           .login-input-icon {
// // //             width: 21px;

// // //             height: 21px;

// // //             margin-right: 8px;
// // //           }

// // //           .login-input input {
// // //             min-width: 0;

// // //             font-size: 14px;
// // //           }

// // //           .password-input {
// // //             margin-bottom: 20px;
// // //           }

// // //           /* -------------------------------------------------
// // //              ERROR
// // //           ------------------------------------------------- */

// // //           .login-error {
// // //             font-size: 11px;

// // //             margin-top: -8px;

// // //             margin-bottom: 10px;

// // //             line-height: 1.4;
// // //           }

// // //           /* -------------------------------------------------
// // //              BUTTONS
// // //           ------------------------------------------------- */

// // //           .login-buttons {
// // //             width: 100%;

// // //             gap: 7px;

// // //             display: flex;

// // //             flex-wrap: nowrap;
// // //           }

// // //           .login-btn {
// // //             flex: 1;

// // //             min-width: 0 !important;

// // //             width: 33.33%;

// // //             height: 42px;

// // //             padding:
// // //               0 5px;

// // //             border-radius: 9px;

// // //             font-size: 11px;
// // //           }

// // //           /* -------------------------------------------------
// // //              VERSION
// // //           ------------------------------------------------- */

// // //           .login-version {
// // //             display: none;
// // //           }
// // //         }

// // //         /* =====================================================
// // //            SMALL PHONES
// // //         ====================================================== */

// // //         @media (max-width: 400px) {

// // //           .login-page {
// // //             padding: 8px;
// // //           }

// // //           .login-card {
// // //             max-width: 100%;

// // //             margin-top: 5px;
// // //           }

// // //           .login-image-panel {
// // //             height: 190px;
// // //           }

// // //           .login-blue-panel {
// // //             min-height: 370px;

// // //             padding-bottom: 20px;
// // //           }

// // //           .login-title-area {
// // //             height: 70px;
// // //           }

// // //           .login-title-area h1 {
// // //             font-size: 21px;
// // //           }

// // //           .login-form-curve {
// // //             width: calc(100% - 20px);

// // //             margin:
// // //               0 10px;

// // //             min-height: 260px;

// // //             padding:
// // //               20px 15px;

// // //             border-width: 4px;

// // //             border-radius: 21px;
// // //           }

// // //           .login-input {
// // //             height: 46px;

// // //             padding:
// // //               0 11px;

// // //             margin-bottom: 12px;
// // //           }

// // //           .login-input input {
// // //             font-size: 13px;
// // //           }

// // //           .login-input-icon {
// // //             width: 19px;

// // //             height: 19px;
// // //           }

// // //           .password-toggle {
// // //             padding: 3px;
// // //           }

// // //           .login-buttons {
// // //             gap: 5px;
// // //           }

// // //           .login-btn {
// // //             height: 40px;

// // //             font-size: 10px;

// // //             padding:
// // //               0 3px;
// // //           }
// // //         }

// // //         /* =====================================================
// // //            VERY SMALL PHONES
// // //         ====================================================== */

// // //         @media (max-width: 340px) {

// // //           .login-image-panel {
// // //             height: 165px;
// // //           }

// // //           .login-blue-panel {
// // //             min-height: 350px;
// // //           }

// // //           .login-title-area {
// // //             height: 65px;
// // //           }

// // //           .login-title-area h1 {
// // //             font-size: 19px;
// // //           }

// // //           .login-form-curve {
// // //             width: calc(100% - 16px);

// // //             margin:
// // //               0 8px;

// // //             padding:
// // //               18px 12px;

// // //             min-height: 250px;
// // //           }

// // //           .login-input {
// // //             height: 44px;
// // //           }

// // //           .login-input input {
// // //             font-size: 12px;
// // //           }

// // //           .login-btn {
// // //             height: 38px;

// // //             font-size: 9px;
// // //           }
// // //         }

// // //       `}</style>
// // //     </main>
// // //   );
// // // }
// // // import { useState } from "react";

// // // import {
// // //   LockKeyhole,
// // //   UserRound,
// // //   Eye,
// // //   EyeOff,
// // //   LogIn,
// // //   X,
// // //   GraduationCap,
// // // } from "lucide-react";

// // // export default function Login({ onLogin }) {
// // //   const [username, setUsername] = useState("");
// // //   const [password, setPassword] = useState("");
// // //   const [show, setShow] = useState(false);
// // //   const [error, setError] = useState("");

// // //   function submit(e) {
// // //     e.preventDefault();

// // //     if (!username.trim() || !password.trim()) {
// // //       setError("Please enter username and password.");
// // //       return;
// // //     }

// // //     setError("");
// // //     onLogin();
// // //   }

// // //   function cancelLogin() {
// // //     setUsername("");
// // //     setPassword("");
// // //     setError("");
// // //   }

// // //   function exitLogin() {
// // //     const confirmExit = window.confirm(
// // //       "Are you sure you want to exit?"
// // //     );

// // //     if (confirmExit) {
// // //       window.close();
// // //     }
// // //   }

// // //   return (
// // //     <main className="login-page">
// // //       {/* =====================================================
// // //           CENTER LOGIN CARD
// // //       ====================================================== */}
// // //       <div className="login-card">

// // //         {/* BACKGROUND IMAGE */}
// // //         <img
// // //           src="/images/login-art.jpg"
// // //           alt="School login"
// // //           className="login-background"
// // //           onError={(e) => {
// // //             e.currentTarget.style.display = "none";
// // //           }}
// // //         />

// // //         {/* DARK GRADIENT OVERLAY */}
// // //         <div className="login-overlay"></div>

// // //         {/* =================================================
// // //             LEFT LOGIN FORM
// // //         ================================================== */}
// // //         <div className="login-content">

// // //           {/* GRADUATION CAP */}
// // //           <div className="login-logo">
// // //             <GraduationCap
// // //               size={45}
// // //               strokeWidth={1.7}
// // //             />
// // //           </div>

// // //           {/* TITLE */}
// // //           <div className="login-heading">
// // //             <h1>School Management</h1>

// // //             <p>Login to your account</p>

// // //             <div className="heading-line">
// // //               <span></span>
// // //               <i></i>
// // //               <span></span>
// // //             </div>
// // //           </div>

// // //           {/* =================================================
// // //               LOGIN FORM
// // //           ================================================== */}
// // //           <form
// // //             onSubmit={submit}
// // //             className="login-form"
// // //           >

// // //             {/* USERNAME */}
// // //             <div className="login-input">

// // //               <UserRound
// // //                 size={19}
// // //                 strokeWidth={1.8}
// // //                 className="login-input-icon"
// // //               />

// // //               <input
// // //                 type="text"
// // //                 value={username}
// // //                 onChange={(e) =>
// // //                   setUsername(e.target.value)
// // //                 }
// // //                 placeholder="Username"
// // //                 autoComplete="username"
// // //               />

// // //             </div>

// // //             {/* PASSWORD */}
// // //             <div className="login-input password-input">

// // //               <LockKeyhole
// // //                 size={19}
// // //                 strokeWidth={1.8}
// // //                 className="login-input-icon"
// // //               />

// // //               <input
// // //                 type={show ? "text" : "password"}
// // //                 value={password}
// // //                 onChange={(e) =>
// // //                   setPassword(e.target.value)
// // //                 }
// // //                 placeholder="Password"
// // //                 autoComplete="current-password"
// // //               />

// // //               <button
// // //                 type="button"
// // //                 className="password-toggle"
// // //                 onClick={() =>
// // //                   setShow(!show)
// // //                 }
// // //                 aria-label={
// // //                   show
// // //                     ? "Hide password"
// // //                     : "Show password"
// // //                 }
// // //               >
// // //                 {show ? (
// // //                   <EyeOff size={17} />
// // //                 ) : (
// // //                   <Eye size={17} />
// // //                 )}
// // //               </button>

// // //             </div>

// // //             {/* ERROR */}
// // //             {error && (
// // //               <div className="login-error">
// // //                 {error}
// // //               </div>
// // //             )}

// // //             {/* =================================================
// // //                 BUTTONS
// // //             ================================================== */}
// // //             <div className="login-buttons">

// // //               {/* LOGIN */}
// // //               <button
// // //                 type="submit"
// // //                 className="login-btn login-btn-login"
// // //               >
// // //                 <LogIn size={16} />
// // //                 <span>LOGIN</span>
// // //               </button>

// // //               {/* CANCEL */}
// // //               <button
// // //                 type="button"
// // //                 onClick={cancelLogin}
// // //                 className="login-btn login-btn-cancel"
// // //               >
// // //                 <X size={16} />
// // //                 <span>CANCEL</span>
// // //               </button>

// // //             </div>

// // //           </form>

// // //           {/* VERSION */}
// // //           <div className="login-version">
// // //             Version : 2025 : H 1.0.3
// // //           </div>

// // //         </div>
// // //       </div>

// // //       {/* =====================================================
// // //           CSS
// // //       ====================================================== */}

// // //       <style>{`

// // //         * {
// // //           box-sizing: border-box;
// // //         }

// // //         /* =====================================================
// // //            PAGE
// // //         ====================================================== */

// // //         .login-page {
// // //           min-height: 100vh;
// // //           width: 100%;

// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;

// // //           padding: 25px;

// // //           background:
// // //             radial-gradient(
// // //               circle at center,
// // //               rgba(8, 28, 75, 0.15),
// // //               rgba(2, 8, 25, 0.55)
// // //             ),
// // //             #020817;


// // //           font-family:
// // //             Arial,
// // //             Helvetica,
// // //             sans-serif;

// // //           overflow: hidden;
// // //         }


// // //         /* =====================================================
// // //            MAIN CARD
// // //         ====================================================== */

// // //         .login-card {
// // //           position: relative;

// // //           width: 760px;
// // //           height: 500px;

// // //           max-width: 94vw;
// // //           max-height: 90vh;

// // //           overflow: hidden;

// // //           border-radius: 23px;

// // //           background: #06143d;

// // //           border: 1px solid
// // //             rgba(65, 215, 255, 0.95);

// // //           box-shadow:
// // //             0 0 10px
// // //               rgba(0, 190, 255, 0.8),

// // //             0 0 30px
// // //               rgba(0, 110, 255, 0.55),

// // //             0 0 70px
// // //               rgba(0, 80, 255, 0.25),

// // //             inset 0 0 25px
// // //               rgba(0, 180, 255, 0.08);
// // //         }


// // //         /* =====================================================
// // //            BACKGROUND IMAGE
// // //         ====================================================== */

// // //         .login-background {
// // //           position: absolute;

// // //           inset: 0;

// // //           width: 100%;
// // //           height: 100%;

// // //           object-fit: cover;

// // //           object-position: center;

// // //           z-index: 0;
// // //         }


// // //         /* =====================================================
// // //            OVERLAY
// // //         ====================================================== */

// // //         .login-overlay {
// // //           position: absolute;

// // //           inset: 0;

// // //           z-index: 1;

// // //           background:
// // //             linear-gradient(
// // //               90deg,
// // //               rgba(1, 7, 30, 0.88) 0%,
// // //               rgba(2, 10, 42, 0.72) 30%,
// // //               rgba(2, 12, 48, 0.25) 58%,
// // //               rgba(2, 8, 35, 0.05) 100%
// // //             );
// // //         }


// // //         /* =====================================================
// // //            LOGIN CONTENT
// // //         ====================================================== */

// // //         .login-content {
// // //           position: relative;

// // //           z-index: 5;

// // //           width: 330px;
// // //           height: 100%;

// // //           display: flex;
// // //           flex-direction: column;

// // //           justify-content: center;
// // //           align-items: center;

// // //           padding: 25px 30px;
// // //         }


// // //         /* =====================================================
// // //            GRADUATION CAP
// // //         ====================================================== */

// // //         .login-logo {
// // //           width: 48px;
// // //           height: 48px;

// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;

// // //           margin-bottom: 3px;

// // //           color: #ffd43b;

// // //           filter:
// // //             drop-shadow(
// // //               0 0 6px
// // //               rgba(255, 212, 59, 0.9)
// // //             );
// // //         }


// // //         /* =====================================================
// // //            HEADING
// // //         ====================================================== */

// // //         .login-heading {
// // //           width: 100%;

// // //           text-align: center;

// // //           margin-bottom: 15px;
// // //         }


// // //         .login-heading h1 {
// // //           margin: 0;

// // //           color: #ffffff;

// // //           font-family:
// // //             Georgia,
// // //             "Times New Roman",
// // //             serif;

// // //           font-size: 23px;

// // //           font-weight: 700;

// // //           line-height: 1.2;

// // //           letter-spacing: 0.3px;

// // //           white-space: nowrap;

// // //           text-shadow:
// // //             0 0 10px
// // //             rgba(60, 210, 255, 0.35);
// // //         }


// // //         .login-heading p {
// // //           margin: 6px 0 0;

// // //           color: #c7e4ff;

// // //           font-size: 12px;
// // //         }


// // //         /* =====================================================
// // //            HEADING LINE
// // //         ====================================================== */

// // //         .heading-line {
// // //           display: flex;

// // //           align-items: center;
// // //           justify-content: center;

// // //           gap: 7px;

// // //           margin-top: 9px;
// // //         }


// // //         .heading-line span {
// // //           width: 42px;
// // //           height: 2px;

// // //           background:
// // //             linear-gradient(
// // //               90deg,
// // //               transparent,
// // //               #ffd43b
// // //             );

// // //           box-shadow:
// // //             0 0 6px
// // //             rgba(255, 212, 59, 0.8);
// // //         }


// // //         .heading-line span:last-child {
// // //           background:
// // //             linear-gradient(
// // //               90deg,
// // //               #ffd43b,
// // //               transparent
// // //             );
// // //         }


// // //         .heading-line i {
// // //           width: 6px;
// // //           height: 6px;

// // //           border-radius: 50%;

// // //           background: #ffd43b;

// // //           box-shadow:
// // //             0 0 7px
// // //             rgba(255, 212, 59, 1);
// // //         }


// // //         /* =====================================================
// // //            FORM
// // //         ====================================================== */

// // //         .login-form {
// // //           width: 100%;

// // //           display: flex;

// // //           flex-direction: column;

// // //           align-items: center;
// // //         }


// // //         /* =====================================================
// // //            INPUT
// // //         ====================================================== */

// // //         .login-input {
// // //           width: 100%;
// // //           height: 43px;

// // //           display: flex;
// // //           align-items: center;

// // //           padding: 0 12px;

// // //           margin-bottom: 11px;

// // //           border-radius: 23px;

// // //           background:
// // //             rgba(3, 17, 58, 0.82);

// // //           border:
// // //             1px solid
// // //             rgba(22, 135, 255, 0.95);

// // //           box-shadow:
// // //             0 0 6px
// // //               rgba(0, 110, 255, 0.55),

// // //             inset 0 0 9px
// // //               rgba(0, 80, 190, 0.2);

// // //           transition:
// // //             border-color 0.25s ease,
// // //             box-shadow 0.25s ease,
// // //             transform 0.2s ease;
// // //         }


// // //         .login-input:focus-within {
// // //           border-color: #27dcff;

// // //           box-shadow:
// // //             0 0 8px
// // //               rgba(37, 220, 255, 0.85),

// // //             0 0 17px
// // //               rgba(0, 130, 255, 0.45),

// // //             inset 0 0 10px
// // //               rgba(0, 150, 255, 0.15);

// // //           transform:
// // //             translateY(-1px);
// // //         }


// // //         .login-input-icon {
// // //           flex-shrink: 0;

// // //           margin-right: 8px;

// // //           color: #ffd43b;

// // //           filter:
// // //             drop-shadow(
// // //               0 0 4px
// // //               rgba(255, 212, 59, 0.55)
// // //             );
// // //         }


// // //         .login-input input {
// // //           width: 100%;
// // //           min-width: 0;

// // //           border: none;
// // //           outline: none;

// // //           background: transparent;

// // //           color: #ffffff;

// // //           font-size: 12px;

// // //           font-family:
// // //             Arial,
// // //             Helvetica,
// // //             sans-serif;
// // //         }


// // //         .login-input input::placeholder {
// // //           color: #a9c6e7;
// // //         }


// // //         /* =====================================================
// // //            AUTOFILL
// // //         ====================================================== */

// // //         .login-input input:-webkit-autofill,
// // //         .login-input input:-webkit-autofill:hover,
// // //         .login-input input:-webkit-autofill:focus {
// // //           -webkit-text-fill-color: #ffffff;

// // //           -webkit-box-shadow:
// // //             0 0 0 1000px
// // //             rgba(3, 17, 58, 0.95)
// // //             inset;

// // //           transition:
// // //             background-color
// // //             9999s
// // //             ease-in-out
// // //             0s;
// // //         }


// // //         /* =====================================================
// // //            PASSWORD
// // //         ====================================================== */

// // //         .password-input {
// // //           margin-bottom: 14px;
// // //         }


// // //         .password-toggle {
// // //           flex-shrink: 0;

// // //           display: flex;
// // //           align-items: center;
// // //           justify-content: center;

// // //           border: none;

// // //           background: transparent;

// // //           color: #c7e4ff;

// // //           padding: 4px;

// // //           cursor: pointer;

// // //           transition:
// // //             color 0.2s ease,
// // //             transform 0.2s ease;
// // //         }


// // //         .password-toggle:hover {
// // //           color: #28dcff;

// // //           transform:
// // //             scale(1.08);
// // //         }


// // //         /* =====================================================
// // //            ERROR
// // //         ====================================================== */

// // //         .login-error {
// // //           width: 100%;

// // //           margin-top: -2px;

// // //           margin-bottom: 9px;

// // //           padding: 6px 9px;

// // //           text-align: center;

// // //           border-radius: 7px;

// // //           color: #ffbcbc;

// // //           background:
// // //             rgba(180, 20, 45, 0.28);

// // //           border:
// // //             1px solid
// // //             rgba(255, 80, 100, 0.5);

// // //           font-size: 10px;

// // //           line-height: 1.3;
// // //         }


// // //         /* =====================================================
// // //            BUTTON AREA
// // //         ====================================================== */

// // //         .login-buttons {
// // //           width: 100%;

// // //           display: flex;

// // //           align-items: center;
// // //           justify-content: center;

// // //           gap: 8px;

// // //           margin-top: 3px;
// // //         }


// // //         /* =====================================================
// // //            BUTTON
// // //         ====================================================== */

// // //         .login-btn {
// // //           flex: 1;

// // //           height: 39px;

// // //           display: flex;

// // //           align-items: center;
// // //           justify-content: center;

// // //           gap: 6px;

// // //           border-radius: 10px;

// // //           cursor: pointer;

// // //           font-size: 11px;

// // //           font-weight: 700;

// // //           letter-spacing: 0.4px;

// // //           transition:
// // //             transform 0.2s ease,
// // //             box-shadow 0.2s ease,
// // //             filter 0.2s ease;
// // //         }


// // //         .login-btn:hover {
// // //           transform:
// // //             translateY(-2px);

// // //           filter:
// // //             brightness(1.08);
// // //         }


// // //         .login-btn:active {
// // //           transform:
// // //             translateY(0);
// // //         }


// // //         /* =====================================================
// // //            LOGIN
// // //         ====================================================== */

// // //         .login-btn-login {
// // //           color: #ffffff;

// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #126cff,
// // //               #00cfff
// // //             );

// // //           border:
// // //             1px solid
// // //             #42e8ff;

// // //           box-shadow:
// // //             0 0 6px
// // //               rgba(0, 191, 255, 0.8),

// // //             0 0 14px
// // //               rgba(0, 112, 255, 0.4);
// // //         }


// // //         .login-btn-login:hover {
// // //           box-shadow:
// // //             0 0 10px
// // //               rgba(0, 225, 255, 1),

// // //             0 0 20px
// // //               rgba(0, 130, 255, 0.6);
// // //         }


// // //         /* =====================================================
// // //            CANCEL
// // //         ====================================================== */

// // //         .login-btn-cancel {
// // //           color: #fff6c9;

// // //           background:
// // //             rgba(7, 22, 60, 0.88);

// // //           border:
// // //             1px solid
// // //             #ffd43b;

// // //           box-shadow:
// // //             0 0 6px
// // //               rgba(255, 212, 59, 0.6),

// // //             inset 0 0 8px
// // //               rgba(255, 190, 20, 0.08);
// // //         }


// // //         .login-btn-cancel:hover {
// // //           color: #ffffff;

// // //           background:
// // //             linear-gradient(
// // //               135deg,
// // //               #5f4700,
// // //               #967300
// // //             );

// // //           box-shadow:
// // //             0 0 9px
// // //               rgba(255, 212, 59, 0.9),

// // //             0 0 18px
// // //               rgba(255, 180, 20, 0.4);
// // //         }


// // //         /* =====================================================
// // //            VERSION
// // //         ====================================================== */

// // //         .login-version {
// // //           margin-top: 10px;

// // //           color: #b9d4f3;

// // //           font-size: 9px;

// // //           text-align: center;

// // //           letter-spacing: 0.2px;

// // //           opacity: 0.9;
// // //         }


// // //         /* =====================================================
// // //            TABLET
// // //         ====================================================== */

// // //         @media (max-width: 760px) {

// // //           .login-page {
// // //             padding: 20px;
// // //           }


// // //           .login-card {
// // //             width: 700px;

// // //             max-width: 96vw;

// // //             height: 480px;
// // //           }


// // //           .login-content {
// // //             width: 320px;

// // //             padding:
// // //               24px 27px;
// // //           }


// // //           .login-heading h1 {
// // //             font-size: 22px;
// // //           }

// // //         }


// // //         /* =====================================================
// // //            MOBILE
// // //         ====================================================== */

// // //         @media (max-width: 600px) {

// // //           .login-page {
// // //             min-height: 100vh;

// // //             padding: 12px;

// // //             align-items: center;
// // //             justify-content: center;

// // //             overflow-y: auto;
// // //             overflow-x: hidden;
// // //           }


// // //           .login-card {
// // //             width: 100%;

// // //             max-width: 390px;

// // //             height: 590px;

// // //             max-height: none;

// // //             border-radius: 19px;
// // //           }


// // //           .login-background {
// // //             object-position: center;
// // //           }


// // //           .login-overlay {
// // //             background:
// // //               linear-gradient(
// // //                 180deg,
// // //                 rgba(2, 8, 30, 0.18) 0%,
// // //                 rgba(2, 8, 30, 0.35) 28%,
// // //                 rgba(2, 8, 30, 0.78) 52%,
// // //                 rgba(2, 8, 30, 0.95) 100%
// // //               );
// // //           }


// // //           .login-content {
// // //             width: 100%;
// // //             height: 100%;

// // //             justify-content: center;

// // //             padding:
// // //               25px 22px;
// // //           }


// // //           .login-logo {
// // //             width: 45px;
// // //             height: 45px;

// // //             margin-bottom: 2px;
// // //           }


// // //           .login-heading {
// // //             margin-bottom: 15px;
// // //           }


// // //           .login-heading h1 {
// // //             font-size: 22px;

// // //             white-space: normal;
// // //           }


// // //           .login-heading p {
// // //             font-size: 11px;
// // //           }


// // //           .login-form {
// // //             width: 100%;

// // //             max-width: 320px;
// // //           }


// // //           .login-input {
// // //             height: 43px;

// // //             padding:
// // //               0 12px;

// // //             margin-bottom: 11px;
// // //           }


// // //           .login-input input {
// // //             font-size: 12px;
// // //           }


// // //           .login-buttons {
// // //             gap: 8px;
// // //           }


// // //           .login-btn {
// // //             height: 39px;

// // //             font-size: 10px;
// // //           }


// // //           .login-version {
// // //             margin-top: 9px;

// // //             font-size: 8px;
// // //           }
// // //         }


// // //         /* =====================================================
// // //            SMALL PHONES
// // //         ====================================================== */

// // //         @media (max-width: 400px) {

// // //           .login-page {
// // //             padding: 9px;
// // //           }


// // //           .login-card {
// // //             width: 100%;

// // //             max-width: 360px;

// // //             height: 560px;

// // //             border-radius: 17px;
// // //           }


// // //           .login-content {
// // //             padding:
// // //               20px 17px;
// // //           }


// // //           .login-logo {
// // //             width: 42px;
// // //             height: 42px;
// // //           }


// // //           .login-heading {
// // //             margin-bottom: 13px;
// // //           }


// // //           .login-heading h1 {
// // //             font-size: 20px;
// // //           }


// // //           .login-heading p {
// // //             font-size: 10px;
// // //           }


// // //           .heading-line {
// // //             margin-top: 8px;
// // //           }


// // //           .heading-line span {
// // //             width: 36px;
// // //           }


// // //           .login-input {
// // //             height: 42px;

// // //             padding:
// // //               0 11px;
// // //           }


// // //           .login-input-icon {
// // //             width: 18px;
// // //             height: 18px;

// // //             margin-right: 8px;
// // //           }


// // //           .login-input input {
// // //             font-size: 12px;
// // //           }


// // //           .login-buttons {
// // //             gap: 7px;
// // //           }


// // //           .login-btn {
// // //             height: 38px;

// // //             font-size: 10px;
// // //           }


// // //           .login-version {
// // //             font-size: 8px;
// // //           }
// // //         }


// // //         /* =====================================================
// // //            VERY SMALL PHONES
// // //         ====================================================== */

// // //         @media (max-width: 340px) {

// // //           .login-page {
// // //             padding: 7px;
// // //           }


// // //           .login-card {
// // //             height: 530px;

// // //             border-radius: 15px;
// // //           }


// // //           .login-content {
// // //             padding:
// // //               18px 13px;
// // //           }


// // //           .login-logo {
// // //             width: 39px;
// // //             height: 39px;
// // //           }


// // //           .login-heading h1 {
// // //             font-size: 18px;
// // //           }


// // //           .login-heading p {
// // //             font-size: 10px;
// // //           }


// // //           .login-input {
// // //             height: 40px;

// // //             margin-bottom: 10px;
// // //           }


// // //           .login-input input {
// // //             font-size: 11px;
// // //           }


// // //           .login-buttons {
// // //             gap: 6px;
// // //           }


// // //           .login-btn {
// // //             height: 37px;

// // //             font-size: 9px;
// // //           }


// // //           .login-version {
// // //             font-size: 7px;
// // //           }
// // //         }

// // //       `}</style>
// // //     </main>
// // //   );
// // // }


// // import { useState } from "react";

// // import {
// //   LockKeyhole,
// //   UserRound,
// //   Eye,
// //   EyeOff,
// //   LogIn,
// //   X,
// //   GraduationCap,
// // } from "lucide-react";

// // export default function Login({ onLogin }) {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const [show, setShow] = useState(false);
// //   const [error, setError] = useState("");

// //   // =========================
// //   // SAME LOGIN LOGIC
// //   // =========================
// //   function submit(e) {
// //     e.preventDefault();

// //     if (!username.trim() || !password.trim()) {
// //       setError("Please enter username and password.");
// //       return;
// //     }

// //     setError("");
// //     onLogin();
// //   }

// //   function cancelLogin() {
// //     setUsername("");
// //     setPassword("");
// //     setError("");
// //   }

// //   function exitLogin() {
// //     const confirmExit = window.confirm(
// //       "Are you sure you want to exit?"
// //     );

// //     if (confirmExit) {
// //       window.close();
// //     }
// //   }

// //   return (
// //     <main className="login-page">

// //       {/* =====================================================
// //           DARK BLUE FULL SCREEN BACKGROUND
// //       ====================================================== */}
// //       <div className="login-background">

// //         <img
// //           src="/images/login-background.png"
// //           alt="School background"
// //           className="school-illustration"
// //         />

// //         {/* =================================================
// //             LOGIN FORM
// //             Positioned over the books, below the cap
// //         ================================================== */}
// //         <div className="login-card">

// //           {/* SCHOOL ICON */}
// //           <div className="login-logo">
// //             <GraduationCap
// //               size={34}
// //               strokeWidth={2.4}
// //             />
// //           </div>

// //           {/* TITLE */}
// //           <div className="login-heading">
// //             <h1>School Portal</h1>
// //             <p>Login to your account</p>
// //           </div>

// //           {/* DECORATIVE LINE */}
// //           <div className="heading-line">
// //             <span></span>
// //             <i></i>
// //             <span></span>
// //           </div>

// //           {/* =================================================
// //               FORM
// //           ================================================== */}
// //           <form
// //             onSubmit={submit}
// //             className="login-form"
// //           >

// //             {/* USERNAME */}
// //             <div className="login-input">

// //               <UserRound
// //                 size={17}
// //                 strokeWidth={2}
// //                 className="input-icon"
// //               />

// //               <input
// //                 type="text"
// //                 value={username}
// //                 onChange={(e) =>
// //                   setUsername(e.target.value)
// //                 }
// //                 placeholder="Username"
// //                 autoComplete="username"
// //               />

// //             </div>

// //             {/* PASSWORD */}
// //             <div className="login-input">

// //               <LockKeyhole
// //                 size={17}
// //                 strokeWidth={2}
// //                 className="input-icon"
// //               />

// //               <input
// //                 type={show ? "text" : "password"}
// //                 value={password}
// //                 onChange={(e) =>
// //                   setPassword(e.target.value)
// //                 }
// //                 placeholder="Password"
// //                 autoComplete="current-password"
// //               />

// //               <button
// //                 type="button"
// //                 className="password-toggle"
// //                 onClick={() => setShow(!show)}
// //                 aria-label={
// //                   show
// //                     ? "Hide password"
// //                     : "Show password"
// //                 }
// //               >
// //                 {show ? (
// //                   <EyeOff size={16} />
// //                 ) : (
// //                   <Eye size={16} />
// //                 )}
// //               </button>

// //             </div>

// //             {/* ERROR */}
// //             {error && (
// //               <div className="login-error">
// //                 {error}
// //               </div>
// //             )}

// //             {/* BUTTONS */}
// //             <div className="login-buttons">

// //               {/* LOGIN */}
// //               <button
// //                 type="submit"
// //                 className="login-btn login"
// //               >
// //                 <LogIn size={14} />
// //                 LOGIN
// //               </button>

// //               {/* CANCEL */}
// //               <button
// //                 type="button"
// //                 onClick={cancelLogin}
// //                 className="login-btn cancel"
// //               >
// //                 <X size={14} />
// //                 CANCEL
// //               </button>

// //             </div>

// //           </form>

// //           {/* VERSION */}
// //           <div className="login-version">
// //             Version : 2025 : H 1.0.3
// //           </div>

// //           {/* EXIT */}
// //           <button
// //             type="button"
// //             onClick={exitLogin}
// //             className="login-exit"
// //           >
// //             Exit
// //           </button>

// //         </div>
// //       </div>

// //       <style>{`

// //         * {
// //           box-sizing: border-box;
// //         }

// //         /* =====================================================
// //            FULL SCREEN
// //         ====================================================== */

// //         .login-page {
// //           width: 100%;
// //           height: 100vh;

// //           min-height: 600px;

// //           overflow: hidden;

// //           background: #061a3a;

// //           font-family:
// //             Arial,
// //             Helvetica,
// //             sans-serif;
// //         }


// //         /* =====================================================
// //            BACKGROUND
// //         ====================================================== */

// //         .login-background {
// //           position: relative;

// //           width: 100%;
// //           height: 100%;

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           overflow: hidden;

// //           background:
// //             #061a3a;
// //         }


// //         /* =====================================================
// //            SCHOOL IMAGE

// //            IMPORTANT:
// //            Image is NOT full-screen.
// //            It remains smaller in the center so the
// //            dark-blue background is visible around it.
// //         ====================================================== */

// //         .school-illustration {
// //   position: absolute;
// //   inset: 0;

// //   width: 100%;
// //   height: 100%;

// //   object-fit: cover;
// //   object-position: center;

// //   z-index: 1;
// // }


// //         /* =====================================================
// //            LOGIN CARD

// //            Positioned in the middle of the books.

// //            The cap remains ABOVE the card.
// //         ====================================================== */

// //         .login-card {
// //           position: absolute;

// //           z-index: 5;

// //           left: 50%;

// //           top: 59%;

// //           transform:
// //             translate(-50%, -50%);

// //           width: 310px;

// //           min-height: 370px;

// //           padding:
// //             22px 27px 18px;

// //           display: flex;

// //           flex-direction: column;

// //           align-items: center;

// //           justify-content: center;

// //           background:
// //             rgba(255, 255, 255, 0.98);

// //           border:
// //             1px solid rgba(255, 255, 255, 0.95);

// //           border-radius: 22px;

// //           box-shadow:
// //             0 20px 45px
// //               rgba(0, 0, 0, 0.32),

// //             0 5px 15px
// //               rgba(0, 0, 0, 0.18);
// //         }


// //         /* =====================================================
// //            LOGO
// //         ====================================================== */

// //         .login-logo {
// //           width: 44px;

// //           height: 44px;

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           border-radius: 50%;

// //           color: #0b2a52;

// //           background:
// //             #edf4fb;

// //           border:
// //             2px solid #0b2a52;

// //           margin-bottom: 5px;
// //         }


// //         /* =====================================================
// //            TITLE
// //         ====================================================== */

// //         .login-heading {
// //           width: 100%;

// //           text-align: center;
// //         }


// //         .login-heading h1 {
// //           margin: 0;

// //           color: #0b2a52;

// //           font-family:
// //             Georgia,
// //             "Times New Roman",
// //             serif;

// //           font-size: 25px;

// //           font-weight: 800;

// //           line-height: 1.2;
// //         }


// //         .login-heading p {
// //           margin:
// //             5px 0 0;

// //           color: #68788a;

// //           font-size: 10px;

// //           font-weight: 500;
// //         }


// //         /* =====================================================
// //            DECORATIVE LINE
// //         ====================================================== */

// //         .heading-line {
// //           width: 100%;

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           gap: 7px;

// //           margin-top: 9px;

// //           margin-bottom: 15px;
// //         }


// //         .heading-line span {
// //           width: 38px;

// //           height: 1px;

// //           background: #aab8c7;
// //         }


// //         .heading-line i {
// //           width: 6px;

// //           height: 6px;

// //           border-radius: 50%;

// //           background: #ed3b68;
// //         }


// //         /* =====================================================
// //            FORM
// //         ====================================================== */

// //         .login-form {
// //           width: 100%;

// //           display: flex;

// //           flex-direction: column;

// //           align-items: center;
// //         }


// //         /* =====================================================
// //            INPUT BOX
// //         ====================================================== */

// //         .login-input {
// //           width: 100%;

// //           height: 43px;

// //           display: flex;

// //           align-items: center;

// //           padding:
// //             0 11px;

// //           margin-bottom: 10px;

// //           background: #ffffff;

// //           border:
// //             1px solid #315f8c;

// //           border-radius: 7px;

// //           box-shadow:
// //             0 2px 5px
// //               rgba(6, 26, 58, 0.08);

// //           transition:
// //             border-color 0.2s ease,
// //             box-shadow 0.2s ease;
// //         }


// //         .login-input:focus-within {
// //           border-color: #0b2a52;

// //           box-shadow:
// //             0 0 0 2px
// //               rgba(11, 42, 82, 0.10);
// //         }


// //         .input-icon {
// //           flex-shrink: 0;

// //           color: #0b2a52;

// //           margin-right: 8px;
// //         }


// //         .login-input input {
// //           width: 100%;

// //           min-width: 0;

// //           border: none;

// //           outline: none;

// //           background: transparent;

// //           color: #17202a;

// //           font-size: 11px;
// //         }


// //         .login-input input::placeholder {
// //           color: #7b8794;
// //         }


// //         /* =====================================================
// //            PASSWORD EYE
// //         ====================================================== */

// //         .password-toggle {
// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           flex-shrink: 0;

// //           padding: 4px;

// //           border: none;

// //           background: transparent;

// //           color: #536b82;

// //           cursor: pointer;
// //         }


// //         .password-toggle:hover {
// //           color: #0b2a52;
// //         }


// //         /* =====================================================
// //            ERROR
// //         ====================================================== */

// //         .login-error {
// //           width: 100%;

// //           margin:
// //             -2px 0 8px;

// //           padding:
// //             6px 8px;

// //           text-align: center;

// //           color: #b4233f;

// //           background: #fff0f3;

// //           border:
// //             1px solid #efbcc8;

// //           border-radius: 6px;

// //           font-size: 9px;
// //         }


// //         /* =====================================================
// //            BUTTONS
// //         ====================================================== */

// //         .login-buttons {
// //           width: 100%;

// //           display: flex;

// //           gap: 8px;

// //           margin-top: 5px;
// //         }


// //         .login-btn {
// //           flex: 1;

// //           height: 39px;

// //           display: flex;

// //           align-items: center;

// //           justify-content: center;

// //           gap: 5px;

// //           border-radius: 7px;

// //           cursor: pointer;

// //           font-size: 9px;

// //           font-weight: 800;

// //           transition:
// //             transform 0.2s ease,
// //             box-shadow 0.2s ease;
// //         }


// //         .login-btn:hover {
// //           transform:
// //             translateY(-1px);
// //         }


// //         .login-btn:active {
// //           transform:
// //             scale(0.98);
// //         }


// //         /* =====================================================
// //            LOGIN BUTTON
// //         ====================================================== */

// //         .login-btn.login {
// //           color: white;

// //           background: #e83c68;

// //           border:
// //             1px solid #d72f5b;

// //           box-shadow:
// //             0 4px 10px
// //               rgba(232, 60, 104, 0.25);
// //         }


// //         .login-btn.login:hover {
// //           background: #d92f5b;

// //           box-shadow:
// //             0 6px 14px
// //               rgba(232, 60, 104, 0.30);
// //         }


// //         /* =====================================================
// //            CANCEL BUTTON
// //         ====================================================== */

// //         .login-btn.cancel {
// //           color: #173b5c;

// //           background: #edf2f7;

// //           border:
// //             1px solid #ccd7e2;
// //         }


// //         .login-btn.cancel:hover {
// //           background: #e2e9f0;
// //         }


// //         /* =====================================================
// //            VERSION
// //         ====================================================== */

// //         .login-version {
// //           margin-top: 13px;

// //           color: #7d8791;

// //           font-size: 8px;

// //           text-align: center;
// //         }


// //         /* =====================================================
// //            EXIT
// //         ====================================================== */

// //         .login-exit {
// //           margin-top: 4px;

// //           padding: 2px 8px;

// //           border: none;

// //           background: transparent;

// //           color: #9aa2aa;

// //           font-size: 8px;

// //           cursor: pointer;
// //         }


// //         .login-exit:hover {
// //           color: #e83c68;
// //         }


// //         /* =====================================================
// //            TABLET
// //         ====================================================== */

// //         @media (max-width: 900px) {

// //           .school-illustration {
// //             width: 82vw;

// //             max-height: 82vh;
// //           }

// //           .login-card {
// //             top: 60%;

// //             width: 300px;
// //           }

// //         }


// //         /* =====================================================
// //            MOBILE
// //         ====================================================== */

// //         @media (max-width: 600px) {

// //           .login-page {
// //             min-height: 100vh;

// //             height: 100svh;
// //           }


// //           .login-background {
// //             height: 100svh;
// //           }


// //           .school-illustration {
// //             width: 112vw;

// //             max-width: none;

// //             max-height: none;

// //             top: 49%;

// //             transform:
// //               translate(-50%, -50%);
// //           }


// //           .login-card {
// //             width: 282px;

// //             min-height: 350px;

// //             top: 63%;

// //             padding:
// //               21px 23px 17px;

// //             border-radius: 20px;
// //           }


// //           .login-logo {
// //             width: 42px;

// //             height: 42px;
// //           }


// //           .login-heading h1 {
// //             font-size: 22px;
// //           }


// //           .login-heading p {
// //             font-size: 9px;
// //           }


// //           .login-input {
// //             height: 41px;
// //           }


// //           .login-btn {
// //             height: 38px;
// //           }

// //         }


// //         /* =====================================================
// //            SMALL MOBILE
// //         ====================================================== */

// //         @media (max-width: 400px) {

// //           .school-illustration {
// //             width: 125vw;

// //             top: 48%;
// //           }


// //           .login-card {
// //             width: 270px;

// //             min-height: 340px;

// //             top: 64%;

// //             padding:
// //               20px 21px 16px;
// //           }


// //           .login-logo {
// //             width: 40px;

// //             height: 40px;
// //           }


// //           .login-heading h1 {
// //             font-size: 21px;
// //           }


// //           .login-input {
// //             height: 40px;
// //           }

// //         }


// //         /* =====================================================
// //            VERY SMALL MOBILE
// //         ====================================================== */

// //         @media (max-width: 340px) {

// //           .school-illustration {
// //             width: 140vw;

// //             top: 47%;
// //           }


// //           .login-card {
// //             width: 258px;

// //             min-height: 325px;

// //             top: 65%;

// //             padding:
// //               18px 18px 15px;
// //           }


// //           .login-heading h1 {
// //             font-size: 19px;
// //           }


// //           .login-input {
// //             height: 38px;
// //           }


// //           .login-btn {
// //             height: 36px;

// //             font-size: 8px;
// //           }

// //         }

// //       `}</style>
// //     </main>
// //   );
// // }

// import { useState } from "react";

// import {
//   LockKeyhole,
//   UserRound,
//   Eye,
//   EyeOff,
//   LogIn,
//   X,
//   GraduationCap,
// } from "lucide-react";

// export default function Login({ onLogin }) {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [show, setShow] = useState(false);
//   const [error, setError] = useState("");

//   // =========================================================
//   // LOGIN LOGIC - KEPT SAME
//   // =========================================================

//   function submit(e) {
//     e.preventDefault();

//     if (!username.trim() || !password.trim()) {
//       setError("Please enter username and password.");
//       return;
//     }

//     setError("");
//     onLogin();
//   }

//   function cancelLogin() {
//     setUsername("");
//     setPassword("");
//     setError("");
//   }

//   function exitLogin() {
//     const confirmExit = window.confirm(
//       "Are you sure you want to exit?"
//     );

//     if (confirmExit) {
//       window.close();
//     }
//   }

//   return (
//     <main className="login-page">

//       {/* =====================================================
//           FULL SCREEN BACKGROUND
//       ====================================================== */}

//       <div className="login-background">

//         {/* BACKGROUND IMAGE */}
//         <img
//           src="/images/login-background.png"
//           alt="School background"
//           className="school-illustration"
//         />

//         {/* =================================================
//             LOGIN CARD

//             Moved DOWN so the graduation cap remains
//             completely visible.
//         ================================================== */}

//         <div className="login-card">

//           {/* SCHOOL ICON */}
//           <div className="login-logo">
//             <GraduationCap
//               size={34}
//               strokeWidth={2.4}
//             />
//           </div>

//           {/* TITLE */}
//           <div className="login-heading">
//             <h1>School Portal</h1>

//             <p>Login to your account</p>
//           </div>

//           {/* DECORATIVE LINE */}
//           <div className="heading-line">
//             <span></span>
//             <i></i>
//             <span></span>
//           </div>

//           {/* =================================================
//               LOGIN FORM
//           ================================================== */}

//           <form
//             onSubmit={submit}
//             className="login-form"
//           >

//             {/* USERNAME */}
//             <div className="login-input">

//               <UserRound
//                 size={17}
//                 strokeWidth={2}
//                 className="input-icon"
//               />

//               <input
//                 type="text"
//                 value={username}
//                 onChange={(e) =>
//                   setUsername(e.target.value)
//                 }
//                 placeholder="Username"
//                 autoComplete="username"
//               />

//             </div>

//             {/* PASSWORD */}
//             <div className="login-input">

//               <LockKeyhole
//                 size={17}
//                 strokeWidth={2}
//                 className="input-icon"
//               />

//               <input
//                 type={show ? "text" : "password"}
//                 value={password}
//                 onChange={(e) =>
//                   setPassword(e.target.value)
//                 }
//                 placeholder="Password"
//                 autoComplete="current-password"
//               />

//               {/* SHOW / HIDE PASSWORD */}
//               <button
//                 type="button"
//                 className="password-toggle"
//                 onClick={() => setShow(!show)}
//                 aria-label={
//                   show
//                     ? "Hide password"
//                     : "Show password"
//                 }
//               >
//                 {show ? (
//                   <EyeOff size={16} />
//                 ) : (
//                   <Eye size={16} />
//                 )}
//               </button>

//             </div>

//             {/* ERROR */}
//             {error && (
//               <div className="login-error">
//                 {error}
//               </div>
//             )}

//             {/* BUTTONS */}
//             <div className="login-buttons">

//               {/* LOGIN */}
//               <button
//                 type="submit"
//                 className="login-btn login"
//               >
//                 <LogIn size={14} />
//                 LOGIN
//               </button>

//               {/* CANCEL */}
//               <button
//                 type="button"
//                 onClick={cancelLogin}
//                 className="login-btn cancel"
//               >
//                 <X size={14} />
//                 CANCEL
//               </button>

//             </div>

//           </form>

//           {/* VERSION */}
//           <div className="login-version">
//             Version : 2025 : H 1.0.3
//           </div>

//           {/* EXIT */}
//           <button
//             type="button"
//             onClick={exitLogin}
//             className="login-exit"
//           >
//             Exit
//           </button>

//         </div>
//       </div>

//       {/* =====================================================
//           STYLES
//       ====================================================== */}

//       <style>{`

//         * {
//           box-sizing: border-box;
//         }

//         html,
//         body,
//         #root {
//           width: 100%;
//           min-height: 100%;
//           margin: 0;
//           padding: 0;
//         }


//         /* =====================================================
//            FULL PAGE
//         ====================================================== */

//         .login-page {
//           position: relative;

//           width: 100%;
//           height: 100vh;

//           min-height: 600px;

//           overflow: hidden;

//           background: #061a3a;

//           font-family:
//             Arial,
//             Helvetica,
//             sans-serif;
//         }


//         /* =====================================================
//            BACKGROUND CONTAINER
//         ====================================================== */

//         .login-background {
//           position: relative;

//           width: 100%;
//           height: 100%;

//           overflow: hidden;

//           background: #061a3a;
//         }


//         /* =====================================================
//            FULL SCREEN IMAGE

//            The image completely covers the screen.
//         ====================================================== */

//         .school-illustration {
//           position: absolute;

//           inset: 0;

//           width: 100%;
//           height: 100%;

//           object-fit: cover;

//           object-position: center center;

//           z-index: 1;

//           display: block;

//           pointer-events: none;

//           user-select: none;
//         }


//         /* =====================================================
//            LOGIN CARD

//            IMPORTANT:

//            top: 69%

//            This moves the card DOWN enough to keep the
//            graduation cap visible above the card.
//         ====================================================== */

//         .login-card {
//           position: absolute;

//           z-index: 5;

//           left: 50%;

//           top: 69%;

//           transform:
//             translate(-50%, -50%);

//           width: 310px;

//           min-height: 370px;

//           padding:
//             22px 27px 18px;

//           display: flex;

//           flex-direction: column;

//           align-items: center;

//           justify-content: center;

//           background:
//             rgba(255, 255, 255, 0.98);

//           border:
//             1px solid
//             rgba(255, 255, 255, 0.95);

//           border-radius: 22px;

//           box-shadow:
//             0 20px 45px
//             rgba(0, 0, 0, 0.32),

//             0 5px 15px
//             rgba(0, 0, 0, 0.18);
//         }


//         /* =====================================================
//            LOGO
//         ====================================================== */

//         .login-logo {
//           width: 44px;

//           height: 44px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           margin-bottom: 5px;

//           border-radius: 50%;

//           color: #0b2a52;

//           background: #edf4fb;

//           border:
//             2px solid #0b2a52;
//         }


//         /* =====================================================
//            HEADING
//         ====================================================== */

//         .login-heading {
//           width: 100%;

//           text-align: center;
//         }


//         .login-heading h1 {
//           margin: 0;

//           color: #0b2a52;

//           font-family:
//             Georgia,
//             "Times New Roman",
//             serif;

//           font-size: 25px;

//           font-weight: 800;

//           line-height: 1.2;
//         }


//         .login-heading p {
//           margin:
//             5px 0 0;

//           color: #68788a;

//           font-size: 10px;

//           font-weight: 500;
//         }


//         /* =====================================================
//            DECORATIVE LINE
//         ====================================================== */

//         .heading-line {
//           width: 100%;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           gap: 7px;

//           margin-top: 9px;

//           margin-bottom: 15px;
//         }


//         .heading-line span {
//           width: 38px;

//           height: 1px;

//           background: #aab8c7;
//         }


//         .heading-line i {
//           width: 6px;

//           height: 6px;

//           flex-shrink: 0;

//           border-radius: 50%;

//           background: #ed3b68;
//         }


//         /* =====================================================
//            FORM
//         ====================================================== */

//         .login-form {
//           width: 100%;

//           display: flex;

//           flex-direction: column;

//           align-items: center;
//         }


//         /* =====================================================
//            INPUT BOX
//         ====================================================== */

//         .login-input {
//           width: 100%;

//           height: 43px;

//           display: flex;

//           align-items: center;

//           padding:
//             0 11px;

//           margin-bottom: 10px;

//           background: #ffffff;

//           border:
//             1px solid #315f8c;

//           border-radius: 7px;

//           box-shadow:
//             0 2px 5px
//             rgba(6, 26, 58, 0.08);

//           transition:
//             border-color 0.2s ease,
//             box-shadow 0.2s ease;
//         }


//         .login-input:focus-within {
//           border-color: #0b2a52;

//           box-shadow:
//             0 0 0 2px
//             rgba(11, 42, 82, 0.10);
//         }


//         /* =====================================================
//            INPUT ICON
//         ====================================================== */

//         .input-icon {
//           flex-shrink: 0;

//           color: #0b2a52;

//           margin-right: 8px;
//         }


//         /* =====================================================
//            INPUT
//         ====================================================== */

//         .login-input input {
//           width: 100%;

//           min-width: 0;

//           height: 100%;

//           border: none;

//           outline: none;

//           background: transparent;

//           color: #17202a;

//           font-size: 11px;
//         }


//         .login-input input::placeholder {
//           color: #7b8794;
//         }


//         /* =====================================================
//            PASSWORD TOGGLE
//         ====================================================== */

//         .password-toggle {
//           display: flex;

//           align-items: center;

//           justify-content: center;

//           flex-shrink: 0;

//           padding: 4px;

//           border: none;

//           background: transparent;

//           color: #536b82;

//           cursor: pointer;
//         }


//         .password-toggle:hover {
//           color: #0b2a52;
//         }


//         /* =====================================================
//            ERROR
//         ====================================================== */

//         .login-error {
//           width: 100%;

//           margin:
//             -2px 0 8px;

//           padding:
//             6px 8px;

//           text-align: center;

//           color: #b4233f;

//           background: #fff0f3;

//           border:
//             1px solid #efbcc8;

//           border-radius: 6px;

//           font-size: 9px;

//           line-height: 1.3;
//         }


//         /* =====================================================
//            BUTTON ROW
//         ====================================================== */

//         .login-buttons {
//           width: 100%;

//           display: flex;

//           gap: 8px;

//           margin-top: 5px;
//         }


//         /* =====================================================
//            BUTTON
//         ====================================================== */

//         .login-btn {
//           flex: 1;

//           height: 39px;

//           display: flex;

//           align-items: center;

//           justify-content: center;

//           gap: 5px;

//           border-radius: 7px;

//           cursor: pointer;

//           font-size: 9px;

//           font-weight: 800;

//           transition:
//             transform 0.2s ease,
//             box-shadow 0.2s ease,
//             background 0.2s ease;
//         }


//         .login-btn:hover {
//           transform:
//             translateY(-1px);
//         }


//         .login-btn:active {
//           transform:
//             scale(0.98);
//         }


//         /* =====================================================
//            LOGIN BUTTON
//         ====================================================== */

//         .login-btn.login {
//           color: #ffffff;

//           background: #e83c68;

//           border:
//             1px solid #d72f5b;

//           box-shadow:
//             0 4px 10px
//             rgba(232, 60, 104, 0.25);
//         }


//         .login-btn.login:hover {
//           background: #d92f5b;

//           box-shadow:
//             0 6px 14px
//             rgba(232, 60, 104, 0.30);
//         }


//         /* =====================================================
//            CANCEL BUTTON
//         ====================================================== */

//         .login-btn.cancel {
//           color: #173b5c;

//           background: #edf2f7;

//           border:
//             1px solid #ccd7e2;
//         }


//         .login-btn.cancel:hover {
//           background: #e2e9f0;
//         }


//         /* =====================================================
//            VERSION
//         ====================================================== */

//         .login-version {
//           margin-top: 13px;

//           color: #7d8791;

//           font-size: 8px;

//           text-align: center;
//         }


//         /* =====================================================
//            EXIT
//         ====================================================== */

//         .login-exit {
//           margin-top: 4px;

//           padding: 2px 8px;

//           border: none;

//           background: transparent;

//           color: #9aa2aa;

//           font-size: 8px;

//           cursor: pointer;

//           transition:
//             color 0.2s ease;
//         }


//         .login-exit:hover {
//           color: #e83c68;
//         }


//         /* =====================================================
//            TABLET
//         ====================================================== */

//         @media (max-width: 1000px) {

//           .login-card {
//             top: 68%;

//             width: 300px;

//             min-height: 360px;
//           }

//         }


//         /* =====================================================
//            MOBILE
//         ====================================================== */

//         @media (max-width: 600px) {

//           .login-page {
//             width: 100%;

//             height: 100svh;

//             min-height: 600px;

//             overflow: hidden;
//           }


//           .login-background {
//             width: 100%;

//             height: 100svh;

//             min-height: 600px;
//           }


//           /*
//              Still full screen.
//              The image is cropped naturally on mobile.
//           */

//           .school-illustration {
//             width: 100%;

//             height: 100%;

//             object-fit: cover;

//             object-position: center center;
//           }


//           /*
//              Card moved lower so cap stays visible.
//           */

//           .login-card {
//             top: 69%;

//             width: min(
//               282px,
//               calc(100vw - 34px)
//             );

//             min-height: 350px;

//             padding:
//               20px 22px 17px;

//             border-radius: 20px;
//           }


//           .login-logo {
//             width: 42px;

//             height: 42px;
//           }


//           .login-heading h1 {
//             font-size: 22px;
//           }


//           .login-heading p {
//             font-size: 9px;
//           }


//           .heading-line {
//             margin-top: 8px;

//             margin-bottom: 13px;
//           }


//           .heading-line span {
//             width: 32px;
//           }


//           .login-input {
//             height: 41px;

//             margin-bottom: 9px;
//           }


//           .login-input input {
//             font-size: 11px;
//           }


//           .login-btn {
//             height: 38px;
//           }

//         }


//         /* =====================================================
//            SMALL MOBILE
//         ====================================================== */

//         @media (max-width: 400px) {

//           .login-card {
//             top: 70%;

//             width: calc(100vw - 30px);

//             min-height: 340px;

//             padding:
//               19px 20px 16px;

//             border-radius: 19px;
//           }


//           .login-logo {
//             width: 40px;

//             height: 40px;
//           }


//           .login-logo svg {
//             width: 30px;

//             height: 30px;
//           }


//           .login-heading h1 {
//             font-size: 21px;
//           }


//           .login-heading p {
//             font-size: 9px;
//           }


//           .login-input {
//             height: 40px;
//           }


//           .login-buttons {
//             gap: 7px;
//           }


//           .login-btn {
//             height: 37px;

//             font-size: 8.5px;
//           }


//           .login-version {
//             font-size: 7.5px;
//           }

//         }


//         /* =====================================================
//            VERY SMALL PHONES
//         ====================================================== */

//         @media (max-width: 340px) {

//           .login-card {
//             top: 71%;

//             width: calc(100vw - 24px);

//             min-height: 325px;

//             padding:
//               17px 17px 14px;
//           }


//           .login-logo {
//             width: 38px;

//             height: 38px;

//             margin-bottom: 4px;
//           }


//           .login-heading h1 {
//             font-size: 19px;
//           }


//           .login-heading p {
//             font-size: 8px;
//           }


//           .heading-line {
//             margin-top: 7px;

//             margin-bottom: 11px;
//           }


//           .heading-line span {
//             width: 27px;
//           }


//           .login-input {
//             height: 38px;

//             margin-bottom: 8px;

//             padding:
//               0 9px;
//           }


//           .input-icon {
//             margin-right: 6px;
//           }


//           .login-input input {
//             font-size: 10px;
//           }


//           .login-buttons {
//             gap: 6px;
//           }


//           .login-btn {
//             height: 35px;

//             font-size: 8px;
//           }


//           .login-version {
//             margin-top: 10px;

//             font-size: 7px;
//           }

//         }


//         /* =====================================================
//            LANDSCAPE MOBILE
//         ====================================================== */

//         @media (
//           max-height: 600px
//         ) and (
//           max-width: 900px
//         ) {

//           .login-card {
//             top: 72%;

//             transform:
//               translate(-50%, -50%)
//               scale(0.82);

//             transform-origin: center center;
//           }

//         }

//       `}</style>
//     </main>
//   );
// }


import { useState } from "react";

import {
  LockKeyhole,
  UserRound,
  Eye,
  EyeOff,
  LogIn,
  X,
  GraduationCap,
} from "lucide-react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================================================
  // BACKEND LOGIN
  // =========================================================

  async function submit(e) {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Please enter username and password.");
      return;
    }

    setError("");
    setLoading(true);

    
const API_BASE =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

try {
  const response = await fetch(
    `${API_BASE}/auth/login`,
    {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: username.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Invalid admin email or password."
        );
      }

      // =====================================================
      // SAVE LOGIN SESSION
      // =====================================================

      if (data?.data?.token) {
        localStorage.setItem("school_token", data.data.token);
      }

      if (data?.data?.user) {
        localStorage.setItem(
          "school_user",
          JSON.stringify(data.data.user)
        );
      }

      // Keep existing parent login flow
      onLogin(data?.data?.user);
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
          "Unable to connect to the server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  // =========================================================
  // CANCEL
  // =========================================================

  function cancelLogin() {
    setUsername("");
    setPassword("");
    setError("");
  }

  // =========================================================
  // EXIT
  // =========================================================

  function exitLogin() {
    const confirmExit = window.confirm(
      "Are you sure you want to exit?"
    );

    if (confirmExit) {
      window.close();
    }
  }

  return (
    <main className="login-page">

      {/* =====================================================
          FULL SCREEN BACKGROUND
      ====================================================== */}

      <div className="login-background">

        {/* BACKGROUND IMAGE */}
        <img
          src="/images/login-background.png"
          alt="School background"
          className="school-illustration"
        />

        {/* =================================================
            LOGIN CARD
        ================================================== */}

        <div className="login-card">

          {/* SCHOOL ICON */}
          <div className="login-logo">
            <GraduationCap
              size={34}
              strokeWidth={2.4}
            />
          </div>

          {/* TITLE */}
          <div className="login-heading">
            <h1>School Portal</h1>
            <p>Login to your account</p>
          </div>

          {/* DECORATIVE LINE */}
          <div className="heading-line">
            <span></span>
            <i></i>
            <span></span>
          </div>

          {/* =================================================
              LOGIN FORM
          ================================================== */}

          <form
            onSubmit={submit}
            className="login-form"
          >

            {/* USERNAME / EMAIL */}
            <div className="login-input">

              <UserRound
                size={17}
                strokeWidth={2}
                className="input-icon"
              />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Admin Email"
                autoComplete="username"
                disabled={loading}
              />

            </div>

            {/* PASSWORD */}
            <div className="login-input">

              <LockKeyhole
                size={17}
                strokeWidth={2}
                className="input-icon"
              />

              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                autoComplete="current-password"
                disabled={loading}
              />

              {/* SHOW / HIDE PASSWORD */}
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShow(!show)}
                aria-label={
                  show
                    ? "Hide password"
                    : "Show password"
                }
                disabled={loading}
              >
                {show ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>

            </div>

            {/* ERROR */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* BUTTONS */}
            <div className="login-buttons">

              {/* LOGIN */}
              <button
                type="submit"
                className="login-btn login"
                disabled={loading}
              >
                <LogIn size={14} />

                {loading ? "LOGIN..." : "LOGIN"}
              </button>

              {/* CANCEL */}
              <button
                type="button"
                onClick={cancelLogin}
                className="login-btn cancel"
                disabled={loading}
              >
                <X size={14} />
                CANCEL
              </button>

            </div>

          </form>

          {/* VERSION */}
          <div className="login-version">
            Version : 2025 : H 1.0.3
          </div>

          {/* EXIT */}
          <button
            type="button"
            onClick={exitLogin}
            className="login-exit"
            disabled={loading}
          >
            Exit
          </button>

        </div>
      </div>

      {/* =====================================================
          STYLES
      ====================================================== */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          width: 100%;
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        /* =====================================================
           FULL PAGE
        ====================================================== */

        .login-page {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          overflow: hidden;
          background: #061a3a;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        /* =====================================================
           BACKGROUND CONTAINER
        ====================================================== */

        .login-background {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background: #061a3a;
        }

        /* =====================================================
           FULL SCREEN IMAGE
        ====================================================== */

        .school-illustration {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
          z-index: 1;
          display: block;
          pointer-events: none;
          user-select: none;
        }

        /* =====================================================
           LOGIN CARD
        ====================================================== */

        .login-card {
          position: absolute;
          z-index: 5;
          left: 50%;
          top: 69%;
          transform: translate(-50%, -50%);
          width: 310px;
          min-height: 370px;
          padding: 22px 27px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.98);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 22px;
          box-shadow:
            0 20px 45px rgba(0, 0, 0, 0.32),
            0 5px 15px rgba(0, 0, 0, 0.18);
        }

        /* =====================================================
           LOGO
        ====================================================== */

        .login-logo {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 5px;
          border-radius: 50%;
          color: #0b2a52;
          background: #edf4fb;
          border: 2px solid #0b2a52;
        }

        /* =====================================================
           HEADING
        ====================================================== */

        .login-heading {
          width: 100%;
          text-align: center;
        }

        .login-heading h1 {
          margin: 0;
          color: #0b2a52;
          font-family:
            Georgia,
            "Times New Roman",
            serif;
          font-size: 25px;
          font-weight: 800;
          line-height: 1.2;
        }

        .login-heading p {
          margin: 5px 0 0;
          color: #68788a;
          font-size: 10px;
          font-weight: 500;
        }

        /* =====================================================
           DECORATIVE LINE
        ====================================================== */

        .heading-line {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 9px;
          margin-bottom: 15px;
        }

        .heading-line span {
          width: 38px;
          height: 1px;
          background: #aab8c7;
        }

        .heading-line i {
          width: 6px;
          height: 6px;
          flex-shrink: 0;
          border-radius: 50%;
          background: #ed3b68;
        }

        /* =====================================================
           FORM
        ====================================================== */

        .login-form {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* =====================================================
           INPUT BOX
        ====================================================== */

        .login-input {
          width: 100%;
          height: 43px;
          display: flex;
          align-items: center;
          padding: 0 11px;
          margin-bottom: 10px;
          background: #ffffff;
          border: 1px solid #315f8c;
          border-radius: 7px;
          box-shadow:
            0 2px 5px rgba(6, 26, 58, 0.08);
          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .login-input:focus-within {
          border-color: #0b2a52;
          box-shadow:
            0 0 0 2px rgba(11, 42, 82, 0.10);
        }

        /* =====================================================
           INPUT ICON
        ====================================================== */

        .input-icon {
          flex-shrink: 0;
          color: #0b2a52;
          margin-right: 8px;
        }

        /* =====================================================
           INPUT
        ====================================================== */

        .login-input input {
          width: 100%;
          min-width: 0;
          height: 100%;
          border: none;
          outline: none;
          background: transparent;
          color: #17202a;
          font-size: 11px;
        }

        .login-input input::placeholder {
          color: #7b8794;
        }

        .login-input input:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }

        /* =====================================================
           PASSWORD TOGGLE
        ====================================================== */

        .password-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 4px;
          border: none;
          background: transparent;
          color: #536b82;
          cursor: pointer;
        }

        .password-toggle:hover {
          color: #0b2a52;
        }

        /* =====================================================
           ERROR
        ====================================================== */

        .login-error {
          width: 100%;
          margin: -2px 0 8px;
          padding: 6px 8px;
          text-align: center;
          color: #b4233f;
          background: #fff0f3;
          border: 1px solid #efbcc8;
          border-radius: 6px;
          font-size: 9px;
          line-height: 1.3;
        }

        /* =====================================================
           BUTTON ROW
        ====================================================== */

        .login-buttons {
          width: 100%;
          display: flex;
          gap: 8px;
          margin-top: 5px;
        }

        /* =====================================================
           BUTTON
        ====================================================== */

        .login-btn {
          flex: 1;
          height: 39px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          border-radius: 7px;
          cursor: pointer;
          font-size: 9px;
          font-weight: 800;
          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .login-btn:hover {
          transform: translateY(-1px);
        }

        .login-btn:active {
          transform: scale(0.98);
        }

        .login-btn:disabled {
          cursor: not-allowed;
          opacity: 0.65;
          transform: none;
        }

        /* =====================================================
           LOGIN BUTTON
        ====================================================== */

        .login-btn.login {
          color: #ffffff;
          background: #e83c68;
          border: 1px solid #d72f5b;
          box-shadow:
            0 4px 10px rgba(232, 60, 104, 0.25);
        }

        .login-btn.login:hover {
          background: #d92f5b;
          box-shadow:
            0 6px 14px rgba(232, 60, 104, 0.30);
        }

        /* =====================================================
           CANCEL BUTTON
        ====================================================== */

        .login-btn.cancel {
          color: #173b5c;
          background: #edf2f7;
          border: 1px solid #ccd7e2;
        }

        .login-btn.cancel:hover {
          background: #e2e9f0;
        }

        /* =====================================================
           VERSION
        ====================================================== */

        .login-version {
          margin-top: 13px;
          color: #7d8791;
          font-size: 8px;
          text-align: center;
        }

        /* =====================================================
           EXIT
        ====================================================== */

        .login-exit {
          margin-top: 4px;
          padding: 2px 8px;
          border: none;
          background: transparent;
          color: #9aa2aa;
          font-size: 8px;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .login-exit:hover {
          color: #e83c68;
        }

        /* =====================================================
           TABLET
        ====================================================== */

        @media (max-width: 1000px) {

          .login-card {
            top: 68%;
            width: 300px;
            min-height: 360px;
          }

        }

        /* =====================================================
           MOBILE
        ====================================================== */

        @media (max-width: 600px) {

          .login-page {
            width: 100%;
            height: 100svh;
            min-height: 600px;
            overflow: hidden;
          }

          .login-background {
            width: 100%;
            height: 100svh;
            min-height: 600px;
          }

          .school-illustration {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center center;
          }

          .login-card {
            top: 69%;
            width: min(
              282px,
              calc(100vw - 34px)
            );
            min-height: 350px;
            padding: 20px 22px 17px;
            border-radius: 20px;
          }

          .login-logo {
            width: 42px;
            height: 42px;
          }

          .login-heading h1 {
            font-size: 22px;
          }

          .login-heading p {
            font-size: 9px;
          }

          .heading-line {
            margin-top: 8px;
            margin-bottom: 13px;
          }

          .heading-line span {
            width: 32px;
          }

          .login-input {
            height: 41px;
            margin-bottom: 9px;
          }

          .login-input input {
            font-size: 11px;
          }

          .login-btn {
            height: 38px;
          }

        }

        /* =====================================================
           SMALL MOBILE
        ====================================================== */

        @media (max-width: 400px) {

          .login-card {
            top: 70%;
            width: calc(100vw - 30px);
            min-height: 340px;
            padding: 19px 20px 16px;
            border-radius: 19px;
          }

          .login-logo {
            width: 40px;
            height: 40px;
          }

          .login-logo svg {
            width: 30px;
            height: 30px;
          }

          .login-heading h1 {
            font-size: 21px;
          }

          .login-heading p {
            font-size: 9px;
          }

          .login-input {
            height: 40px;
          }

          .login-buttons {
            gap: 7px;
          }

          .login-btn {
            height: 37px;
            font-size: 8.5px;
          }

          .login-version {
            font-size: 7.5px;
          }

        }

        /* =====================================================
           VERY SMALL PHONES
        ====================================================== */

        @media (max-width: 340px) {

          .login-card {
            top: 71%;
            width: calc(100vw - 24px);
            min-height: 325px;
            padding: 17px 17px 14px;
          }

          .login-logo {
            width: 38px;
            height: 38px;
            margin-bottom: 4px;
          }

          .login-heading h1 {
            font-size: 19px;
          }

          .login-heading p {
            font-size: 8px;
          }

          .heading-line {
            margin-top: 7px;
            margin-bottom: 11px;
          }

          .heading-line span {
            width: 27px;
          }

          .login-input {
            height: 38px;
            margin-bottom: 8px;
            padding: 0 9px;
          }

          .input-icon {
            margin-right: 6px;
          }

          .login-input input {
            font-size: 10px;
          }

          .login-buttons {
            gap: 6px;
          }

          .login-btn {
            height: 35px;
            font-size: 8px;
          }

          .login-version {
            margin-top: 10px;
            font-size: 7px;
          }

        }

        /* =====================================================
           LANDSCAPE MOBILE
        ====================================================== */

        @media (
          max-height: 600px
        ) and (
          max-width: 900px
        ) {

          .login-card {
            top: 72%;
            transform:
              translate(-50%, -50%)
              scale(0.82);
            transform-origin: center center;
          }

        }

      `}</style>
    </main>
  );
}

