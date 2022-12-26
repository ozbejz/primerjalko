import { useState } from "react";

const Kategorije = () =>{
  const [kategorije, setKategorije] = useState([
    {ime: "Racunalnistvo", nav: "racunalnistvo", stIzdelkov: 20, id:1},
    {ime: "Bela tehnika", nav: "belatehnika", stIzdelkov: 30, id:2},
    {ime: "Telefonija", nav: "telefonija", stIzdelkov: 10, id:3}
    ])
    return (
      <nav className="Kategorije">
        <div class="dropdown">
        <button class="dropbtn">Kategorije</button>
        <div class="dropdown-content">
            {kategorije.map((kat)=>(
                <div key={kat.id}>
                    <a href = {kat.nav}>{kat.ime}</a>
                </div>
            ))}
        </div>
        </div>
      </nav>
    );
  }
  
export default Kategorije;