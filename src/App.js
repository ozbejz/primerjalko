{/* git commit -m d */}
{/*import { useState } from "react";
import $ from "jquery";
import Navbar from './Navbar';
import Home from './Home';
import Kategorije from './Kategorije';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Kategorije></Kategorije>
      <Home></Home>
      <div className='content'>


      </div>

    </div>
  );
}

export default App;

*/}

  
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