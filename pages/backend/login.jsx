import {useRouter} from "next/router";
import {useState} from "react";
import {Button, Form} from "react-bootstrap";
import axios from "axios";


export default function login() {
    const [user, setUser] = useState(null);
    const [password, setPassword] = useState(null);
    const [error, setError] = useState(false);

    const router = useRouter();

    const login = async () => {
        try {
            await axios.post("http://localhost:3000/api/login", {
                user, password
            })
            router.push("/backend")
        }
        catch (error) {
            setError(true);
        }
    }

    return (
        <div>
            <h1>Login</h1>
            {error && <p className="danger">Login fehlgeschlagen</p> }
            <div className="row mt-4">
                <Form>
                    <Form.Group className="mb-3" controlId="user">
                        <Form.Control type="text" placeholder="Benutzer"
                                      onChange={(e) => setUser(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Control type="password" placeholder="Passwort"
                                      onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" onClick={login}>Login</Button>
                </Form>
            </div>
        </div>
    )
}