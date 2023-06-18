import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Kategorije from "./Kategorije";
import ReactStars from 'react-rating-stars-component';
import axios from "axios";
import BrisiKomentar from "./BrisiKomentar";

const IzdDetails = () => {
  const { id } = useParams();
  const [izdelek, setIzdelek] = useState(null);
  const [ocene, setOcene] = useState(null);
  const [trgovine, setTrgovine] = useState(null);
  const [prijavljen, setPrijavljen] = useState(false);
  const [update, setUpdate] = useState([]);

  let linkIzd = 'http://localhost:80/primerjalko-server/getizdelek.php';

  let linkTrg = 'http://localhost:80/primerjalko-server/gettrgovine.php';

  let linkOce = 'http://localhost:80/primerjalko-server/getocene.php';

  useEffect(() => {
      let data = {};
      const getprijavljen = async()=>{
          axios.post("http://localhost:80/primerjalko-server/prijavljen.php", data, {withCredentials: true})
              .then(function(response){
              setPrijavljen(response.data);
          });
      }
      getprijavljen();
  }, []);

  useEffect(() => {
      const getizdelek = async()=>{
        let h = new Headers();
        h.append('id', id);

        let req = new Request(linkIzd, {
          method: 'POST',
          headers: h
        });
        const res = await fetch(req);
        const getdata = await res.json();
        setIzdelek(getdata);
        if(getdata[0] == null){
          console.log("null");
          return(
            <div className="adminform">aaa</div>
          );
        }
      }
      getizdelek();
  }, [id]);

  useEffect(() => {
      const getocena = async()=>{
        let h = new Headers();
        h.append('id', id);
        let req = new Request(linkOce, {
          method: 'POST',
          headers: h
        });
        const res = await fetch(req);
        const getdata = await res.json();
        setOcene(getdata);
        console.log(getdata);
      }
      getocena();
  }, [update]);
  
  useEffect(() => {
    const gettrgovina = async()=>{
      let h = new Headers();
      h.append('id', id);
      let req = new Request(linkTrg, {
        method: 'POST',
        headers: h
      });
      const res = await fetch(req);
      const getdata = await res.json();
      setTrgovine(getdata);
    }
    gettrgovina();
  }, [id]);

const [ocena, setOcena] = useState(0);
const ratingChanged = (newRating) => {
  setOcena(newRating);
};

const preveri = (e) => {
  if(ocena === 0){
    e.preventDefault();
    return false;
  }
  handleSubmit(e);
}

const handleSubmit = async (e) => {
  e.preventDefault();
  let data = {["komentar"]: e.target[0].value, ["vrednost"]: e.target[2].value, ["IdIzdelek"]: e.target[1].value};
  axios.post("http://localhost:80/primerjalko-server/dodaj-komentar.php", data, {withCredentials: true})
    .then(function(response){
      setUpdate(Math.random());
  });
  
  for (let i = 0; i < e.target.length; i++) {
    e.target.elements[i].value = '';
}
}

return (
  <div className="kat-details">
    <Kategorije></Kategorije>
    {izdelek && izdelek.map((izd)=>(
          <div className="izdelek" key={izd.naziv}>
            <h4>{izd.naziv}</h4>
            <h4>{izd.znamka}</h4>
            <div>{izd.opis}</div>
          </div>
      ))}
      <br></br>
      <h3>Trgovine</h3>
      {trgovine && trgovine.map((trg)=>(
          <div className="izdelek" key={trg.IdTrgovina}>
            <h4> <a className="visible" href= {trg.link}>{trg.ime}</a></h4>
            <h4>{trg.cena} €</h4>
          </div>
      ))}
      <br></br>
      <h3>Mnenja</h3>
      {ocene && ocene.map((oce)=>(
          <div className="izdelek" key={oce.IdOcena}>
            <ReactStars size={40} value = {oce.vrednost} edit = {false} />
            <div>{oce.komentar}</div>
            <h4>-{oce.ime}</h4>
            <BrisiKomentar IdOcena={oce.IdOcena} IdAvtor ={oce.Id} IdUporabnik={prijavljen.Id} jeAdmin={prijavljen.je_admin}></BrisiKomentar>
          </div>
      ))}

      {prijavljen.aktiven ? (
          <div className="komentar">
          <form onSubmit={preveri}>
              dodaj oceno: <ReactStars size = {40} onChange={ratingChanged}/>
              dodaj komentar: <br/><textarea id="komentar" name="komentar" rows="5" cols="20" maxLength={100}></textarea><br/>
              <input type="hidden" name="IdIzdelek" value={id}/>
              <input type="hidden" name="vrednost" value={ocena} />
              <input type="submit" name ="dodaj" value="dodaj" />
          </form>
      </div>
      ) : (
        <div className="komentar">Za komentiranje se <a className="visible" href="/primerjalko/prijava">prijavite</a></div>
      )}

  </div>
  );
}

export default IzdDetails;