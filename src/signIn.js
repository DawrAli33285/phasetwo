import React, { useState,useRef,useCallback } from 'react';
import { Link } from 'react-router-dom';
import { BsEnvelopeFill, BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import CateBanner from "./components/cateBanner";
import "./cv-form.css"
import {login} from './redux/slices/authSlice'
import toastr from 'toastr'
import { useNavigate } from 'react-router-dom';
import 'toastr/build/toastr.min.css';
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialLinkedin,
    LoginSocialMicrosoft,
    LoginSocialTwitter
  } from "reactjs-social-login";
  import {
    FacebookLoginButton,
    GoogleLoginButton,
    LinkedInLoginButton,
    MicrosoftLoginButton,
    TwitterLoginButton
  } from "react-social-login-buttons";
  import { useDispatch } from 'react-redux';
  const REDIRECT_URI = "http://localhost:3000/account/login";
  alert("NOW")
  
  export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [provider, setProvider] = useState("");
    const [profile, setProfile] = useState();
 
    const googleRef = useRef();
    const facebookRef = useRef();
    const microsoftRef = useRef();
    const linkedinRef = useRef();
    const twitterRef = useRef();
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRememberMeChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        let loginres=await dispatch(login({email,password}))
        if(login.rejected.match(loginres)){
toastr.error(loginres?.payload?.error)
        }
        if(login.fulfilled.match(loginres)){
          toastr.success("Login sucessfull")
          window.location.href="/"
        }
    
    };
    const onLoginStart = useCallback(() => {
        alert("login start");
      }, []);
    
      const onLogoutFailure = useCallback(() => {
        alert("logout fail");
      }, []);
    
      const onLogoutSuccess = useCallback(() => {
        setProfile(null);
        setProvider("");
        alert("logout success");
      }, []);

    return (
        <>
            <CateBanner pageName="SignIn" />
            <div className="max-w-[500px] my-[40px] lg:mx-auto mx-[10px] p-4 border-[1px] rounded-md bg-white border-[#00a7ac] flex flex-col gap-4">
                <form className='flex flex-col gap-[20px]' onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <p className="font-semibold text-base">Email</p>
                        <div className="input-area flex items-center">
                            <BsEnvelopeFill color="#00a7ac" size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="ml-2 outline-none border-b border-gray-400"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col relative">
                        <p className="font-semibold text-base">Password</p>
                        <div className="input-area flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                className="ml-2 outline-none border-b border-gray-400 pr-10"
                            />
                            {showPassword ? (
                                <BsEyeSlashFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            ) : (
                                <BsEyeFill
                                    color="#00a7ac"
                                    size={20}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                                    onClick={togglePasswordVisibility}
                                />
                            )}
                        </div>
                    </div>
                    {/* <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                            className="mr-2"
                        />
                        <label className="text-sm">Remember Me</label>
                    </div> */}
                     <LoginSocialMicrosoft
          ref={microsoftRef}
          client_id="384c5e54-47cf-42e5-a3e6-6ad66ba6fd0e"
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);

          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <MicrosoftLoginButton />
        </LoginSocialMicrosoft>


        <LoginSocialFacebook
          ref={facebookRef}
          appId={"722882353366574"}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <FacebookLoginButton />
        </LoginSocialFacebook>




        <LoginSocialGoogle
          ref={googleRef}
          client_id="1024616921919-hns9m0q39jb21qrp4kpb57kti2sd5t1n.apps.googleusercontent.com"
          onLogoutFailure={onLogoutFailure}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
            console.log(data, "data");
            console.log(provider, "provider");
          }}
          onReject={(err) => {
            console.log("hbhbdhd", err);
          }}
        >
          <GoogleLoginButton />
        </LoginSocialGoogle>





        <LoginSocialLinkedin
          ref={linkedinRef}
          client_id={process.env.REACT_APP_LINKEDIN_CLIENT|| "86pzqgprf0w2kj"}
          client_secret={process.env.REACT_APP_LINKEDIN_SECRET|| "a3VmR9Do5KMWGgqG"}
          redirect_uri="https://jobsfrontend-be4cgrqi6-ali-bukharis-projects.vercel.app"
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <LinkedInLoginButton />
        </LoginSocialLinkedin>




        
        <LoginSocialTwitter
          ref={twitterRef}
          client_id={process.env.REACT_APP_TWITTER_API_KEY || ""}
          client_secret={process.env.REACT_APP_TWITTER_APP_SECRET || ""}
          redirect_uri={REDIRECT_URI}
          onLoginStart={onLoginStart}
          onLogoutSuccess={onLogoutSuccess}
          onResolve={({ provider, data }) => {
            setProvider(provider);
            setProfile(data);
          }}
          onReject={(err) => {
            console.log(err);
          }}
        >
          <TwitterLoginButton />
        </LoginSocialTwitter>


        
                    <button className="w-full relative h-[50px]  overflow-hidden border border-[#00a7ac] bg-white text-[#00a7ac]  transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-[#00a7ac] hover:before:w-2/4 hover:before:bg-[#00a7ac] hover:after:w-2/4 hover:after:bg-[#00a7ac]"><span class="relative z-10">Login</span></button>

                </form>
                <div className="flex items-center mt-2">
                    <span className="text-sm">Don’t have an account? </span>
                    <Link to="/signup" className="text-sm" style={{ color: '#00a7ac' }}>Sign Up</Link>
                </div>
            </div>
        </>
    );
}
