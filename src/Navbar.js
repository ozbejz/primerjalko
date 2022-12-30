import { Link } from "react-router-dom";

const Navbar = () =>{
  return (
    <nav className="Navbar">
        <h1> <Link to = '/' className="nov">Primerjalko</Link></h1>
        <div className="nov">
            <Link to='/prijava' className="nov">Prijava</Link>
        </div>
        
    </nav>
  );
}

export default Navbar;