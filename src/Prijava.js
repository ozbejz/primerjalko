import axios from "axios";
import { useState } from "react";
/*
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
*/
const Prijava = () => {
    const [inputs, setInputs] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        axios.post('http://localhost:80/primerjalko-server/process-prijava.php', inputs, {withCredentials: true})
          .then(function(response){
            if(response.data["status"]===1){
                window.location.href = "https://primerjalko.vercel.app/";
            }
            else{
                setErrorMessage('Prijava neuspešna');
            }
        });
    }
    

    return ( 
        <div id="prijava">
            <form onSubmit={handleSubmit}>
                Email<br/><input className="prijava" type="text" name='email' required onChange={ handleChange}></input><br/>
                Geslo<br/><input className="prijava" type="password" name='geslo' required onChange={ handleChange}></input><br/>
                <input type="submit" value="Prijavi se"></input>
            </form>
            {errorMessage && (
                <h4 className="error"> {errorMessage} </h4>
            )}
            <div>Nimate racuna? <a className="visible" href="/registracija">Registrirajte se</a></div>
            
        </div>
    );
}

export default Prijava;