import Map "mo:core/Map";
import ProfileTypes "../types/profile";
import ProfileLib "../lib/profile";

mixin (
  profiles : Map.Map<ProfileTypes.UserId, ProfileTypes.UserProfile>
) {
  public shared ({ caller }) func getMyProfile() : async ?ProfileTypes.UserProfilePublic {
    ProfileLib.getProfile(profiles, caller);
  };

  public shared ({ caller }) func upsertMyProfile(
    displayName : Text,
    preferences : ProfileTypes.Preferences
  ) : async ProfileTypes.UserProfilePublic {
    ProfileLib.upsertProfile(profiles, caller, displayName, preferences);
  };
};
