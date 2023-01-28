const Registracija = () => {
    return ( 
        <div>
            <form method="post" action="http://localhost:80/primerjalko-server/process-registracija.php">
                Ime<br/><input type="text" name="ime" required></input><br/>
                Email<br/><input type="text" name="email" required></input><br/>
                Geslo<br/><input type="password" name="geslo" required></input><br/>
                še enkrat vpisite geslo<br/><input type="password" name="preveri_geslo" required></input><br/>
                <input type="submit" value="Postani uporabnik"></input>
            </form>
        </div>
    );
}
 
export default Registracija;