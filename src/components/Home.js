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

    const [arrayTareas, setArrayTareas] = useState(null);

    const [user, setUser] = useState({})

    async function buscarDocumentoOCrearDocumento(idDocumento) {
        console.log(idDocumento);
        const docRef = doc(firestore, `Companies/${idDocumento}`);
        const consulta = await getDoc(docRef);
        if (consulta.exists()) {
            const infDoc = consulta.data();
            console.log(infDoc.tareas);
            return infDoc.tareas;
        }
        // else {
        //     setDoc(docRef, { tareas: [...fakeData] });
        //     const consulta = await getDoc(docRef);
        //     const infDoc = consulta.data();
        //     return infDoc.tareas;
        // }

    }

    async function buscarEmpresa(idDocumento){
        const docRef = doc(firestore, `Users/${idDocumento}`);
        const consulta = await getDoc(docRef);
        setUser({ correoUsuario, ...consulta.data() })
    }

    useEffect((e) => {
        async function fetchTareas() {
            await buscarEmpresa(correoUsuario);
            console.log(user.empresa);
            const tareasFetchadas = await buscarDocumentoOCrearDocumento(user.empresa);
            setArrayTareas(tareasFetchadas);
        }
        fetchTareas();
    }, [user.empresa])

    return <Container>
        <h4>
            Hola, sesión iniciada. Eres empleado de {user.empresa}
        </h4>
        <Button onClick={() => signOut(auth)}>
            Cerrar sesión
        </Button>
        <hr />
        <AgregarTarea arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} empresa = {user.empresa}/>
        {
            arrayTareas ? <ListadoTareas arrayTareas={arrayTareas} setArrayTareas={setArrayTareas} correoUsuario={correoUsuario} empresa = {user.empresa} />
                : null
        }
    </Container>
}

export default Home;