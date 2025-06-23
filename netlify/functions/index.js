export default async (request) => {
  // Forward the Range header if present
  const headers = {};
  if (request.headers.get('range')) {
    headers['range'] = request.headers.get('range');
  }

  const videoResponse = await fetch(
    'https://portfolio-wyceghiacy.netlify.app/video_preview.mp4',
    { headers }
  );

  // Copy all headers from the upstream response
  const responseHeaders = new Headers(videoResponse.headers);
  responseHeaders.set("content-type", "video/mp4");
  responseHeaders.set("Access-Control-Allow-Origin", "*");

  return new Response(videoResponse.body, {
    status: videoResponse.status,
    statusText: videoResponse.statusText,
    headers: responseHeaders
  });
};
