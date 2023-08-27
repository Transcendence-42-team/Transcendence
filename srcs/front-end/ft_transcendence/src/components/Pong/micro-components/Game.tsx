
import { FC, useEffect, useState } from 'react';
import { Display } from './Display';
import { Player, User, Ball, PongI } from '../../interfaces/interfaces'
import {useMutation, } from '@apollo/client';
import { END_PONG, JOIN_PONG, JOIN_PONG_INVITE, SET_INVITE } from '../graphql/Mutation';
import { Link } from 'react-router-dom';


interface GameProps {
    pongMap:  string| null;
    friendId: number | undefined;
  }
  const Game: FC<GameProps> = ({ pongMap, friendId }) => {

    const userFromStorageString = sessionStorage.getItem('user');
    let userFromStorage: User | null = null;
    if (userFromStorageString && userFromStorageString !== 'undefined')
      userFromStorage = JSON.parse(userFromStorageString);
  
    const [player, setPlayer] = useState<Player | null>(null);
    const [otherPlayer, setOtherPlayer] = useState<Player | null>(null);
    const [ball, setBall]= useState<Ball | null>(null); 
    const [pong, setPong] = useState<PongI | null>(null);
  
  
    const [joinPong] = useMutation(JOIN_PONG);
    const [setInvite] =useMutation(SET_INVITE);
    const [joinPongInvite] = useMutation(JOIN_PONG_INVITE);

    const [endPong] = useMutation(END_PONG);
    
    
    useEffect(() => {
      if (!player && userFromStorage) {
        if (friendId !== undefined) {
          setInvite({
            variables: {
              friendId: friendId
            }
          })
            .then(response => {
              const {waitingRoomId} = response.data.setPongInvite;
              joinPongInvite({
                variables: {
                  friendId: friendId,
                  waitingRoomId: waitingRoomId,
                }
              })
                .then(response => {
                  const { player, otherPlayer, ball, pong } = response.data.joinPongInvite;
                  if (player && otherPlayer && ball && pong) {
                    setPlayer(player);
                    setOtherPlayer(otherPlayer);
                    setBall(ball);
                    setPong(pong);
                  }
                })
                .catch(error => {
                  console.error('Error joining pong:', error);
                });
            })
            .catch(error => {
              console.error('Error setting invite:', error);
            });
        }
        else
        {
          joinPong({
            variables: {
              userId: userFromStorage?.id
            }
          })
          .then(response => {
            const { player, otherPlayer, ball, pong } = response.data.joinPong;
            if (player && otherPlayer && ball && pong) {
              setPlayer(player);
              setOtherPlayer(otherPlayer);
              setBall(ball);
              setPong(pong);
            }
          })
          .catch(error => {
            console.error('Error joining pong:', error);
          });
        }
    }
    
     //Cleanup function
     return () => {
      endPong({
        variables: {
          userId: userFromStorage?.id
        }
      })
      .then(endPongResponse => {
        console.log('endPong result:', endPongResponse.data.endPong); // Result string
      })
      .catch(error => {
        console.error('Error ending pong:', error);
      });
      sessionStorage.removeItem('playerMap');
    }
  }, []);

  useEffect(() => {
    const handleUnload = async () => {
      if (player && userFromStorage) {
        endPong({
          variables: {
            userId: userFromStorage?.id
          }
        })
        .then(endPongResponse => {
          console.log('endPong result:', endPongResponse.data.endPong); // Result string
        })
        .catch(error => {
          console.error('Error ending pong:', error);
        });
        sessionStorage.removeItem('playerMap');
      }
    };
  
    window.addEventListener('unload', handleUnload);
  
    return () => {
      window.removeEventListener('unload', handleUnload);
    };
  }, [player, userFromStorage]);
  
  
      return (
        <div>
          {pong && pong.winnerId === null ? (
            <Display
              player={player}
              otherPlayer={otherPlayer}
              ball={ball}
              pong={pong}
              pongMap={pongMap}
              setPlayer={setPlayer}
              setOtherPlayer={setOtherPlayer}
              setBall={setBall}
            />
          ) : (
            <div className="loading-container">
              <h2 className="loading-text">Loading GAME...</h2>
            </div>
          )}
          <Link to ='/'>
            <button className='log-out-button logo-box'></button>
          </Link>
          <Link to="/">
            <button className='home-button logo-box'></button>
          </Link>
          <Link to="/leaderBoard">
            <button className='leader-board-button logo-box'></button>
          </Link>
          <Link to="/message">
            <button className='message-button logo-box'></button>
          </Link>
          <Link to="/contact">
            <button className='contact-button logo-box'></button>
          </Link>
        </div>
      
      );

}
export default Game;