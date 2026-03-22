import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Video {
    title: string;
    subject: string;
    thumbnailId: string;
    description: string;
    uploadedAt: Time;
    videoFileId: string;
}
export interface Course {
    fee: bigint;
    title: string;
    duration: string;
    subject: string;
    description: string;
}
export interface AcademyProfile {
    about: string;
    foundedYear: bigint;
    tagline: string;
    name: string;
    email: string;
    address: string;
    phone: string;
}
export type Time = bigint;
export interface TutorProfile {
    bio: string;
    subject: string;
    name: string;
    photoId: string;
}
export interface Enrollment {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addCourse(course: Course): Promise<void>;
    addTutor(tutor: TutorProfile): Promise<void>;
    addVideo(video: Video): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteCourse(): Promise<void>;
    deleteTutor(): Promise<void>;
    deleteVideo(): Promise<void>;
    getAcademyInfo(): Promise<Array<AcademyProfile>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContacts(): Promise<Array<Enrollment>>;
    getCourses(): Promise<Array<Course>>;
    getExternalBlobs(): Promise<Array<[string, ExternalBlob]>>;
    getTutors(): Promise<Array<TutorProfile>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getVideos(): Promise<Array<Video>>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveExternalBlob(id: string, blob: ExternalBlob): Promise<void>;
    submitContact(enrollment: Enrollment): Promise<void>;
    updateAcademyInfo(info: AcademyProfile): Promise<void>;
    updateCourse(course: Course): Promise<void>;
    updateTutor(tutor: TutorProfile): Promise<void>;
    updateVideo(video: Video): Promise<void>;
}
