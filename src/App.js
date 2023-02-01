import { useState } from "react";
import $ from "jquery";
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

function App() {
  return (
      <Router>
        
        <div className="App">
        <Navbar></Navbar>

            <div className='content'>
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
                </Switch>
            </div>
        </div>
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
    </Router>
  );
}

export default App;

{/*

  
function App() {
    const [name, setName] = useState("");
    const [result, setResult] = useState("");
  
    const handleChange = (e) => {
        setName(e.target.value);
    };
  
    const handleSumbit = (e) => {
        e.preventDefault();
        const form = $(e.target);
        $.ajax({
            type: "POST",
            url: form.attr("action"),
            data: form.serialize(),
            success(data) {
                setResult(data);
            },
        });
    };
  
    return (
        <div className="App">
            <form
                action="http://localhost:80/server.php"
                method="post"
                onSubmit={(event) => handleSumbit(event)}>
                <label htmlFor="name">Name: </label>
                <input type="text" id="name" name="name" value={name} onChange={(event) => handleChange(event)}/>
                <br />
                <button type="submit">Submit</button>
            </form>
            <h1>{result}</h1>
        </div>
    );
}
  
export default App;
*/}