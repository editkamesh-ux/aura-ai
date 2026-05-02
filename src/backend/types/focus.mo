import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;
  public type ItemId = CommonTypes.ItemId;

  public type SessionType = {
    #deepWork; #pomodoro; #shortBreak; #longBreak; #custom;
  };

  public type FocusSession = {
    id : ItemId;
    userId : UserId;
    startTime : CommonTypes.Timestamp;
    duration : Nat;
    sessionType : SessionType;
  };

  public type FocusSessionPublic = {
    id : ItemId;
    startTime : CommonTypes.Timestamp;
    duration : Nat;
    sessionType : SessionType;
  };

  public type LogFocusSessionInput = {
    startTime : CommonTypes.Timestamp;
    duration : Nat;
    sessionType : SessionType;
  };
};
