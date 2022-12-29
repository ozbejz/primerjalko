import { useEffect, useState } from "react";
import { useParams } from "react-router";

const KatDetails = () => {
    const { id } = useParams();
    const [izdelki, setIzdelki] = useState(null);
    let link = 'https://api.jsonbin.io/v3/b/63adbdbc01a72b59f23bc93d';
    useEffect(() => {
        fetch(link)
          .then(res => {
            return res.json();
          })
          .then(data => {
            let { record } = data;
            let { telefon } = record;
            console.log(data.telefon);
            setIzdelki(telefon);
            
          })
      }, [])

    return ( 
        <div className="kat-details">
            {izdelki && izdelki.map((izd)=>(
                <div key={izd.ime}>
                  <h2>{izd.ime}</h2>
                </div>
            ))}
        </div>
     );
}
 
export default KatDetails;