import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Kategorije = () =>{
  const [category, setCategory] = useState([]);
    useEffect(()=>{
        const getcategory = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/kategorije.php');
            const getdata = await res.json();
            setCategory(getdata);
        }
        getcategory();
    }, [])
    return (
      <nav className="kategorije">
        <div className="dropdown">
          <h2 className="kat">Kategorije</h2>
          <div>
              {category.map((cat)=>(
                  <div key={cat.IdKategorija}>
                    <Link to={`/kategorije/${cat.IdKategorija}`}>
                      <h3>{cat.naziv}</h3>
                    </Link>
                  </div>
              ))}
          </div>
        </div>
      </nav>
    );
  }
  
export default Kategorije;