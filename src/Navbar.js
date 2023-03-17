import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Navbar = () =>{
  
  const [prijavljen, setPrijavljen] = useState(false);
  useEffect(() => {
      let data = {};
      const getprijavljen = async()=>{
          axios.post("http://localhost:80/primerjalko-server/prijavljen.php", data, {withCredentials: true})
              .then(function(response){
              setPrijavljen(response.data);
              console.log(response.data);
          });
      }
      getprijavljen();
  }, []);

  return (
    <nav className="Navbar">
        <h1> <Link to = '/' className="nov">Primerjalko</Link></h1>
        <div className="nov">
        {prijavljen.aktiven ?
          <Link to='/odjava' className="nov">Odjava</Link>
            : <Link to='/prijava' className="nov">Prijava</Link>
        }
        </div>
        
    </nav>
  );
}

export default Navbar;