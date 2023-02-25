import { useEffect } from "react";
import { useState } from "react";

const AdminPanel = () => {
    const [category, setCategory] = useState([]);
    useEffect(()=>{
        const getcategory = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/kategorije.php');
            const getdata = await res.json();
            setCategory(getdata);
        }
        getcategory();
    }, [])

    const [izdelek, setIzdelek] = useState([]);
    useEffect(()=>{
        const getizdelek = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/izdelki.php');
            const getdata = await res.json();
            setIzdelek(getdata);
        }
        getizdelek();
    }, [])

    const [uporabnik, setUporabnik] = useState([]);
    useEffect(()=>{
        const getuporabnik = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/uporabniki.php');
            const getdata = await res.json();
            setUporabnik(getdata);
        }
        getuporabnik();
    }, [])

    return (
        <div className="admin">
            <h2>Nadzorna plosca</h2>
            <br/>
            <div className="adminform">
                <h3>Vnesi kategorijo</h3>
                <form method="post" action="http://localhost:80/primerjalko-server/dodaj-kategorijo.php">
                    Naziv<br/><input type="text" name="naziv"required></input><br/>
                    Opis<br/><input type="text" name="opis" required></input><br/>
                    <input type="submit" value="Vnesi"></input>
                </form>
            </div>
            <br/>
            <div className="adminform">
                <h3>Vnesi izdelek</h3>
                <form method="post" action="http://localhost:80/primerjalko-server/dodaj-izdelek.php">
                    Naziv<br/><input type="text" name="naziv"required></input><br/>
                    Opis<br/><input type="text" name="opis" required></input><br/>
                    Znamka<br/><input type="text" name="znamka" required></input><br/>
                    Kategorija: <select name="kategorija" id="kategorija">
                        {category.map((cat)=>(
                            <option key={cat.IdKategorija} value={cat.IdKategorija}>{cat.naziv}</option>
                        ))}
                    </select><br/>
                    <input type="submit" value="Vnesi"></input>
                </form>
            </div>
            <br/>
            <div className="adminform">
                <h3>Vnesi trgovino</h3>
                <form method="post" action="http://localhost:80/primerjalko-server/dodaj-trgovino.php">
                    Izdelek: <select name="izdelek" id="izdelek">
                        {izdelek.map((izd)=>(
                            <option key={izd.IdIzdelek} value={izd.IdIzdelek}>{izd.naziv}</option>
                        ))}
                    </select><br/>
                    Ime trgovine<br/><input type="text" name="ime"required></input><br/>
                    Link do izdelka<br/><input type="text" name="link" required></input><br/>
                    Cena izdelka<br/><input type="text" name="cena" required></input><br/>
                    <input type="submit" value="Vnesi"></input>
                </form>
            </div>
            <br/>
            <div className="adminform">
                <h3>Bannaj uporabnika</h3>
                <form method="post" action="http://localhost:80/primerjalko-server/spremeni-aktivnost.php">
                    Uporabnik: <select name="uporabnik" id="uporabnik">
                        {uporabnik.map((upo)=>(
                            <option key={upo.Id} value={upo.Id}>{upo.ime}, aktiven: {upo.aktiven}</option>
                        ))}
                    </select><br/>
                    <input type="submit" value="Bannaj/Unbannaj"></input>
                </form>
            </div>
        </div>
    );
}
 
export default AdminPanel;