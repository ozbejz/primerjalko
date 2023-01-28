const Prijava = () => {
    return ( 
        <div id="prijava">
            <form method="post" action="">
                Ime<br/><input type="text" name="ime"required></input><br/>
                Geslo<br/><input type="password" name="geslo" required></input><br/>
                <input type="submit" value="Prijavi se"></input>
            </form>
            <div>Nimate racuna? <a className="visible" href="/registracija">Registrirajte se</a></div>
            
        </div>
    );
}
 
export default Prijava;