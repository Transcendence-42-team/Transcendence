export interface User {
    avatar: string;
    email: string;
    id: number;
    nickname: string;
    token: string;
    tfa_code?: string
  }

export interface Player {
  id: number;
  userId: number;
  positionX: number;
  positionY: number;
  waitingRoomId: number;
  opponentPlayerId :number;
  ballId?: number;
}

export interface Ball {
  id: number;
  positionX: number;
  positionY: number;
  directionX: number;
  directionY: number;
}