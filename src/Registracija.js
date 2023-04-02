import axios from "axios";
import { useState } from "react";

const Registracija = () => {

    const [inputs, setInputs] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:80/primerjalko-server/process-registracija.php', inputs, {withCredentials: true})
          .then(function(response){
            console.log(response.data);
            if(response.data["status"]===1){
                window.location.href = "http://localhost:3000/prijava";
            }
            else if(response.data["status"]===2){
                setErrorMessage('Gesla se ne ujemata');
            }
            else if(response.data["status"]===3){
                setErrorMessage('Ta email je že v uporabi');
            }
            else{
                setErrorMessage('Registracija neuspešna');
            }
        });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Ime<br/><input type="text" name="ime" required onChange={ handleChange}></input><br/>
                Email<br/><input type="text" name="email" pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required onChange={ handleChange}></input><br/>
                Geslo<br/><input type="password" name="geslo" minLength={5} required onChange={ handleChange}></input><br/>
                še enkrat vpisite geslo<br/><input type="password" name="preveri_geslo" required onChange={ handleChange}></input><br/>
                <input type="submit" value="Postani uporabnik"></input>
            </form>
            {errorMessage && (
                <h4 className="error"> {errorMessage} </h4>
            )}
        </div>
    );
}
 
export default Registracija;