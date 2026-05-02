import List "mo:core/List";
import ChatTypes "../types/chat";
import ChatLib "../lib/chat";
import Time "mo:core/Time";

mixin (
  chatMessages : List.List<ChatTypes.ChatMessage>,
  nextChatId : Nat
) {
  public shared query ({ caller }) func getChatHistory(limit : Nat) : async [ChatTypes.ChatMessagePublic] {
    let safeLimit = if (limit > 50) { 50 } else { limit };
    ChatLib.getHistory(chatMessages, caller, safeLimit);
  };

  public shared ({ caller }) func sendChatMessage(
    input : ChatTypes.SendMessageInput
  ) : async ChatTypes.ChatMessagePublic {
    let id = chatMessages.size();
    ChatLib.addMessage(chatMessages, id, caller, #user, input.content, Time.now());
  };

  public shared ({ caller }) func clearChatHistory() : async Nat {
    ChatLib.clearHistory(chatMessages, caller);
  };
};
