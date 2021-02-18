import React, {useState} from "react"
import {Card, Button, Alert} from "react-bootstrap";
import {useAuth} from "../contexts/AuthContext";
import {Link, useHistory} from "react-router-dom";

export default function Dashboard() {
    const [error, setError] = useState("")
    const {currentUser, logout} = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError('')

        try{
            await logout()
            history.push("/login")
        }catch{
            setError('Impossible de se déconnecter')
        }
    }

    return(
        <>
            <Card>
                <Card.Body>
                    {/*{JSON.stringify(currentUser)}*/}
                    <h2 className="text-center mb-4">Profil</h2>
                    <div>
                        {currentUser.photoURL}
                    </div>
                    {error && <Alert variant={"danger"}>{error}</Alert>}
                    <strong>Email : </strong> {currentUser.email}
                    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Mettre à jour son profil</Link>
                    <Link to="/task-manager" className="btn btn-primary w-100 mt-3">Gérer ses tâches</Link>
                </Card.Body>
            </Card>

            <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>Se déconnecter</Button>
            </div>
        </>
    )
}