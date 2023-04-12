import React, { useState, useContext } from 'react';
import api from '../Api';
import Auth from '../context/AuthContext';
import Cookies from 'js-cookie';

function FormulaireConnexion() {
    const [user, setUser] = useState({
        username: "",
        pwd: ""
    })
    const [errorAuth, setErrorAuth] = useState("");
    const { setIsAuth } = useContext(Auth);

    function handleChange({ currentTarget }) {
        const { name, value } = currentTarget;

        setUser({ ...user, [name]: value })
    }

    function handleSubmit(event) {
        event.preventDefault();
        api.post('/login', user)
            .then(response => {
                console.log(response)
                Cookies.set('userId', response.data.user, { expires: 7 })
                setIsAuth(true)
            })
            .catch((errorAuth) => {
                setErrorAuth(errorAuth.response.data.error)
            })
    }

    return (
        <div className='formulaire'>
            <form >
                <h1>Connexion</h1>
                <div className="form-group">
                    <label htmlFor="login">
                        Login
                    </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Login" />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="pwd"
                        onChange={handleChange}
                        placeholder="Mot de passe" />
                </div>
                <ul>
                    <button type="submit" onClick={handleSubmit}>Connecter</button>
                    <button type="reset" id="btnAnnuler">Annuler</button>
                </ul>
                <h1 id="warning">{errorAuth}</h1>
                <div id='redirection'>
                    Vous n'avez pas de compte ? <a href="/inscription">Inscrivez-vous</a>.
                </div>
            </form>
        </div >
    );
}


const Connexion = (props) => {
    return (
        <div>
            <FormulaireConnexion />
        </div>
    );
};

export default Connexion;