import React, { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useMutation } from '@apollo/client';
// import { CREATE_MUTATION_1, CREATE_MUTATION_2 } from '../graphql/mutations';
import { ADD_USER_IN_CHANEL } from '../../Contact/graphql/Mutations';
import { Chanel } from '../../interfaces/interfaces';


interface MyComponentProps {
	chan: Chanel;
	hasFetchedData: Chanel | undefined; // Définir le type de l'état hasFetchedData
}

const MyComponent = ({ chan, hasFetchedData }: MyComponentProps) => {
  const [createMutation1, { loading: loading1, error: error1 }] = useMutation(ADD_USER_IN_CHANEL);
  const [createMutation2, { loading: loading2, error: error2 }] = useMutation(ADD_USER_IN_CHANEL);
  const user = JSON.parse(sessionStorage.getItem('user') || '');
  const isConditionExecuted = useRef<boolean>(false);

  // Utilisez useEffect pour effectuer les mutations au montage du composant
useEffect(() => {

	
	if (hasFetchedData && !isConditionExecuted.current){
		console.log('weeeeeee ==>>  ', hasFetchedData);
	
		createMutation1({
			variables: {
			  input:{
				  user_id: user.id,
				  chanel_id: hasFetchedData?.id,
				//   pending: false,

			  },
			},
		});
		
		// Effectuer la deuxième mutation
		createMutation2({
			variables: {
			  input: {
				  user_id: hasFetchedData?.interlocutor_id,
				  chanel_id: hasFetchedData?.id,
				//   pending: false,
			  }
			},
		});
		
		isConditionExecuted.current = true;
	}
  }, [hasFetchedData]);

  // Gérer les états de chargement et d'erreur pour afficher le résultat approprié
  if (loading1 || loading2) {
    return <div>Loading...</div>;
  }

//   if (error1 || error2) {
//     return <div>Error: {error1 ? error1.message : error2.message}</div>;
//   }

  // Afficher le contenu du composant ici
  return (
    <div>
      les 2 mutation ont ete fait
    </div>
  );
};

export default MyComponent;
