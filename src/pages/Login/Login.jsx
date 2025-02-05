import React, { useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { login, signUp } from '../../firebase'
import netflix_spinner from '../../assets/netflix_spinner.gif'

const Login = () => {

    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState()

    const validateForm = () => {
        if (signState === "Sign Up" && !name.trim()) {
            setError("Name is required.");
            return false;
        }
        if (!email.trim()) {
            setError("Email is required.");
            return false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Enter a valid email address.");
            return false;
        }
        if (!password.trim()) {
            setError("Password is required.");
            return false;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return false;
        }
        setError("");
        return true;
    };

    const user_auth = async (event) => {
        event.preventDefault()
        if(!validateForm()) return;
        setLoading(true);
        if (signState === "Sign In") {
            await login(email, password);
        } else {
            await signUp(name, email, password);
        }
        setLoading(false);
    }

    return (
        loading ? <div className="login-spinner">
            <img src={netflix_spinner} alt="" />
        </div> :
            <div className='login'>
                <img src={logo} alt="" className='login-logo' />
                <div className='login-form'>
                    <h1>{signState}</h1>
                    {error && <p className="error-message" style={{color:"red"}}>{error}</p>}
                    <form>
                        {signState === "Sign Up" ? <input type="text" placeholder='Your Name' value={name} onChange={(e) => { setName(e.target.value) }} /> : <></>}
                        <input type="email" placeholder='Your Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        <input type="password" placeholder='Pasword' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                        <button onClick={user_auth} type='submit'>{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" />
                                <label htmlFor="">Remember Me</label>
                            </div>
                            <p>Need Help?</p>
                        </div>
                    </form>
                    <div className='form-switch'>
                        {signState === "Sign In" ? <p>New to Netflix? <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span></p> :
                            <p>Already have account? <span onClick={() => setSignState("Sign In")}>Sign In Now</span></p>}
                    </div>
                </div>
            </div>
    )
}

export default Login
