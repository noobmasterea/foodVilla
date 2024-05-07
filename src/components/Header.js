import { useState } from "react";
import { Link } from 'react-router-dom';

const Title = () => (
    <a href="/">
        <img 
            className="logo"
            src="https://tse4.mm.bing.net/th?id=OIP.3U0azej8Iu1A-846zebpmgHaES&pid=Api&P=0&h=220" 
            alt="logo"
        />
    </a>
)

const Header = () =>{
    const [isLoggedin, setIsLoggedin] = useState(true);
    return (
        <div className="header">
            <Title/>
            <div className="nav-items">
                <ul>
                    <Link to="/">
                        <li>Home</li>
                    </Link>
                    <Link to="/about">
                        <li>About</li>
                    </Link>
                    <Link to="/contact">
                        <li>Contact</li>
                    </Link>
                    <li className="fa-solid fa-cart-shopping"></li>
                    <li>
                        {/*additional rendering for login and logout*/}
                        {isLoggedin ? (
                            <button className="logout-btn"
                                onClick={()=>setIsLoggedin(false)}
                            >
                                Logout
                            </button>
                        ):(
                            <button
                                className="login-btn"
                                onClick={()=>setIsLoggedin(true)}
                            >
                                Login
                            </button>
                        )}
                    </li>
                </ul>
            </div> 
        </div>
    );
}

export default Header;