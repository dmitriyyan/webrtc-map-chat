import { useRef, useEffect } from "react";

type Props = {
  stream: MediaStream | null;
  muted?: boolean;
};

const Video = ({ stream, muted = false }: Props) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.onloadedmetadata = () => {
        videoRef.current?.play();
      };
    }
  }, [stream]);

  return (
    <div className="map_page_v_rooms_video_container">
      <video
        ref={videoRef}
        width="98%"
        height="98%"
        playsInline
        autoPlay
        muted={muted}
      />
    </div>
  );
};

export default Video;
