
import React, { useState, useEffect, FC } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import axios from 'axios';

const FIND_USER_BY_INTRA_LOGIN = gql`
  query FindUserByIntraLogin($intra_login: String!) {
    findUserByIntraLogin(intra_login: $intra_login) {
      id
      token
      email
      nickname
      avatar
    }
  }
`;
  const CREATE_USER = gql`
    mutation CreateUser($input: CreateUserInput!) {
      createUser(createUserInput: $input) {
        id
        token
        email
        intra_login
        nickname
        avatar
      }
    }
  `;

  const Authentication: FC = () => {
  
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      STATE                             */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  const [userData, setUserData] = useState({
    token: '',
    login: '',
  });
  
  const [code, setCode] = useState<string>('');

  const [canCheck, setCanCheck] = useState(false);


  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      HANDLE                            */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

//L'utilisateur est redirigé vers 42 api Oauth pour se connecter au site

  const handleSignIn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    window.location.href = process.env.REACT_APP_API_42_URL?.toString() || '';
  }

  // Nous utilisons les informations du formulaire envoyé par l'utilisateur pour créer son profil sur la base de données
  const handleCreateUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { nickname, email, avatar } = e.currentTarget;
    const user_info = {
      intra_login: userData.login,
      nickname: nickname.value,
      email: email.value,
      avatar: avatar.value
    };
    
    createUser({
      variables: {
        input: user_info
      }
    })
    .then(response => {
      console.log('User created:', response.data.createUser);
      sessionStorage.setItem('user', JSON.stringify(response.data.createUser));
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
    console.log(nickname.value, email.value, avatar.value);
  };
  

  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      REQUEST                           */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

 // Une requête de type Query pour vérifier si un utilisateur existe dans la base de données
  const { data: findUserDataQuery, loading: findUserLoadingQuery, error: findUserErrorQuery } = useQuery(FIND_USER_BY_INTRA_LOGIN, {
    variables: { intra_login: userData.login },
    skip: !userData.login, // Skip the query if userData.login is not set
  });
  
  // Une requete de type Mutation pour creer un user
  const [createUser] = useMutation(CREATE_USER);



  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      USE EFFECT                        */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */

  // Ce useEffect est lancé au chargement de la page pour recuperer le code dans l'url et si besoin la remet a son etat initial
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlCode = urlParams.get('code');
    if (urlCode) {
      setCode(urlCode);
      window.history.replaceState(null, '', window.location.pathname); // Remove the code from the URL
    }
  }, []);

  // Ce UseEffect est activé quand le statut de la variable a changé, soit quand le code a ete recuperer depuis l'url
  useEffect(() => {
    if (code) {

      const requestData = {
        grant_type: 'authorization_code',
        client_id: process.env.REACT_APP_CLIENT_ID_API_42,
        client_secret: process.env.REACT_APP_CLIENT_SECRET_API_42,
        code: code,
        redirect_uri: process.env.REACT_APP_WEBSITE_URL,
      };

      axios.post('https://api.intra.42.fr/oauth/token', requestData)
        .then(response => {
          setUserData(prevState => ({
            ...prevState,
            token: response.data.access_token
          }));
          console.log('the acces token :', response.data);
        })

        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [code]);
  
  // Ce useEffect est activé à l'assignation de la variable token dans la variable-objet userData, 
  // soit quand nous avons reussi a echanger le code contre l'acces-token avec l'api de 42
  useEffect(() => {
    if (userData.token) {

      const loginRequestData = {
        headers: {
          Authorization: `Bearer ${userData.token}`
        }
      };

      axios.get('https://api.intra.42.fr/v2/me', loginRequestData)
        .then(response => {
          setUserData(prevState => ({
            ...prevState,
            login: response.data.login
          }));
          console.log(response.data);
        })

        .catch(error => {
          console.error('Error:', error);
        });
    }
  }, [userData.token]);
  
  // Ce useEffect est activé quand l'une des variables-objet (findUserDataQuery, findUserErrorQuery, findUserLoadingQuery) est changé
  // il permet au return d'afficher le rendu au bon moment.
  // il met a jour le session storage "user" avec les info reçu de la commande query  
  useEffect(() => {
    if (findUserDataQuery || findUserErrorQuery || findUserLoadingQuery) {
      setCanCheck(true);
      if (findUserDataQuery) {
        sessionStorage.setItem('user', JSON.stringify(findUserDataQuery.findUserByIntraLogin));
      }
    }
  }, [findUserDataQuery, findUserLoadingQuery, findUserErrorQuery]);

  
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  /*                      RETURN                            */
  /*    ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   ~   */
  return (
    <div>
      {sessionStorage.getItem('user') ? (
        <p>acces au site apres connexion </p>
      ) : (
        <>
          <div>
            {!canCheck ? (
              <button onClick={handleSignIn}>SIGNIN</button>
              ) : (
                <>
                {!findUserLoadingQuery && !findUserErrorQuery && findUserDataQuery ? (
                  <>
                  <p> acces au site apres connexion</p>
                  </>
                ) : (
                  <form onSubmit={handleCreateUser}>
                    <input type="text" placeholder="Nickname" name="nickname" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="text" placeholder="Avatar" name="avatar" />
                    <button type="submit">Send</button>
                  </form>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Authentication;