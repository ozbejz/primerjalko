import { useState } from "react";
import { Link } from "react-router-dom";

const Kategorije = () =>{
  const [kategorije, setKategorije] = useState([
    {ime: "Racunalnistvo", nav: "racunalnistvo", stIzdelkov: 20, id:1},
    {ime: "Bela tehnika", nav: "belatehnika", stIzdelkov: 30, id:2},
    {ime: "Telefonija", nav: "telefon", stIzdelkov: 10, id:3}
    ])

    
    return (
      <nav className="Kategorije">
        <div className="dropdown">
        <button className="dropbtn">Kategorije</button>
        <div className="dropdown-content">
            {kategorije.map((kat)=>(
                <div key={kat.id}>
                  <Link to={`/kategorije/${kat.nav}`}>
                    <h2>{kat.ime}</h2>
                  </Link>
                </div>
            ))}
        </div>
        </div>
      </nav>
    );
  }
  
export default Kategorije;