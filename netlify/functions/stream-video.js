export default async () => {
  // Replace with your own logic to fetch the video as a stream.
  // For example, if the video is stored in a public URL:
  const videoResponse = await fetch('https://portfolio-wyceghiacy.netlify.app/video_preview.mp4');
  const videoStream = videoResponse.body;

  return new Response(videoStream, {
    headers: {
      "content-type": "video/mp4"
    }
  });
}; 