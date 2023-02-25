import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Kategorije from "./Kategorije";

const IzdDetails = () => {
    const { id } = useParams();
    const [izdelek, setIzdelek] = useState(null);
    const [komentarji, setKomentar] = useState(null);
    const [trgovine, setTrgovine] = useState(null);
    
    let linkIzd = 'http://localhost:80/primerjalko-server/getizdelek.php';

    let linkTrg = 'http://localhost:80/primerjalko-server/trgovine.php';

    let linkKom = 'http://localhost:80/primerjalko-server/komentarji.php';

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

    /*
    useEffect(() => {
        const getkomentar = async()=>{
          let h = new Headers();
          h.append('id', id);
          let req = new Request(linkKom, {
            method: 'POST',
            headers: h
          });
          const res = await fetch(req);
          const getdata = await res.json();
          setKomentar(getdata);
        }
        getkomentar();
    }, [id]);
    */
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

           {trgovine && trgovine.map((trg)=>(
                <div className="izdelek" key={trg.IdTrgovina}>
                  <h4>{trg.ime}</h4>
                  <h4>{trg.link}</h4>
                  <h4>{trg.cena}</h4>
                </div>
            ))}

            <div className="adminform">
                <form action="http://localhost:80/primerjalko-server/dodaj-komentar.php" method="POST">
                    dodaj oceno: <input type="number" name="vrednost" min = "1" max = "5" required/><br/>
                    dodaj komentar: <input type="text" name="komentar"/><br/>
                    <input type="hidden" name="IdIzdelek" value={id} />
                    <input type="submit" value="dodaj" />
                </form>
            </div>
        </div>
     );
}
 
export default IzdDetails;