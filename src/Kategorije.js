import { useState } from "react";
import { Link } from "react-router-dom";

const Kategorije = () =>{
  const [kategorije, setKategorije] = useState([
    {ime: "Prenosniki", nav: "racunalnistvo", stIzdelkov: 20, id:1},
    {ime: "Bela tehnika", nav: "belatehnika", stIzdelkov: 30, id:2},
    {ime: "Telefoni", nav: "telefon", stIzdelkov: 10, id:3}
    ])
    return (
      <nav className="Kategorije">
        <div className="dropdown">
          <h2 className="kat">Kategorije</h2>
          <div>
              {kategorije.map((kat)=>(
                  <div key={kat.id}>
                    <Link to={`/kategorije/${kat.nav}`}>
                      <h3>{kat.ime}</h3>
                    </Link>
                  </div>
              ))}
          </div>
        </div>
      </nav>
    );
  }
  
export default Kategorije;