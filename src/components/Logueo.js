import React, { useState, useEffect } from "react";
import { Stack, Container, Form, Button, Dropdown } from "react-bootstrap";
import firebaseApp from "../credenciales";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, updateDoc, getDocs, collection, onSnapshot, setDoc, getDoc, doc } from "firebase/firestore";

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(firebaseApp);
export const Logueo = () => {
    const [estaRegistrandose, setEstaRegistrandose] = useState(false);
    const [arrayEmpresas, setArrayEmpresas] = useState([])
    const [selectedItem, setSelectedItem] = useState("");


    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.formBasicEmail.value;
        const contra = e.target.formBasicPassword.value;
        console.log(correo, contra);
        if (estaRegistrandose) {
            const usuario = await createUserWithEmailAndPassword(auth, correo, contra);
            console.log(usuario);

            const empresa = selectedItem;
            // actualizar base de datos
            const docRef = doc(firestore, `Users/${correo}`);
            const consulta = await getDoc(docRef);
            if(!consulta.exists()){
                setDoc(docRef, {empresa: empresa});
            }
        }
        else {
            signInWithEmailAndPassword(auth, correo, contra);
        }
    }

    useEffect(
        () =>
            onSnapshot(collection(firestore, "Companies"), (snapshot) =>
                setArrayEmpresas(snapshot.docs.map((doc) => doc.data()))
            ),
        []
    );

    async function añadirEmpresa(e) {
        e.preventDefault();
      }


    return (
        <Container>
            <Stack gap={3}>
                <h1>{estaRegistrandose ? "Regístrate" : "Inicia Sesión"}</h1>
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    {
                        estaRegistrandose ? <Dropdown>
                            <Dropdown.Toggle variant="primary" style={{ width: "300px" }}>
                                Selecciona una empresa
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {arrayEmpresas.map((objetoEmpresa) => {
                                    return (
                                        <Dropdown.Item href="#/action-1" onClick={() => setSelectedItem(objetoEmpresa.name)}>{objetoEmpresa.name}</Dropdown.Item>
                                    );
                                })}
                            </Dropdown.Menu>
                        </Dropdown> : ""
                    }
                    <br />
                    <Button variant="primary" type="submit" style={{ width: "300px" }}>
                        {estaRegistrandose ? "Regístrate" : "Inicia sesión"}
                    </Button>
                </Form>
                <Button variant="dark" type="submit" style={{ width: "300px" }} onClick={() => signInWithRedirect(auth, googleProvider)}>
                    Acceder con Google
                </Button>

                <Button variant="secondary" type="submit" onClick={() => setEstaRegistrandose(!estaRegistrandose)} style={{ width: "300px" }}>
                    {estaRegistrandose ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
                </Button>
            </Stack>
        </Container>
    );
}