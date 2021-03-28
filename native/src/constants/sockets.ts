enum SOCKETS {
  // Emit
  SEND_CHAT_MESSAGE = "send_chat_message",
  GIVE_ALL_USERS = "give_all_users",
  SEND_PRIVATE_MESSAGE = "send_private_message",

  // On
  CHAT_MESSAGES = "chat_messages",
  ALL_USERS = "all_users",
  CONNECT_ERROR = "connect_error",
  NEW_USER_CONNECTED = "new_user_connected",
  PRIVATE_MESSAGES = "private_messages",
  CONNECT = "connect",
  DISCONNECT = "disconnect",
}

export default SOCKETS;
