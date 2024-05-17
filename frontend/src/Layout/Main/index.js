import { NavLink, Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import "./style.css";
import {FaFacebook, FaTwitter, FaInstagram,FaPinterest} from "react-icons/fa"
export default function Main() {
  return (
    <div className="root-layout">
      <header className="headH">
        <Navbar/>
      </header>
      <main className="mainM">
        <nav>
        <NavLink to="/rated">Top Rated</NavLink>
        
        </nav>
        <Outlet />
      </main>
      <footer className="footer">
       <p>Follow us: </p>
       <div className="social-icons">
        <a href="https://www.facebook.com" style={{ color: '#3b5998' }}><FaFacebook />Spark</a>
        <br/>
        <a href="https://www.twitter.com" style={{ color: '#1da1f2' }}><FaTwitter />Spark</a><br/>
        <a href="https://www.instagram.com" style={{ color: '#bc2a8d' }}><FaInstagram />Spark</a>
        <br/>
        <a href="https://www.pinterest.com" style={{ color: '#bd081c' }}><FaPinterest />Spark</a>
      </div>
      
      <div className="contact-info">
      <p>Contact with us: </p>
        <p>Email: spark@gmail.com</p>
        <p>Phone: +962787023107</p>
      </div>
      <div className="copyright">
        <p>&copy; 2024 Spark. All rights reserved.</p>
      </div>
      </footer>
    </div>
  );
}
