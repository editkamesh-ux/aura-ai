import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type ItemId = CommonTypes.ItemId;

  public type ChatRole = { #user; #assistant; #systemRole };

  public type ChatMessage = {
    id : ItemId;
    userId : UserId;
    role : ChatRole;
    content : Text;
    timestamp : CommonTypes.Timestamp;
  };

  public type ChatMessagePublic = {
    id : ItemId;
    role : ChatRole;
    content : Text;
    timestamp : CommonTypes.Timestamp;
  };

  public type SendMessageInput = {
    content : Text;
  };
};
