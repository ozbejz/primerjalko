import { useEffect, useState } from "react";
import { useParams } from "react-router";

const KatDetails = () => {
  {/* Bere podatke iz json pod. baze, odvisno na katero kategorijo smo kliknili*/}
    const { id } = useParams();
    const [izdelki, setIzdelki] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    let link = 'https://api.jsonbin.io/v3/b/63aedeaf01a72b59f23c674f';
    let izdelek;
    useEffect(() => {
        fetch(link)
          .then(res => {
            if(!res.ok){
              throw Error('could not get data from json server');
            }
            return res.json();
          })
          .then(data => {
            let { record } = data;
            /* Ce obstajajo podatki o kategoriji(izdelki) na bazi(ce sem jih ze dodal), jih shrani z setIzdelek,
            z record dobimo celo bazo, z id-jem kategorije pa izdelke za doloceno kategorijo*/
            if(record[`${id}`])
              izdelek = record[`${id}`];
            setIzdelki(izdelek);
            setIsPending(false);
            setError(null);
          })
          .catch(err =>{
            setIsPending(false);
            setError(err.message);
          })
      }, [id]);
    return (
        <div className="kat-details">
          {error && <div className="obvestila">{error}</div>}
          {isPending && <div className="obvestila">Loading...</div>}
          {/* loopa cez izdelke in izpise njegove podatke */}
            {izdelki && izdelki.map((izd)=>(
                <div className="izdelek" key={izd.ime}>
                  <a className="linkDoIzd" href = {izd.image_url}><h4>{izd.ime}</h4></a>
                  <div className="opis">
                    <img src = {izd.image}></img>
                    <div className="cena">{izd.cena}</div>
                  </div>
                </div>
            ))}
        </div>
     );
}
 
export default KatDetails;