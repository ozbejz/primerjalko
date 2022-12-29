import { useEffect, useState } from "react";

function Home(){
    test();
    function test(){
            fetch('http://localhost:8000/telefon')
                .then(res=>{
                    return res.json();
          })
            .then(data => {
            })
    }


    return(
        <div>
            
        </div>
    );
}

export default Home;