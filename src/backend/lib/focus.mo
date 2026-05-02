import List "mo:core/List";
import FocusTypes "../types/focus";
import CommonTypes "../types/common";
import Principal "mo:core/Principal";

module {
  public type FocusSession = FocusTypes.FocusSession;
  public type FocusSessionPublic = FocusTypes.FocusSessionPublic;
  public type LogFocusSessionInput = FocusTypes.LogFocusSessionInput;
  public type UserId = FocusTypes.UserId;

  public func logSession(
    sessions : List.List<FocusSession>,
    nextId : Nat,
    userId : UserId,
    input : LogFocusSessionInput
  ) : FocusSessionPublic {
    let session : FocusSession = {
      id = nextId;
      userId;
      startTime = input.startTime;
      duration = input.duration;
      sessionType = input.sessionType;
    };
    sessions.add(session);
    toPublic(session);
  };

  public func listSessions(
    sessions : List.List<FocusSession>,
    userId : UserId
  ) : [FocusSessionPublic] {
    sessions.filter(func(s) { Principal.equal(s.userId, userId) }).map<FocusSession, FocusSessionPublic>(func(s) { toPublic(s) }).toArray();
  };

  public func totalFocusTime(
    sessions : List.List<FocusSession>,
    userId : UserId
  ) : Nat {
    sessions.filter(func(s) { Principal.equal(s.userId, userId) }).foldLeft<Nat, FocusSession>(0, func(acc, s) { acc + s.duration });
  };

  public func toPublic(session : FocusSession) : FocusSessionPublic {
    {
      id = session.id;
      startTime = session.startTime;
      duration = session.duration;
      sessionType = session.sessionType;
    };
  };
};
