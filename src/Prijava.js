import axios from "axios";
import { useState } from "react";

const Prijava = () => {
    return ( 
        <div id="prijava">
            <form method="post" action="http://localhost:80/primerjalko-server/process-prijava.php">
                Email<br/><input type="text" name="email"required></input><br/>
                Geslo<br/><input type="password" name="geslo" required></input><br/>
                <input type="submit" value="Prijavi se"></input>
            </form>
            <div>Nimate racuna? <a className="visible" href="/registracija">Registrirajte se</a></div>
            
        </div>
    );
}
/*

const Prijava = () => {
    const [inputs, setInputs] = useState({});

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       

        axios.post('http://localhost:80/primerjalko-server/process-prijava.php', inputs)
          .then(function(response){
            console.log(response.data);
        });
    
}

    return ( 
        <div id="prijava">
            <form onSubmit={handleSubmit}>
                Email<br/><input type="text" name='email' required onChange={ handleChange}></input><br/>
                Geslo<br/><input type="password" name='geslo' required onChange={ handleChange}></input><br/>
                <input type="submit" value="Prijavi se"></input>
            </form>
            <div>Nimate racuna? <a className="visible" href="/registracija">Registrirajte se</a></div>
            
        </div>
    );
}
*/
export default Prijava;