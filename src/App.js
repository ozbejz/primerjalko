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

function App() {
    /*
    const [prijavljen, setPrijavljen] = useState(false);
    useEffect(() => {
        const getprijavljen = async()=>{
            let req = new Request("http://localhost:80/primerjalko-server/prijavljen.php", {
            method: 'POST',
            });
            const res = await fetch(req);
            const getdata = await res.json();
            setPrijavljen(getdata);
            console.log(getdata);
        }
        getprijavljen();
    }, []);*/
  return (
      <Router>
        <Navbar></Navbar>
            
        <Switch>
        <Route exact path="/">
            <Home></Home>
        </Route>
        <Route path="/kategorije/:id">
            <KatDetails></KatDetails>
        </Route>
        <Route path="/registracija">
            <Registracija/>
        </Route>
        <Route path="/prijava">
            <Prijava></Prijava>
        </Route>
        <Route path="/uspesna-registracija">
            <RegUspensa></RegUspensa>
        </Route>
        <Route path="/uspesna-prijava">
            <PrijavaUspesna></PrijavaUspesna>
        </Route>
        <Route path="/admin-panel">
            <AdminPanel></AdminPanel>
        </Route>
        <Route path="/izdelki/:id">
            <IzdDetails></IzdDetails>
        </Route>
        <Route path="*">
            <NotFound></NotFound>
        </Route>

        </Switch>
    </Router>
  );
}

export default App;