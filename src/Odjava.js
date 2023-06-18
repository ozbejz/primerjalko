const Odjava = () => {
    return (
        <div>
            <form method="post" action="http://localhost:80/primerjalko-server/odjava.php"> 
            Se želite odjaviti?
                <input type="submit" value="Da"></input>
            </form>
        </div>
    );
}
 
export default Odjava;