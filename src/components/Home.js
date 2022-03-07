import React, { useState, useEffect } from "react";

import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { Container, Button } from "react-bootstrap";
import AgregarTarea from "./AgregarTarea";
import ListadoTareas from "./ListadoTareas";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    console.log(correoUsuario);

    const [arrayTareas, setArrayTareas] = useState(null);

    const fakeData = [
        { id: 1, descripcion: "Tarea falsa 1", url: "https://picsum.photos/420" },
        { id: 2, descripcion: "Tarea falsa 2", url: "https://picsum.photos/420" },
        { id: 3, descripcion: "Tarea falsa 3", url: "https://picsum.photos/420" },
    ];

    const [user, setUser] = useState({})

    async function buscarDocumentoOCrearDocumento(idDocumento) {
        const docRef = doc(firestore, `Users/${idDocumento}`);
        const consulta = await getDoc(docRef);
        if (consulta.exists()) {
            const infDoc = consulta.data();
            setUser({ correoUsuario, ...consulta.data() })
            return infDoc.tareas;
        }
        else {
            setDoc(docRef, { tareas: [...fakeData] });
            const consulta = await getDoc(docRef);
            const infDoc = consulta.data();
            return infDoc.tareas;
        }

    }

    async function buscarEmpresa(idDocumento){
        const docRef = doc(firestore, `Users/${idDocumento}`);
        const consulta = await getDoc(docRef);
        setUser({ correoUsuario, ...consulta.data() })
    }

    useEffect(() => {
        async function fetchTareas() {
            buscarEmpresa(correoUsuario);
            const tareasFetchadas = await buscarDocumentoOCrearDocumento(correoUsuario);
            setArrayTareas(tareasFetchadas);
        }
        fetchTareas();
    }, [])

    return <Container>
        <h4>
            Hola, sesión iniciada. Eres empleado de {user.empresa}
        </h4>
        <Button onClick={() => signOut(auth)}>
            Cerrar sesión
        </Button>
        <hr />
        <AgregarTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} />
        {
            arrayTareas ? <ListadoTareas arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} />
                : null
        }
    </Container>
}

export default Home;