import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Kategorije from "./Kategorije";

const KatDetails = () => {
  const { id } = useParams();
  const [izdelki, setIzdelki] = useState(null);
  const [znamke, setZnamke] = useState(null);
  const [filterBrand, setFilterBrand] = useState([]);
  const [filtrirani, setFiltrirani] = useState([]);
  const [update, setUpdate] = useState(null);

  let link = 'http://localhost:80/primerjalko-server/izdelki.php';
  let link2 = 'http://localhost:80/primerjalko-server/znamke.php';

  useEffect(() => {

    setFilterBrand([]);

    const getizdelek = async()=>{
      let h = new Headers();
      h.append('id', id);
      let req = new Request(link, {
        method: 'POST',
        headers: h
      });
           
      const res = await fetch(req).then();
      const getdata = await res.json();
      setIzdelki(getdata);
    }

    getizdelek();

    const getznamka = async()=>{
      let h = new Headers();
      h.append('id', id);

      let req = new Request(link2, {
        method: 'POST',
        headers: h
      });
      const res = await fetch(req);
      const getdata = await res.json();
      setZnamke(getdata);
    }
    getznamka();

    setFiltrirani([]);
    setFilterBrand([]);
    
    const select = document.getElementById('razvsrscanje');
    select.value = 'ocenjeni';

  }, [id, update]);

  const handleBrandChange = (e) => {
    /* preveri ce je znamka ze v arraju, ce je ni, jo doda, ce je, jo odstrani */
    const isFound = filterBrand.some(element => {
      if (element === e.target.value) {
        return true;
      }
      return false;
    });
    if(!isFound){
      setFilterBrand(filterBrand=>[... filterBrand, e.target.value]);
    }
    else{
      setFilterBrand(filterBrand.filter(item => item !== e.target.value));
    }
  }

  /* filtrira izdelke */
  const filtriraj = (e) =>{
    let filtered = izdelki.map((izd)=>{
      if(filterBrand.includes(izd.znamka)){
        return izd;
      }
      else{
        return null;
      }
    })
    setFiltrirani(filtered.filter(item => item !== null));
  }

  const ponastavi = (e) =>{
    setFiltrirani([]);
    setFilterBrand([]);
    let c = document.getElementsByClassName("checkbox");
    for(let i = 0; i<c.length; i++){
      document.getElementsByClassName("checkbox")[i].checked=false;
    }
  }

  const razvrsti = (e) =>{
    switch (e.target.value) {
      case 'ocenjeni':
        setIzdelki([...izdelki].sort((a,b)=>{
          if (a.vrednost > b.vrednost) {
            return -1;
          }
          if (a.vrednost < b.vrednost) {
            return 1;
          }
          return 0;
        }));
        setFiltrirani([...filtrirani].sort((a,b)=>{
          if (a.vrednost > b.vrednost) {
            return -1;
          }
          if (a.vrednost < b.vrednost) {
            return 1;
          }
          return 0;
        }));
        break;
      case 'drazji':
        setIzdelki([...izdelki].sort((a,b)=>{
          if (a.cena > b.cena) {
            return -1;
          }
          if (a.cena < b.cena) {
            return 1;
          }
          return 0;
        }));
        setFiltrirani([...filtrirani].sort((a,b)=>{
          if (a.cena > b.cena) {
            return -1;
          }
          if (a.cena < b.cena) {
            return 1;
          }
          return 0;
        }));
        break;
      case 'cenejsi':
        setIzdelki([...izdelki].sort((a,b)=>{
          if (a.cena < b.cena) {
            return -1;
          }
          if (a.cena > b.cena) {
            return 1;
          }
          return 0;
        }));
        setFiltrirani([...filtrirani].sort((a,b)=>{
          if (a.cena < b.cena) {
            return -1;
          }
          if (a.cena > b.cena) {
            return 1;
          }
          return 0;
        }));
        break;
      default:
        break;
    }
  }

  return (
    <div className="kat-details">
      <Kategorije></Kategorije>
      <div>
      <div className="admin">
      <div className="filtriranje">
        {znamke && znamke.map((zna)=>(
          <label key={zna.znamka}>
            <input className="checkbox" id="checkbox" type={"checkbox"} value={zna.znamka} onChange={handleBrandChange} ></input>{zna.znamka}<br/>
          </label>
        ))}
        <button onClick={ filtriraj } >filtriraj</button>
        <button onClick={ ponastavi } >ponastavi</button>
      </div>
      <div >
      <select className="razvrscanje" name="razvsrscanje" id="razvsrscanje" defaultValue="ocenjeni" onChange={razvrsti}>
        <option value="ocenjeni" >Najbolje ocenjeni</option>
        <option value="cenejsi">Cenejši naprej</option>
        <option value="drazji">Dražji naprej</option>
      </select></div></div>
      {filtrirani.length !==0 ? (filtrirani.map((izd)=>(
          <div className="izdelek" key={izd.IdIzdelek}>
            <Link to={`/izdelki/${izd.IdIzdelek}`}>
            <h4>{izd.naziv}</h4>
            <ReactStars value={izd.vrednost} isHalf={true} edit={false} size = {30} />
            <h4>{izd.cena} €</h4>
            </Link>
          </div>
      ))): (
            izdelki && izdelki.map((izd)=>(
          <div className="izdelek" key={izd.IdIzdelek}>
            <Link to={`/izdelki/${izd.IdIzdelek}`}>
            <h4>{izd.naziv}</h4>
            <ReactStars value={izd.vrednost} isHalf={true} edit={false} size = {30} />
            <h4>{izd.cena} €</h4>
            </Link>
          </div>
      ))
      )}
      </div>
      
    </div>
  );
}
 
export default KatDetails;