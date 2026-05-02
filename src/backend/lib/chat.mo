import List "mo:core/List";
import ChatTypes "../types/chat";
import CommonTypes "../types/common";
import Principal "mo:core/Principal";

module {
  public type ChatMessage = ChatTypes.ChatMessage;
  public type ChatMessagePublic = ChatTypes.ChatMessagePublic;
  public type ChatRole = ChatTypes.ChatRole;
  public type UserId = ChatTypes.UserId;
  public type ItemId = ChatTypes.ItemId;

  public func getHistory(
    messages : List.List<ChatMessage>,
    userId : UserId,
    limit : Nat
  ) : [ChatMessagePublic] {
    let userMsgs = messages.filter(func(m) { Principal.equal(m.userId, userId) });
    let total = userMsgs.size();
    let start : Nat = if (total > limit) { total - limit } else { 0 };
    userMsgs.sliceToArray(start, total).map<ChatMessage, ChatMessagePublic>(func(m) { toPublic(m) });
  };

  public func addMessage(
    messages : List.List<ChatMessage>,
    nextId : Nat,
    userId : UserId,
    role : ChatRole,
    content : Text,
    now : CommonTypes.Timestamp
  ) : ChatMessagePublic {
    let msg : ChatMessage = {
      id = nextId;
      userId;
      role;
      content;
      timestamp = now;
    };
    messages.add(msg);
    toPublic(msg);
  };

  public func clearHistory(
    messages : List.List<ChatMessage>,
    userId : UserId
  ) : Nat {
    let toRemove = messages.filter(func(m) { Principal.equal(m.userId, userId) }).size();
    let kept = messages.filter(func(m) { not Principal.equal(m.userId, userId) });
    messages.clear();
    messages.append(kept);
    toRemove;
  };

  public func toPublic(msg : ChatMessage) : ChatMessagePublic {
    {
      id = msg.id;
      role = msg.role;
      content = msg.content;
      timestamp = msg.timestamp;
    };
  };
};
