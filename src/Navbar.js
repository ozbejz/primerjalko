import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import SearchResultList from "./SearchResultList";
import Search from "./Search";

const Navbar = () =>{
  
  const [prijavljen, setPrijavljen] = useState(false);

  let data = {};
  useEffect(() => {
      const getprijavljen = async()=>{
          axios.post("http://localhost:80/primerjalko-server/prijavljen.php", data, {withCredentials: true})
              .then(function(response){
              setPrijavljen(response.data);
            });
          }
      getprijavljen();
  }, []);

  return (
    <nav className="Navbar">
        <h1> <Link to = '/' className="nov">Primerjalko</Link></h1>
        <Search></Search>
        <div className="nov">
          {prijavljen.je_admin ?
            <Link to='/admin-panel' className="nov">Nadzorna plošča</Link>
              : <>nisi admin lol</>
          }
        </div> 
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