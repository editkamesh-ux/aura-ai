import List "mo:core/List";
import FocusTypes "../types/focus";
import FocusLib "../lib/focus";

mixin (
  focusSessions : List.List<FocusTypes.FocusSession>,
  nextFocusId : Nat
) {
  public shared ({ caller }) func logFocusSession(
    input : FocusTypes.LogFocusSessionInput
  ) : async FocusTypes.FocusSessionPublic {
    let id = focusSessions.size();
    FocusLib.logSession(focusSessions, id, caller, input);
  };

  public shared query ({ caller }) func listMyFocusSessions() : async [FocusTypes.FocusSessionPublic] {
    FocusLib.listSessions(focusSessions, caller);
  };
};
