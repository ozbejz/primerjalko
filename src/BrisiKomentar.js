import axios from "axios";

const BrisiKomentar = (props) => {
    let link = 'http://localhost:80/primerjalko-server/brisi-oceno.php';
    let ocena = {ocena: props.IdOcena};
    const brisi = async (e) =>{
        axios.post(link, ocena)
          .then(function(response){
            if(response.data['status'] === 1){
                window.location.reload(true);
            }
            else
                alert("ni uspelo");
        });
    }

    if(props.jeAdmin === 1){
        return (
            <div>
                <button onClick={brisi}>briši</button>
            </div>
        );
    }

    if(props.IdUporabnik === props.IdAvtor){
        return (
            <div>
                <button onClick={brisi}>briši</button>
            </div>
        );
    }
    return (
        <div>
        </div>
    );
}
 
export default BrisiKomentar;