import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  AcademyProfile,
  Course,
  Enrollment,
  ExternalBlob,
  TutorProfile,
  Video,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetVideos() {
  const { actor, isFetching } = useActor();
  return useQuery<Video[]>({
    queryKey: ["videos"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getVideos();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCourses() {
  const { actor, isFetching } = useActor();
  return useQuery<Course[]>({
    queryKey: ["courses"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCourses();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetTutors() {
  const { actor, isFetching } = useActor();
  return useQuery<TutorProfile[]>({
    queryKey: ["tutors"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTutors();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAcademyInfo() {
  const { actor, isFetching } = useActor();
  return useQuery<AcademyProfile[]>({
    queryKey: ["academyInfo"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAcademyInfo();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetContacts() {
  const { actor, isFetching } = useActor();
  return useQuery<Enrollment[]>({
    queryKey: ["contacts"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getContacts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetExternalBlobs() {
  const { actor, isFetching } = useActor();
  return useQuery<[string, any][]>({
    queryKey: ["externalBlobs"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getExternalBlobs();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitContact() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (enrollment: Enrollment) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContact(enrollment);
    },
  });
}

export function useAddVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (video: Video) => {
      if (!actor) throw new Error("Not connected");
      return actor.addVideo(video);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useDeleteVideo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteVideo();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["videos"] }),
  });
}

export function useAddCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (course: Course) => {
      if (!actor) throw new Error("Not connected");
      return actor.addCourse(course);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useDeleteCourse() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteCourse();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["courses"] }),
  });
}

export function useAddTutor() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (tutor: TutorProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.addTutor(tutor);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tutors"] }),
  });
}

export function useDeleteTutor() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return actor.deleteTutor();
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tutors"] }),
  });
}

export function useSaveExternalBlob() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, blob }: { id: string; blob: ExternalBlob }) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveExternalBlob(id, blob as any);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["externalBlobs"] }),
  });
}

export function useUpdateAcademyInfo() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (info: AcademyProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.updateAcademyInfo(info);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["academyInfo"] }),
  });
}
