-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "token" TEXT,
    "state" INTEGER NOT NULL,
    "connection_status" INTEGER NOT NULL,
    "tfa_code" TEXT,
    "email" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "rank" TEXT NOT NULL DEFAULT 'Bronze',
    "level" DOUBLE PRECISION NOT NULL DEFAULT 1,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "pending" BOOLEAN DEFAULT true,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chanel" (
    "id" SERIAL NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "chanel_name" TEXT NOT NULL,
    "logo" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT true,
    "directMsg" BOOLEAN NOT NULL DEFAULT false,
    "interlocutor_id" INTEGER,
    "interlocutor_avatar" TEXT,
    "interlocutor_name" TEXT,
    "AdminList" INTEGER[] DEFAULT ARRAY[]::INTEGER[],

    CONSTRAINT "Chanel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_banned" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "channel_id" INTEGER NOT NULL,

    CONSTRAINT "user_banned_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users_Chanels" (
    "user_id" INTEGER NOT NULL,
    "chanel_id" INTEGER NOT NULL,
    "pending" BOOLEAN DEFAULT true,
    "is_muted" BOOLEAN DEFAULT false,
    "is_admin" BOOLEAN DEFAULT false,
    "mute_start_time" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Users_Chanels_pkey" PRIMARY KEY ("user_id","chanel_id")
);

-- CreateTable
CREATE TABLE "Pong" (
    "id" SERIAL NOT NULL,
    "userId1" INTEGER NOT NULL,
    "userId2" INTEGER NOT NULL,
    "scoreUser1" INTEGER DEFAULT 0,
    "scoreUser2" INTEGER DEFAULT 0,
    "loserId" INTEGER,
    "winnerId" INTEGER,
    "versusDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "start" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Pong_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL DEFAULT 10,
    "positionY" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "host" BOOLEAN DEFAULT false,
    "opponentPlayerId" INTEGER NOT NULL DEFAULT 0,
    "waitingRoomId" INTEGER NOT NULL,
    "ballId" INTEGER,
    "pongId" INTEGER,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WaitingRoom" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "WaitingRoom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PongInvite" (
    "id" SERIAL NOT NULL,
    "userId1" INTEGER NOT NULL,
    "userId2" INTEGER NOT NULL,
    "waitingRoomId" INTEGER NOT NULL,

    CONSTRAINT "PongInvite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ball" (
    "id" SERIAL NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "positionY" DOUBLE PRECISION NOT NULL DEFAULT 50,
    "directionX" DOUBLE PRECISION NOT NULL DEFAULT -20,
    "directionY" DOUBLE PRECISION NOT NULL DEFAULT 10,

    CONSTRAINT "Ball_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ToBloc" (
    "id" SERIAL NOT NULL,
    "blocker_id" INTEGER NOT NULL,
    "blocked_id" INTEGER NOT NULL,

    CONSTRAINT "ToBloc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "channel_id" INTEGER,
    "invite_game" BOOLEAN DEFAULT false,
    "content" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_user_id_contact_id_key" ON "Contact"("user_id", "contact_id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_key" ON "Player"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PongInvite_waitingRoomId_key" ON "PongInvite"("waitingRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "PongInvite_userId1_userId2_key" ON "PongInvite"("userId1", "userId2");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_contact_id_fkey" FOREIGN KEY ("contact_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chanel" ADD CONSTRAINT "Chanel_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chanel" ADD CONSTRAINT "Chanel_interlocutor_id_fkey" FOREIGN KEY ("interlocutor_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_banned" ADD CONSTRAINT "user_banned_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Chanels" ADD CONSTRAINT "Users_Chanels_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Users_Chanels" ADD CONSTRAINT "Users_Chanels_chanel_id_fkey" FOREIGN KEY ("chanel_id") REFERENCES "Chanel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pong" ADD CONSTRAINT "Pong_userId1_fkey" FOREIGN KEY ("userId1") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pong" ADD CONSTRAINT "Pong_userId2_fkey" FOREIGN KEY ("userId2") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_ballId_fkey" FOREIGN KEY ("ballId") REFERENCES "Ball"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_waitingRoomId_fkey" FOREIGN KEY ("waitingRoomId") REFERENCES "WaitingRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PongInvite" ADD CONSTRAINT "PongInvite_waitingRoomId_fkey" FOREIGN KEY ("waitingRoomId") REFERENCES "WaitingRoom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ToBloc" ADD CONSTRAINT "ToBloc_blocked_id_fkey" FOREIGN KEY ("blocked_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "Chanel"("id") ON DELETE SET NULL ON UPDATE CASCADE;
