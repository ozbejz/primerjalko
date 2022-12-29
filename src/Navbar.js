import { Link } from "react-router-dom";

const Navbar = () =>{
  return (
    <nav className="Navbar">
        <h1> <Link to = '/'>Primerjalko</Link></h1>
        <div className="links">
            <Link to='/prijava'>Prijava</Link>
        </div>
        
    </nav>
  );
}

export default Navbar;