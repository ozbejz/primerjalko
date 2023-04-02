import { useEffect } from "react";
import { useState } from "react";
import SearchResultList from "./SearchResultList";

const Search = () => {
    const [q, setQ] = useState(null);
    const [najdeni, setNajdeni] = useState(null);

    useEffect(()=>{
        const isci = async()=>{
          let h = new Headers();
            h.append('isci', q);
            let req = new Request("http://localhost:80/primerjalko-server/iskanje.php", {
              method: 'POST',
              headers: h
            });
            const res = await fetch(req);
            const getdata = await res.json();
            setNajdeni(getdata);
          }
          isci();
      },[q]);
      
    return (
        <div className="search-bar-container">
          <label htmlFor="search-form">
          <input type="search" name="search-form" id="search-form" className="search-input" placeholder="Išči izdelke..." onChange={(e) => setQ(e.target.value)} />
          </label>
          {najdeni && najdeni.length !== 0 ? <SearchResultList result={najdeni}></SearchResultList>: <></>}
        </div>
    );
}
 
export default Search;