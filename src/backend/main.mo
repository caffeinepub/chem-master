import Text "mo:core/Text";
import Order "mo:core/Order";
import List "mo:core/List";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";

actor {
  let academyInfo = Map.empty<Principal, AcademyProfile>();
  let courses = Map.empty<Principal, Course>();
  let tutors = Map.empty<Principal, TutorProfile>();
  let videos = Map.empty<Principal, Video>();
  let contacts = List.empty<Enrollment>();
  let externalBlobList = List.empty<(Text, Storage.ExternalBlob)>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  func getCourseInternal(caller : Principal) : Course {
    switch (courses.get(caller)) {
      case (null) { Runtime.trap("Course does not exist") };
      case (?course) { course };
    };
  };

  func getTutorInternal(caller : Principal) : TutorProfile {
    switch (tutors.get(caller)) {
      case (null) { Runtime.trap("Tutor does not exist") };
      case (?tutor) { tutor };
    };
  };

  func getVideoInternal(caller : Principal) : Video {
    switch (videos.get(caller)) {
      case (null) { Runtime.trap("Video does not exist") };
      case (?video) { video };
    };
  };

  module Course {
    public func compare(course1 : Course, course2 : Course) : Order.Order {
      Text.compare(course1.title, course2.title);
    };
  };

  module TutorProfile {
    public func compare(tutor1 : TutorProfile, tutor2 : TutorProfile) : Order.Order {
      Text.compare(tutor1.name, tutor2.name);
    };
  };

  module Video {
    public func compare(video1 : Video, video2 : Video) : Order.Order {
      Text.compare(video1.title, video2.title);
    };
  };

  module AcademyProfile {
    public func compare(profile1 : AcademyProfile, profile2 : AcademyProfile) : Order.Order {
      Text.compare(profile1.name, profile2.name);
    };
  };

  module Enrollment {
    public func compare(enrollment1 : Enrollment, enrollment2 : Enrollment) : Order.Order {
      Text.compare(enrollment1.name, enrollment2.name);
    };
  };

  include MixinStorage();
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  type Video = {
    title : Text;
    description : Text;
    subject : Text;
    videoFileId : Text;
    thumbnailId : Text;
    uploadedAt : Time.Time;
  };

  type AcademyProfile = {
    name : Text;
    tagline : Text;
    about : Text;
    address : Text;
    phone : Text;
    email : Text;
    foundedYear : Nat;
  };

  type Course = {
    title : Text;
    subject : Text;
    description : Text;
    duration : Text;
    fee : Nat;
  };

  type TutorProfile = {
    name : Text;
    subject : Text;
    bio : Text;
    photoId : Text;
  };

  type Enrollment = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // User Profile Functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Public read access - no authorization needed
  public query func getVideos() : async [Video] {
    videos.toArray().values().toArray().map(func((_, video)) { video }).sort();
  };

  public query func getCourses() : async [Course] {
    courses.toArray().values().toArray().map(func((_, course)) { course }).sort();
  };

  public query func getTutors() : async [TutorProfile] {
    tutors.toArray().values().toArray().map(func((_, tutor)) { tutor }).sort();
  };

  public query func getAcademyInfo() : async [AcademyProfile] {
    academyInfo.values().toArray().sort();
  };

  // Admin-only video operations
  public shared ({ caller }) func addVideo(video : Video) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add videos");
    };
    let newVideo = { video with uploadedAt = Time.now() };
    videos.add(caller, newVideo);
  };

  public shared ({ caller }) func updateVideo(video : Video) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update videos");
    };
    ignore getVideoInternal(caller);
    let updatedVideo = { video with uploadedAt = Time.now() };
    videos.add(caller, updatedVideo);
  };

  public shared ({ caller }) func deleteVideo() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete videos");
    };
    ignore getVideoInternal(caller);
    videos.remove(caller);
  };

  // Admin-only course operations
  public shared ({ caller }) func addCourse(course : Course) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add courses");
    };
    courses.add(caller, course);
  };

  public shared ({ caller }) func updateCourse(course : Course) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update courses");
    };
    ignore getCourseInternal(caller);
    courses.add(caller, course);
  };

  public shared ({ caller }) func deleteCourse() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete courses");
    };
    ignore getCourseInternal(caller);
    courses.remove(caller);
  };

  // Admin-only tutor operations
  public shared ({ caller }) func addTutor(tutor : TutorProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can add tutors");
    };
    tutors.add(caller, tutor);
  };

  public shared ({ caller }) func updateTutor(tutor : TutorProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update tutors");
    };
    ignore getTutorInternal(caller);
    tutors.add(caller, tutor);
  };

  public shared ({ caller }) func deleteTutor() : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can delete tutors");
    };
    ignore getTutorInternal(caller);
    tutors.remove(caller);
  };

  // Admin-only academy info update
  public shared ({ caller }) func updateAcademyInfo(info : AcademyProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update academy info");
    };
    academyInfo.add(caller, info);
  };

  // Public contact form submission - no authorization needed
  public shared ({ caller }) func submitContact(enrollment : Enrollment) : async () {
    let newEnrollment = { enrollment with timestamp = Time.now() };
    contacts.add(newEnrollment);
  };

  // Admin-only contact list viewing
  public query ({ caller }) func getContacts() : async [Enrollment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view contacts");
    };
    contacts.toArray().sort();
  };

  // Public blob access - no authorization needed
  public query func getExternalBlobs() : async [(Text, Storage.ExternalBlob)] {
    externalBlobList.toArray();
  };

  // Admin-only blob storage
  public shared ({ caller }) func saveExternalBlob(id : Text, blob : Storage.ExternalBlob) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can save external blobs");
    };
    externalBlobList.add((id, blob));
  };
};
