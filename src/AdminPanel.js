import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AdminPanel = () => { 
    const [inputs, setInputs] = useState({});
    const [link, setLink] = useState([]);
    const [category, setCategory] = useState([]);
    const [izdelek, setIzdelek] = useState([]);
    const [uporabnik, setUporabnik] = useState([]);
    const [trgovina, setTrgovina] = useState([]);
    const [ocena, setOcena] = useState([]);
    const [update, setUpdate] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        const getcategory = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/kategorije.php');
            const getdata = await res.json();
            setCategory(getdata);
        }
        getcategory();
    }, [update])

    useEffect(()=>{
        const getizdelek = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/izdelki.php');
            const getdata = await res.json();
            setIzdelek(getdata);
        }
        getizdelek();
    }, [update])
    
    useEffect(()=>{
        const getuporabnik = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/uporabniki.php');
            const getdata = await res.json();
            setUporabnik(getdata);
        }
        getuporabnik();
    }, [update])

    useEffect(()=>{
        const gettrgovina = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/trgovine.php');
            const getdata = await res.json();
            setTrgovina(getdata);
        }
        gettrgovina();
    }, [update])

    useEffect(()=>{
        const getocena = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/ocene.php');
            const getdata = await res.json();
            setOcena(getdata);
        }
        getocena();
    }, [update])

    const handleChange = async (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(event.target.tagName === 'SELECT')
            setUpdate(1);
        setInputs(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdate(Math.random());
        axios.post(link, inputs)
          .then(function(response){
            if(response.data['status'] === 1){
                setMessage('uspelo');
            }
            else
                setMessage('ni uspelo');
            setTimeout(()=>{
                setMessage('');
            }, 5000);
        });

        for (let i = 0; i < e.target.length; i++) {
            e.target.elements[i].value = '';
        }

        e.target.elements[0].focus();
    }

    return (
        <div><h2>Nadzorna plosca</h2><br/>
        <div>
            {message=='uspelo' ? <div className="uspelo">{message}</div>:<></>}
            {message=='ni uspelo' ? <div className="error">{message}</div>:<></>}
        <div className="admin">
            <div className="adminform">
                <h3>Vnesi kategorijo</h3>
                <form onSubmit={handleSubmit}>
                    Naziv<br/><input type="text" name="naziv" required pattern="[A-ZČŠŽa-zčšž\s]+" onChange={ handleChange}></input><br/>
                    Opis<br/><textarea id="opis" name="opis" rows="5" cols="20" maxLength="250" onChange={handleChange}></textarea><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/dodaj-kategorijo.php')}} type="submit" value="Vnesi"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Vnesi izdelek</h3>
                <form onSubmit={handleSubmit}>
                    Naziv<br/><input type="text" name="naziv"required maxLength="25" onChange={ handleChange}></input><br/>
                    Opis<br/><textarea id="opis" name="opis" rows="5" cols="20" maxLength="250" onChange={handleChange}></textarea><br/>
                    Znamka<br/><input type="text" name="znamka" maxLength="25" required onChange={ handleChange}></input><br/>
                    Kategorija: <select name="kategorija" id="kategorija" onClick={handleChange}>
                        <option hidden name=""></option>
                        {category.map((cat)=>(
                            <option name="kategorija" key={cat.IdKategorija} value={cat.IdKategorija}>{cat.naziv}</option>
                        ))}
                    </select><br/>
                    <input onClick={ (e)=>setLink('http://localhost:80/primerjalko-server/dodaj-izdelek.php') } type="submit" value="Vnesi"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Vnesi trgovino</h3>
                <form onSubmit={handleSubmit}>
                    Izdelek: <select name="izdelek" id="izdelek" onClick={handleChange}>
                        <option hidden name=""></option>
                        {izdelek.map((izd)=>(
                            <option defaultValue={izd.IdIzdelek} key={izd.IdIzdelek} value={izd.IdIzdelek}>{izd.naziv}</option>
                        ))}
                    </select><br/>
                    Ime trgovine<br/><input type="text" maxLength="25" name="ime"required onChange={ handleChange}></input><br/>
                    Link do izdelka<br/><input type="text" name="link" required onChange={ handleChange}></input><br/>
                    Cena izdelka<br/><input type="text" name="cena" required pattern="[0-9]+[\.,][0-9]{2}"
                    title="ceno vnesite na dve decimalni mesti z piko" onChange={ handleChange}></input><br/>
                    <input onClick={ (e)=>setLink('http://localhost:80/primerjalko-server/dodaj-trgovino.php') } type="submit" value="Vnesi"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Bannaj uporabnika</h3>
                <form onSubmit={handleSubmit}>
                    Uporabnik: <select name="uporabnik" id="uporabnik" onClick={ handleChange}>
                        <option hidden name=""></option>
                        {uporabnik.map((upo)=>(
                            <option defaultValue={upo.Id} key={upo.Id} value={upo.Id}>{upo.ime}, aktiven: {upo.aktiven}</option>
                        ))}
                    </select><br/>
                    <input onClick={ (e)=>setLink('http://localhost:80/primerjalko-server/spremeni-aktivnost.php') } type="submit" value="Bannaj/Unbannaj"></input>
                </form><br/>
                <h3>Briši uporabnika</h3>
                <form onSubmit={handleSubmit}>
                    Uporabnik: <select name="uporabnik" id="uporabnik" onClick={ handleChange}>
                        <option hidden name=""></option>
                        {uporabnik.map((upo)=>(
                            <option defaultValue={upo.Id} key={upo.Id} value={upo.Id}>{upo.ime}, aktiven: {upo.aktiven}</option>
                        ))}
                    </select><br/>
                    <input onClick={ (e)=>setLink('http://localhost:80/primerjalko-server/brisi-uporabnika.php') } type="submit" value="Briši"></input>
                </form>
            </div></div>
            <div className="admin">
            <div className="adminform">
                <h3>Briši kategorijo</h3>
                <form onSubmit={handleSubmit}>
                    Kategorija: <select name="kategorija" id="kategorija" onClick={handleChange}>
                        <option hidden name=""></option>
                        {category.map((cat)=>(
                            <option name="kategorija" key={cat.IdKategorija} value={cat.IdKategorija}>{cat.naziv}</option>
                        ))}
                    </select><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/brisi-kategorijo.php')}} type="submit" value="Briši"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Briši izdelek</h3>
                <form onSubmit={handleSubmit}>
                    Izdelek: <select name="izdelek" id="izdelek" onClick={handleChange}>
                        <option hidden name=""></option>
                        {izdelek.map((izd)=>(
                            <option defaultValue={izd.IdIzdelek} key={izd.IdIzdelek} value={izd.IdIzdelek}>{izd.naziv}</option>
                        ))}
                        </select><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/brisi-izdelek.php')}} type="submit" value="Briši"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Briši trgovino</h3>
                <form onSubmit={handleSubmit}>
                    Trgovina: <select name="trgovina" id="trgovina" onClick={handleChange}>
                        <option hidden name=""></option>
                        {trgovina.map((trg)=>(
                            <option defaultValue={trg.IdTrgovina} key={trg.IdTrgovina} value={trg.IdTrgovina}>{trg.ime + ': ' + trg.naziv + ', ' + trg.cena + '€'}</option>
                        ))}
                        </select><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/brisi-trgovino.php')}} type="submit" value="Briši"></input>
                </form>
            </div>
            
            <div className="adminform">
                <h3>Briši oceno</h3>
                <form onSubmit={handleSubmit}>
                    Ocena: <select name="ocena" id="ocena" onClick={handleChange}>
                        <option hidden name=""></option>
                        {ocena.map((oce)=>(
                            <option defaultValue={oce.IdOcena} key={oce.IdOcena} value={oce.IdOcena}>{oce.naziv + ': ' + oce.ime + ', ' + oce.vrednost + ', ' + oce.komentar}</option>
                        ))}
                        </select><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/brisi-oceno.php')}} type="submit" value="Briši"></input>
                </form>
            </div></div>
        </div>
        </div>
    );
}
 
export default AdminPanel;