import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FlaskConical, Loader2, Lock, Trash2, Upload } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import {
  useAddCourse,
  useAddTutor,
  useAddVideo,
  useDeleteCourse,
  useDeleteTutor,
  useDeleteVideo,
  useGetAcademyInfo,
  useGetContacts,
  useGetCourses,
  useGetExternalBlobs,
  useGetTutors,
  useGetVideos,
  useSaveExternalBlob,
  useUpdateAcademyInfo,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "121212";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-section-light flex items-center justify-center">
        <Card className="max-w-sm w-full mx-4 shadow-card rounded-xl">
          <CardContent className="p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center mx-auto mb-4">
              <Lock className="w-7 h-7 text-navy" />
            </div>
            <h2 className="font-display font-bold text-navy text-xl mb-2">
              Admin Access
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Enter your admin password to continue.
            </p>
            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="mt-1"
                  autoFocus
                />
                {error && (
                  <p className="text-destructive text-xs mt-1">{error}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-navy text-white hover:bg-navy/90 font-semibold"
              >
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <AdminDashboard onLogout={() => setIsAuthenticated(false)} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-section-light">
      <div className="bg-navy py-6">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gold/20 flex items-center justify-center">
              <FlaskConical className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="font-display font-bold text-white">
                Chem. Master Admin
              </div>
              <div className="text-xs text-white/50">Management Panel</div>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="border-white/20 text-white hover:bg-white/10 rounded-full"
          >
            Sign Out
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="academy">
          <TabsList className="mb-6 flex-wrap h-auto">
            <TabsTrigger value="academy">Academy Info</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="tutors">Tutors</TabsTrigger>
            <TabsTrigger value="contacts">Enrollments</TabsTrigger>
          </TabsList>

          <TabsContent value="academy">
            <AcademyInfoTab />
          </TabsContent>
          <TabsContent value="videos">
            <VideosTab />
          </TabsContent>
          <TabsContent value="courses">
            <CoursesTab />
          </TabsContent>
          <TabsContent value="tutors">
            <TutorsTab />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function AcademyInfoTab() {
  const { data: infoArr, isLoading } = useGetAcademyInfo();
  const updateInfo = useUpdateAcademyInfo();
  const existing = infoArr?.[0];

  const [form, setForm] = useState({
    name: "",
    tagline: "",
    about: "",
    address: "",
    phone: "",
    email: "",
    foundedYear: "2010",
  });
  const [init, setInit] = useState(false);

  if (existing && !init) {
    setForm({
      name: existing.name,
      tagline: existing.tagline,
      about: existing.about,
      address: existing.address,
      phone: existing.phone,
      email: existing.email,
      foundedYear: String(existing.foundedYear),
    });
    setInit(true);
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateInfo.mutateAsync({
        name: form.name,
        tagline: form.tagline,
        about: form.about,
        address: form.address,
        phone: form.phone,
        email: form.email,
        foundedYear: BigInt(form.foundedYear || "2010"),
      });
      toast.success("Academy info updated!");
    } catch {
      toast.error("Failed to update academy info.");
    }
  };

  if (isLoading) return <Skeleton className="h-64 rounded-xl" />;

  return (
    <Card className="rounded-xl shadow-card">
      <CardHeader>
        <CardTitle className="font-display text-navy">
          Academy Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSave}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <Label>Academy Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Chem. Master"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Tagline</Label>
            <Input
              value={form.tagline}
              onChange={(e) =>
                setForm((p) => ({ ...p, tagline: e.target.value }))
              }
              placeholder="Your tagline"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="info@academy.com"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) =>
                setForm((p) => ({ ...p, phone: e.target.value }))
              }
              placeholder="+1 (555) 000-0000"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Founded Year</Label>
            <Input
              value={form.foundedYear}
              onChange={(e) =>
                setForm((p) => ({ ...p, foundedYear: e.target.value }))
              }
              placeholder="2010"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) =>
                setForm((p) => ({ ...p, address: e.target.value }))
              }
              placeholder="123 Science St"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label>About</Label>
            <Textarea
              value={form.about}
              onChange={(e) =>
                setForm((p) => ({ ...p, about: e.target.value }))
              }
              placeholder="About your academy..."
              rows={4}
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Button
              type="submit"
              disabled={updateInfo.isPending}
              className="rounded-full bg-navy text-white hover:bg-navy/90"
            >
              {updateInfo.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function VideosTab() {
  const { data: videos, isLoading } = useGetVideos();
  const { data: blobs } = useGetExternalBlobs();
  const addVideo = useAddVideo();
  const deleteVideo = useDeleteVideo();
  const saveBlob = useSaveExternalBlob();

  const blobMap = new Map<string, any>((blobs as any) ?? []);

  const [form, setForm] = useState({ title: "", subject: "", description: "" });
  const [thumbFile, setThumbFile] = useState<File | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [thumbProgress, setThumbProgress] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoFile) {
      toast.error("Please select a video file.");
      return;
    }
    setUploading(true);
    try {
      const thumbId = thumbFile ? `thumb_${Date.now()}` : "";
      const videoId = `video_${Date.now()}`;
      const uploadPromises: Promise<void>[] = [];
      if (thumbFile) {
        const thumbBytes = new Uint8Array(await thumbFile.arrayBuffer());
        const thumbBlob = ExternalBlob.fromBytes(thumbBytes).withUploadProgress(
          (p) => setThumbProgress(p),
        );
        uploadPromises.push(
          saveBlob.mutateAsync({ id: thumbId, blob: thumbBlob }),
        );
      }
      const videoBytes = new Uint8Array(await videoFile.arrayBuffer());
      const vBlob = ExternalBlob.fromBytes(videoBytes).withUploadProgress((p) =>
        setVideoProgress(p),
      );
      uploadPromises.push(saveBlob.mutateAsync({ id: videoId, blob: vBlob }));
      await Promise.all(uploadPromises);
      await addVideo.mutateAsync({
        title: form.title,
        subject: form.subject,
        description: form.description,
        thumbnailId: thumbId,
        videoFileId: videoId,
        uploadedAt: BigInt(Date.now()),
      });
      toast.success("Video uploaded!");
      setForm({ title: "", subject: "", description: "" });
      setThumbFile(null);
      setVideoFile(null);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setThumbProgress(0);
      setVideoProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">
            Upload New Video
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleUpload}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Lesson title"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="e.g. Organic Chemistry"
                required
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Video description"
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label>Thumbnail Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbFile(e.target.files?.[0] ?? null)}
                className="mt-1"
              />
              {thumbProgress > 0 && (
                <div className="text-xs text-teal mt-1">
                  Thumb: {thumbProgress}%
                </div>
              )}
            </div>
            <div>
              <Label>Video File</Label>
              <Input
                type="file"
                accept="video/*"
                onChange={(e) => setVideoFile(e.target.files?.[0] ?? null)}
                className="mt-1"
              />
              {videoProgress > 0 && (
                <div className="text-xs text-teal mt-1">
                  Video: {videoProgress}%
                </div>
              )}
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                disabled={uploading}
                className="rounded-full bg-teal text-white hover:bg-teal/90"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Video
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">
            Uploaded Videos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : videos && videos.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Thumbnail</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {videos.map((v) => (
                  <TableRow key={v.title}>
                    <TableCell className="font-medium">{v.title}</TableCell>
                    <TableCell>
                      <Badge className="bg-teal/10 text-teal border-0">
                        {v.subject}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {v.thumbnailId && blobMap.get(v.thumbnailId) ? (
                        <img
                          src={blobMap.get(v.thumbnailId)!.getDirectURL()}
                          alt="thumb"
                          className="w-16 h-10 object-cover rounded"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">
                          No thumbnail
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteVideo
                            .mutateAsync()
                            .then(() => toast.success("Deleted"))
                            .catch(() => toast.error("Delete failed"))
                        }
                        className="rounded-full"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No videos uploaded yet. Use the form above to add your first
              lesson.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function CoursesTab() {
  const { data: courses, isLoading } = useGetCourses();
  const addCourse = useAddCourse();
  const deleteCourse = useDeleteCourse();
  const [form, setForm] = useState({
    title: "",
    subject: "",
    duration: "",
    fee: "",
    description: "",
  });

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCourse.mutateAsync({
        title: form.title,
        subject: form.subject,
        duration: form.duration,
        fee: BigInt(form.fee || "0"),
        description: form.description,
      });
      toast.success("Course added!");
      setForm({
        title: "",
        subject: "",
        duration: "",
        fee: "",
        description: "",
      });
    } catch {
      toast.error("Failed to add course.");
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">
            Add New Course
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>Course Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Organic Chemistry"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subject</Label>
              <Input
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="Chemistry"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Duration</Label>
              <Input
                value={form.duration}
                onChange={(e) =>
                  setForm((p) => ({ ...p, duration: e.target.value }))
                }
                placeholder="12 Weeks"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Monthly Fee (₹)</Label>
              <Input
                type="number"
                value={form.fee}
                onChange={(e) =>
                  setForm((p) => ({ ...p, fee: e.target.value }))
                }
                placeholder="450"
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Course description..."
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={addCourse.isPending}
                className="rounded-full bg-navy text-white hover:bg-navy/90"
              >
                {addCourse.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Course"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">
            Current Courses
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : courses && courses.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((c) => (
                  <TableRow key={c.title}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>{c.subject}</TableCell>
                    <TableCell>{c.duration}</TableCell>
                    <TableCell>₹{String(c.fee)}/mo</TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteCourse
                            .mutateAsync()
                            .then(() => toast.success("Deleted"))
                            .catch(() => toast.error("Failed"))
                        }
                        className="rounded-full"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No courses added yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function TutorsTab() {
  const { data: tutors, isLoading } = useGetTutors();
  const { data: blobs } = useGetExternalBlobs();
  const addTutor = useAddTutor();
  const deleteTutor = useDeleteTutor();
  const saveBlob = useSaveExternalBlob();
  const blobMap = new Map<string, any>((blobs as any) ?? []);
  const [form, setForm] = useState({ name: "", subject: "", bio: "" });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      let photoId = "";
      if (photoFile) {
        photoId = `photo_${Date.now()}`;
        const bytes = new Uint8Array(await photoFile.arrayBuffer());
        const blob = ExternalBlob.fromBytes(bytes);
        await saveBlob.mutateAsync({ id: photoId, blob });
      }
      await addTutor.mutateAsync({
        name: form.name,
        subject: form.subject,
        bio: form.bio,
        photoId,
      });
      toast.success("Tutor added!");
      setForm({ name: "", subject: "", bio: "" });
      setPhotoFile(null);
    } catch {
      toast.error("Failed to add tutor.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">Add Tutor</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleAdd}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div>
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Dr. Ahmed Hassan"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Subject Specialty</Label>
              <Input
                value={form.subject}
                onChange={(e) =>
                  setForm((p) => ({ ...p, subject: e.target.value }))
                }
                placeholder="Organic Chemistry"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label>Profile Photo</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files?.[0] ?? null)}
                className="mt-1"
              />
            </div>
            <div className="md:col-span-2">
              <Label>Bio</Label>
              <Textarea
                value={form.bio}
                onChange={(e) =>
                  setForm((p) => ({ ...p, bio: e.target.value }))
                }
                placeholder="Short biography..."
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Button
                type="submit"
                disabled={uploading || addTutor.isPending}
                className="rounded-full bg-navy text-white hover:bg-navy/90"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Add Tutor"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="rounded-xl shadow-card">
        <CardHeader>
          <CardTitle className="font-display text-navy">
            Current Tutors
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <Skeleton className="h-24 rounded-xl" />
          ) : tutors && tutors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {tutors.map((t) => (
                <motion.div
                  key={t.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <Card className="rounded-xl overflow-hidden">
                    {t.photoId && blobMap.get(t.photoId) && (
                      <img
                        src={blobMap.get(t.photoId)!.getDirectURL()}
                        alt={t.name}
                        className="w-full aspect-square object-cover"
                      />
                    )}
                    <CardContent className="p-3">
                      <p className="font-semibold text-navy text-sm">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground mb-2">
                        {t.subject}
                      </p>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() =>
                          deleteTutor
                            .mutateAsync()
                            .then(() => toast.success("Deleted"))
                            .catch(() => toast.error("Failed"))
                        }
                        className="w-full rounded-full text-xs"
                      >
                        <Trash2 className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No tutors added yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function ContactsTab() {
  const { data: contacts, isLoading } = useGetContacts();

  return (
    <Card className="rounded-xl shadow-card">
      <CardHeader>
        <CardTitle className="font-display text-navy">
          Enrollment Requests
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-24 rounded-xl" />
        ) : contacts && contacts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c, i) => (
                <TableRow key={c.email || String(i)}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell className="max-w-xs truncate text-muted-foreground">
                    {c.message}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-10 text-muted-foreground">
            No enrollment requests yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
