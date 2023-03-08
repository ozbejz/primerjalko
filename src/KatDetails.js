import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Kategorije from "./Kategorije";

const KatDetails = () => {
    const { id } = useParams();
    const [izdelki, setIzdelki] = useState(null);
    let link = 'http://localhost:80/primerjalko-server/izdelki.php';
    let izdelek;
    useEffect(() => {
      const getizdelek = async()=>{
        let h = new Headers();
        h.append('id', id);

        let req = new Request(link, {
          method: 'POST',
          headers: h
        });
        const res = await fetch(req);
        const getdata = await res.json();
        setIzdelki(getdata);
        console.log(getdata);
      }
      getizdelek();
    }, [id]);

    return (
        <div className="kat-details">
          <Kategorije></Kategorije>
            {izdelki && izdelki.map((izd)=>(
                <div className="izdelek" key={izd.IdIzdelek}>
                  <Link to={`/izdelki/${izd.IdIzdelek}`}>
                  <h4>{izd.naziv}</h4>
                  </Link>
                </div>
            ))}
        </div>
     );
}
 
export default KatDetails;