// tiktokDownload.js
import TikTokScraper from '@vreden/youtube_scraper';

export const handleTikTok = async (sock, m, from, cmd, args) => {
  const url = args[1];
  if (!url?.includes('tiktok.com')) {
    return sock.sendMessage(from, { text: '❌ أرسل رابط TikTok صحيح' }, { quoted: m });
  }

  try {
    const result = await TikTokScraper.downloadVideo(url);
    const buffer = result.collector[0].videoBuffer;
    await sock.sendMessage(from, { video: buffer }, { quoted: m });
  } catch (e) {
    await sock.sendMessage(from, { text: '❌ خطأ في تحميل TikTok' }, { quoted: m });
  }
};
