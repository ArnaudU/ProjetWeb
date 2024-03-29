import React, { useState } from 'react';
import { signup } from '../services/AuthApi';

const FormulaireInscription = () => {
    const [confirmer, setConfirmer] = useState("")
    const [error, setError] = useState("")

    const LENGTH_MIN_USERNAME = 4;
    const LENGTH_MIN_PASSWORD = 6;

    const [user, setUser] = useState({
        username: "",
        name: "",
        pwd: "",
    })

    function handleChange({ currentTarget }) {
        const { name, value } = currentTarget;

        setUser({ ...user, [name]: value })
    }

    function hasSpecialCharacters(str) {
        const regex = /[!@#$%^&*()_+-=[\]{};':"\\|,.<>?]/g;
        return regex.test(str);
    }

    function resetOnClick() {
        setUser({
            username: "",
            name: "",
            pwd: "",
        })
        setConfirmer("")
    }

    async function handleOnSubmit(event) {
        try {
            event.preventDefault();
            if (user.name.length === 0) {
                throw new Error("*Entrez le nom et prenom");
            }
            if (user.username.length <= LENGTH_MIN_USERNAME) {
                throw new Error("*Il faut un login d'au moins 5 caractères");
            }
            if (confirmer !== user.pwd) {
                throw new Error("*Les deux mots de passe ne sont pas la meme")
            }
            if (user.pwd.length <= LENGTH_MIN_PASSWORD) {
                throw new Error("*Mot de passe trop court")
            }
            if (hasSpecialCharacters(user.name) || hasSpecialCharacters(user.login)) {
                throw new Error("*Pas de caractère spéciaux pour le nom et login")
            }
            const response = await signup(user)
            if (response.status === 200) {
                console.log(response.data)
                setError(response.data)
            }
            else {
                setError(response.data.error)
            }
        }
        catch (erreur) {
            setError(erreur.message)
        }
    }

    return (
        <div className='formulaire'>

            <form>
                <h1>Enregistrement</h1>
                <div className={user.name.length <= 0 ? "form-group red" : "form-group green"}>
                    <label htmlFor="name">
                        Nom et Prenom
                    </label>
                    <input
                        type="text"
                        name="name"
                        onChange={handleChange}
                        placeholder="Nom Prenom"
                    />
                </div>
                <div className={user.username.length < LENGTH_MIN_USERNAME ? "form-group red" : "form-group green"}>
                    <label htmlFor="login">
                        Login
                    </label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        placeholder="Login"
                    />
                </div>
                <div className={(user.pwd.length < LENGTH_MIN_PASSWORD)
                    ? "form-group red" : "form-group green"}>
                    <label htmlFor="pwd">
                        Mot de passe
                    </label>
                    <input
                        type="password"
                        name="pwd"
                        onChange={handleChange}
                        placeholder="Mot de passe"
                    />
                </div>
                <div className={(user.pwd !== confirmer) ? "form-group red" : "form-group green"}>
                    <label htmlFor="retapper">
                        Confirmer
                    </label>
                    <input
                        type="password"
                        onChange={(event) =>
                            setConfirmer(event.target.value)
                        }
                        placeholder="Confirmer"
                    />
                </div>
                <ul>
                    <button onClick={handleOnSubmit} id="btnConnexion">Enregistrer</button>
                    <button
                        type="reset"
                        id="btnAnnuler"
                        onClick={resetOnClick}>Annuler</button>
                </ul>
                <h1 id="warning">{error}</h1>
                <div id='redirection'>
                    Vous avez un compte ? <a href="/connexion">Connectez-vous</a>.
                </div>
            </form >
        </div >
    );
}


const Inscription = () => {
    return (
        <div>
            <FormulaireInscription />
        </div>
    );
};


export default Inscription;