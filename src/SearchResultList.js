import { Link } from "react-router-dom";

const SearchResultList = ({result}) => {
    console.log(result);
    return (
        <div className="results-list">
        
          {result && result.map((izd)=>(
            <div className="search-result" key={izd.naziv}>
            <Link to={`/izdelki/${izd.IdIzdelek}`}>
              <h4>{izd.naziv}</h4>
            </Link>
            </div>
        ))}
        </div>
    );
}
 
export default SearchResultList;