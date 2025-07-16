// ✅ قائمة 2 المتطورة - handle2.js

import ytdl from 'ytdl-core';

// دالة لتحميل فيديو يوتيوب وإرساله للمستخدم
async function downloadYouTube(sock, m, args, from) {
  try {
    const url = args[1];
    if (!url || !ytdl.validateURL(url)) {
      return await sock.sendMessage(from, { text: '❗ أرسل رابط يوتيوب صالح، مثل:\n.يوتيوب https://youtube.com/...' });
    }

    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const stream = ytdl(url, {
      filter: 'audioandvideo',
      quality: '18', // mp4 متوسط الجودة
    });

    await sock.sendMessage(from, {
      video: stream,
      mimetype: 'video/mp4',
      fileName: `${title}.mp4`,
      caption: `🎬 تم التحميل بنجاح: *${title}*`
    }, { quoted: m });
  } catch (err) {
    console.error('❌ خطأ في تحميل يوتيوب:', err.message);
    await sock.sendMessage(from, { text: '❌ حدث خطأ أثناء التحميل من يوتيوب.' });
  }
}

// ✅ دالة تنفيذ أوامر قائمة 2
export async function handleExtraCommands(sock, m, args, from, sender, cmd, body) {
  try {
    switch (cmd) {
      case '.يوتيوب':
        await downloadYouTube(sock, m, args, from);
        break;

      // ☑️ هنا يمكنك إضافة أوامر متطورة أخرى لاحقًا بسهولة

      default:
        // لا شيء حالياً
        break;
    }
  } catch (err) {
    console.error('❌ خطأ في handle2:', err.message);
  }
}
