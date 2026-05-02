import CommonTypes "common";

module {
  public type UserId = CommonTypes.UserId;

  public type NotificationSettings = {
    routineReminders : Bool;
    motivationalAlerts : Bool;
    habitNudges : Bool;
  };

  public type Preferences = {
    theme : Text;
    notificationSettings : NotificationSettings;
  };

  public type UserProfile = {
    userId : UserId;
    var displayName : Text;
    var preferences : Preferences;
    var createdAt : CommonTypes.Timestamp;
  };

  public type UserProfilePublic = {
    userId : UserId;
    displayName : Text;
    preferences : Preferences;
    createdAt : CommonTypes.Timestamp;
  };
};
