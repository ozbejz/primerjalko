const Odjava = () => {
    return (
        <div>
            Se želite odjaviti
            <form method="post" action="http://localhost:80/primerjalko-server/odjava.php">
                <input type="submit" value="Da"></input>
            </form>
        </div>
    );
}
 
export default Odjava;