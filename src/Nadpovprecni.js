import { useState } from "react";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const Nadpovprecni = () => {
    const [izdelki, setIzdelek] = useState([]);
    useEffect(()=>{
        const getcategory = async()=>{
            const res = await fetch('http://localhost:80/primerjalko-server/nadpovprecni-izdelki.php');
            const getdata = await res.json();
            setIzdelek(getdata);
            console.log(getdata);
        }
        getcategory();
    }, [])
    return (
        <div>
            <h2>Najbolje ocenjeni izdelki</h2>
            {izdelki && izdelki.map((izd)=>(
            <div className="izdelek" key={izd.IdIzdelek}>
                <Link to={`/primerjalko/izdelki/${izd.IdIzdelek}`}>
                
                <h4>{izd.naziv} </h4>
                <ReactStars value={izd.vrednost} isHalf={true} edit={false} size = {30} />
                <h4>{izd.cena} €</h4>
                </Link>
            </div>
            ))}
        </div>
    );
}
 
export default Nadpovprecni;