import React, {useState, useEffect} from "react"
import Home from "./components/Home";
import { Logueo } from "./components/Logueo";
import firebaseApp from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if(usuarioFirebase){
      setUsuarioGlobal(usuarioFirebase);
    }
    else {
      setUsuarioGlobal(null);
    }
  })

  return <> { usuarioGlobal ? <Home correoUsuario = {usuarioGlobal.email} /> : <Logueo/>}</>;
}

export default App;