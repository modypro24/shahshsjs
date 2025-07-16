// youtubeDownload.js
import ytdl from 'ytdl-core';

export const handleYouTube = async (sock, m, from, cmd, args) => {
  const isAudio = cmd === '.ytmp3';
  const url = args[1];
  if (!url || !ytdl.validateURL(url)) {
    return sock.sendMessage(from, { text: '❌ أرسل رابط يوتيوب صحيح' }, { quoted: m });
  }
  const info = await ytdl.getInfo(url);
  const format = isAudio ? 'audioonly' : 'highestvideo';

  const stream = ytdl(url, { filter: format });
  await sock.sendMessage(from, {
    document: stream,
    fileName: `${info.videoDetails.title}.${isAudio ? 'mp3' : 'mp4'}`,
  }, { quoted: m });
};
