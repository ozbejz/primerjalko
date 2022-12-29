import { useParams } from "react-router";

const KatDetails = () => {
    const { id } = useParams();

    return ( 
        <div className="kat-details">
            <h2>Kategorija - {id}</h2>
        </div>
     );
}
 
export default KatDetails;