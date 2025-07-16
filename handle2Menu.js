// handle2Menu.js
export const sendAdvancedMenu = async (sock, from, m) => {
  const menuText = `
📦 *قائمة الأوامر المتطورة – قائمة 2* 📦

🔹 .video [كلمة] — تحميل فيديو من YouTube  
🔹 .tiks [كلمة] — بحث فيديوهات TikTok  
🔹 .song [كلمة] — تحميل أغنية من YouTube / SoundCloud  
🔹 .dark — لتنصيب البوت يروحي 💞

⚡ تم تطوير هذه القائمة لراحة المستخدم وسرعة الوصول للخدمات المتقدمة.

🌐 القناة الرسمية:
https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D
`.trim();

  try {
    await sock.sendMessage(from, {
      text: menuText,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "𝐃𝐀𝐑𝐊 𝐁𝐎𝐓 ⚡ قائمة 2",
          body: "القائمة المتقدمة لأوامر الوسائط",
          thumbnailUrl: 'https://telegra.ph/file/1e60489705c851f74b55e.jpg',
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: 'https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D'
        }
      }
    }, { quoted: m });
  } catch (err) {
    console.error('❌ فشل في إرسال قائمة 2:', err);
  }
};
