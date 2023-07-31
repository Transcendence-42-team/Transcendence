import {gql} from '@apollo/client';

export const FIND_PLAYER = gql`
  query FindPlayer($id: Int!) {
    findPlayer(id: $id) {
      id
      userId
      positionX
      positionY
      waitingRoomId
      opponentPlayerId
      ballId
    }
  }
`;