export default async (request) => {
  const range = request.headers.get('range');
  const videoUrl = 'https://portfolio-wyceghiacy.netlify.app/video_preview.mp4';

  // Fetch the whole file as ArrayBuffer (not efficient for large files)
  const videoResponse = await fetch(videoUrl);
  const buffer = await videoResponse.arrayBuffer();
  const videoLength = buffer.byteLength;

  if (range) {
    const matches = /bytes=(\d+)-(\d*)/.exec(range);
    const start = Number(matches[1]);
    const end = matches[2] ? Number(matches[2]) : videoLength - 1;
    const chunk = buffer.slice(start, end + 1);

    return new Response(chunk, {
      status: 206,
      headers: {
        "Content-Range": `bytes ${start}-${end}/${videoLength}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunk.byteLength,
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }

  // No range header, send the whole file
  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Length": videoLength,
      "Content-Type": "video/mp4",
      "Accept-Ranges": "bytes",
      "Access-Control-Allow-Origin": "*"
    }

    curl -I -H "Range: bytes=0-1" https://portfolio-wyceghiacy.netlify.app/video_preview.mp4
  });
};
