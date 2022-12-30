import { useEffect, useState } from "react";
import { useParams } from "react-router";

const KatDetails = () => {
    const { id } = useParams();
    const [izdelki, setIzdelki] = useState(null);
    let link = 'https://api.jsonbin.io/v3/b/63aedeaf01a72b59f23c674f';
    let izdelek;
    useEffect(() => {
        fetch(link)
          .then(res => {
            return res.json();
          })
          .then(data => {
            let { record } = data;
            if(record[`${id}`])
              izdelek = record[`${id}`];
            console.log('izdelek: ',izdelek);
            setIzdelki(izdelek);
          })
      }, [id]);
    return (
        <div className="kat-details">
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