import Navbar from './Navbar';
import Home from './Home';
import Kategorije from './Kategorije';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import KatDetails from "./KatDetails";
import Prijava from "./Prijava"
import Registracija from "./Registracija";
import RegUspensa from "./RegUspesna";
import PrijavaUspesna from "./PrijavaUspesna";
import AdminPanel from "./AdminPanel";
import IzdDetails from "./IzdDetails";
import NotFound from "./NotFound";
import { useEffect, useState } from 'react';
import axios from 'axios';
import Odjava from './Odjava';

function App() {
    
    const [prijavljen, setPrijavljen] = useState(false);
    useEffect(() => {
        let data = {};
        const getprijavljen = async()=>{
            axios.post("http://localhost:80/primerjalko-server/prijavljen.php", data, {withCredentials: true})
                .then(function(response){
                setPrijavljen(response.data);
            });
        }
        getprijavljen();
    }, []);

  return (
      <Router>
        <Navbar></Navbar>
        <Switch>
        <Route exact path="/primerjalko/">
            <Home></Home>
        </Route>
        <Route path="/primerjalko/kategorije/:id">
            <KatDetails></KatDetails>
        </Route>
        <Route path="/primerjalko/registracija">
            <Registracija/>
        </Route>
        <Route path="/primerjalko/prijava">
            <Prijava></Prijava>
        </Route>
        <Route path="/primerjalko/odjava">
            <Odjava></Odjava>
        </Route>
        <Route path="/primerjalko/uspesna-registracija">
            <RegUspensa></RegUspensa>
        </Route>
        <Route path="/primerjalko/uspesna-prijava">
            <PrijavaUspesna></PrijavaUspesna>
        </Route>
        <Route path="/primerjalko/izdelki/:id">
            <IzdDetails></IzdDetails>
        </Route>
        {prijavljen.je_admin ?
            <Route path="/primerjalko/admin-panel">
                <AdminPanel></AdminPanel>
            </Route>
            : null
        }
        <Route path="/primerjalko/*">
            <NotFound></NotFound>
        </Route>
        </Switch>
    </Router>
  );
}

export default App;