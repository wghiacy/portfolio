export default async () => {
  const videoResponse = await fetch('https://portfolio-wyceghiacy.netlify.app/video_preview.mp4');
  const headers = new Headers(videoResponse.headers);

  // Ensure content-type is set
  headers.set("content-type", "video/mp4");

  return new Response(videoResponse.body, {
    status: videoResponse.status,
    statusText: videoResponse.statusText,
    headers
  });
};