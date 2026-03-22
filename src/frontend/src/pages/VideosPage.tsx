import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, PlayCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Video } from "../backend.d";
import { useGetExternalBlobs, useGetVideos } from "../hooks/useQueries";

type VideoWithBlob = {
  video: Video;
  thumbUrl: string | null;
  videoUrl: string | null;
};

export default function VideosPage() {
  const { data: videos, isLoading } = useGetVideos();
  const { data: blobs } = useGetExternalBlobs();
  const [selected, setSelected] = useState<{
    title: string;
    url: string | null;
    thumb: string;
  } | null>(null);

  const blobMap = new Map<string, any>((blobs as any) ?? []);

  const videoCards: VideoWithBlob[] = (videos ?? []).map((v) => ({
    video: v,
    thumbUrl: v.thumbnailId
      ? (blobMap.get(v.thumbnailId)?.getDirectURL() ?? null)
      : null,
    videoUrl: v.videoFileId
      ? (blobMap.get(v.videoFileId)?.getDirectURL() ?? null)
      : null,
  }));

  return (
    <div className="min-h-screen">
      <div className="bg-navy py-14">
        <div className="container mx-auto px-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors"
            data-ocid="videos.link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="font-display font-bold text-4xl text-white mb-3">
            Watch Our Lessons
          </h1>
          <p className="text-white/70 max-w-xl">
            Chemistry lessons by Chem. Master — covering Class 11, Class 12, JEE
            and NEET topics.
          </p>
        </div>
      </div>

      <section className="bg-section-light py-16">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              data-ocid="videos.loading_state"
            >
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="aspect-video rounded-xl" />
              ))}
            </div>
          ) : videoCards.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-20 text-center"
              data-ocid="videos.empty_state"
            >
              <PlayCircle className="w-24 h-24 text-muted-foreground/25 mb-6" />
              <h2 className="font-display font-bold text-2xl text-navy mb-3">
                No lessons posted yet
              </h2>
              <p className="text-muted-foreground max-w-sm">
                Check back soon — lessons will appear here once uploaded.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videoCards.map((vc, i) => (
                <motion.div
                  key={vc.video.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  data-ocid={`videos.item.${i + 1}`}
                >
                  <VideoCard
                    title={vc.video.title}
                    subject={vc.video.subject}
                    description={vc.video.description}
                    thumb={
                      vc.thumbUrl ??
                      "/assets/generated/video-thumb-periodic-table.dim_640x360.jpg"
                    }
                    onPlay={() =>
                      setSelected({
                        title: vc.video.title,
                        url: vc.videoUrl,
                        thumb: vc.thumbUrl ?? "",
                      })
                    }
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <Dialog open onOpenChange={() => setSelected(null)}>
            <DialogContent
              className="max-w-3xl p-0 overflow-hidden rounded-xl"
              data-ocid="videos.dialog"
            >
              <DialogHeader className="p-4 pb-0">
                <div className="flex items-center justify-between">
                  <DialogTitle className="font-display text-navy">
                    {selected.title}
                  </DialogTitle>
                  <button
                    type="button"
                    onClick={() => setSelected(null)}
                    className="text-muted-foreground hover:text-foreground"
                    data-ocid="videos.close_button"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </DialogHeader>
              <div className="p-4">
                {selected.url ? (
                  <video
                    src={selected.url}
                    controls
                    autoPlay
                    className="w-full rounded-lg aspect-video bg-black"
                  >
                    <track kind="captions" />
                  </video>
                ) : (
                  <div className="aspect-video rounded-lg overflow-hidden relative">
                    <img
                      src={selected.thumb}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/60 flex flex-col items-center justify-center">
                      <PlayCircle className="w-16 h-16 text-gold mb-3" />
                      <p className="text-white font-semibold">
                        Video coming soon
                      </p>
                      <p className="text-white/60 text-sm mt-1">
                        Upload a video in the admin panel
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}

function VideoCard({
  title,
  subject,
  description,
  thumb,
  onPlay,
}: {
  title: string;
  subject: string;
  description: string;
  thumb: string;
  onPlay: () => void;
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-shadow">
      <button
        type="button"
        className="relative aspect-video cursor-pointer group w-full"
        onClick={onPlay}
      >
        <img src={thumb} alt={title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-navy/30 group-hover:bg-navy/50 transition-colors flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-gold/90 flex items-center justify-center shadow-lg">
            <PlayCircle className="w-7 h-7 text-navy" />
          </div>
        </div>
      </button>
      <div className="p-4">
        <Badge className="bg-teal/10 text-teal border-0 mb-2 text-xs">
          {subject}
        </Badge>
        <h3 className="font-display font-bold text-navy mb-1">{title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {description}
        </p>
        <button
          type="button"
          onClick={onPlay}
          className="mt-3 text-teal font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all"
          data-ocid="videos.button"
        >
          Watch Now <PlayCircle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
