import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AdminPanel = () => { 
    const [inputs, setInputs] = useState({});
    const [link, setLink] = useState([]);
    const [category, setCategory] = useState([]);
    const [izdelek, setIzdelek] = useState([]);
    const [uporabnik, setUporabnik] = useState([]);
    const [update, setUpdate] = useState([]);

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
            console.log(response.data);
            if(response.data['status'] === 1){
                alert("uspelo");
            }
            else
                alert("ni uspelo");
        });

        for (let i = 0; i < e.target.length; i++) {
            e.target.elements[i].value = '';
        }

        e.target.elements[0].focus();
    }

    return (
        <div><h2>Nadzorna plosca</h2><br/>
        <div className="admin">
            <div className="adminform">
                <h3>Vnesi kategorijo</h3>
                <form onSubmit={handleSubmit}>
                    Naziv<br/><input type="text" name="naziv" required onChange={ handleChange}></input><br/>
                    Opis<br/><textarea id="opis" name="opis" rows="5" cols="20" onChange={handleChange}></textarea><br/>
                    <input onClick={ (e)=>{setLink('http://localhost:80/primerjalko-server/dodaj-kategorijo.php')}} type="submit" value="Vnesi"></input>
                </form>
            </div>
            <div className="adminform">
                <h3>Vnesi izdelek</h3>
                <form onSubmit={handleSubmit}>
                    Naziv<br/><input type="text" name="naziv"required onChange={ handleChange}></input><br/>
                    Opis<br/><textarea id="opis" name="opis" rows="5" cols="20" onChange={handleChange}></textarea><br/>
                    Znamka<br/><input type="text" name="znamka" required onChange={ handleChange}></input><br/>
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
                    Ime trgovine<br/><input type="text" name="ime"required onChange={ handleChange}></input><br/>
                    Link do izdelka<br/><input type="text" name="link" required onChange={ handleChange}></input><br/>
                    Cena izdelka<br/><input type="text" name="cena" required pattern="[0-9]+[\.][0-9]{2}"
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
                </form>
            </div>
        </div>
        </div>
    );
}
 
export default AdminPanel;