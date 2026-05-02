import Map "mo:core/Map";
import ProfileTypes "../types/profile";
import Time "mo:core/Time";

module {
  public type UserProfile = ProfileTypes.UserProfile;
  public type UserProfilePublic = ProfileTypes.UserProfilePublic;
  public type Preferences = ProfileTypes.Preferences;
  public type UserId = ProfileTypes.UserId;

  public func getProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId
  ) : ?UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?p) { ?toPublic(p) };
      case null { null };
    };
  };

  public func upsertProfile(
    profiles : Map.Map<UserId, UserProfile>,
    userId : UserId,
    displayName : Text,
    preferences : Preferences
  ) : UserProfilePublic {
    switch (profiles.get(userId)) {
      case (?existing) {
        existing.displayName := displayName;
        existing.preferences := preferences;
        toPublic(existing);
      };
      case null {
        let newProfile : UserProfile = {
          userId;
          var displayName;
          var preferences;
          var createdAt = Time.now();
        };
        profiles.add(userId, newProfile);
        toPublic(newProfile);
      };
    };
  };

  public func toPublic(profile : UserProfile) : UserProfilePublic {
    {
      userId = profile.userId;
      displayName = profile.displayName;
      preferences = profile.preferences;
      createdAt = profile.createdAt;
    };
  };
};
