// pair.js - تنفيذ أمر .dark لإرسال كود ربط جهاز حقيقي
import fs from 'fs';
import path from 'path';

const IMAGE_PATH = path.resolve('./pairdark.jpg');

export const handlePairCommand = async (sock, m, args, from, cmd) => {
  if (cmd !== '.dark') return;

  const number = args[1];
  if (!number || !/^20\d{9}$/.test(number)) {
    return await sock.sendMessage(from, {
      text: '❗ اكتب رقم مصري صحيح بعد الأمر:\nمثال: .dark 201234567890'
    }, { quoted: m });
  }

  try {
    // ✅ جلب كود ربط جهاز فعلي
    const code = await sock.requestPairingCode(number);

    const caption = `🔗 *رابط الجهاز الحقيقي* 🔗

📞 رقم: wa.me/${number}
📟 كود التنصيب: *${code}*

⚠️ أدخل هذا الكود في واتساب على الجهاز المطلوب لربطه فعليًا.
`;

    // ✅ إرسال صورة إن وجدت
    if (fs.existsSync(IMAGE_PATH)) {
      const imageBuffer = fs.readFileSync(IMAGE_PATH);
      await sock.sendMessage(from, {
        image: imageBuffer,
        caption
      }, { quoted: m });
    } else {
      await sock.sendMessage(from, { text: caption }, { quoted: m });
    }

  } catch (error) {
    console.error('❌ فشل التنصيب:', error);
    await sock.sendMessage(from, {
      text: `❌ تعذر جلب كود التنصيب. السبب:\n${error.message}`
    }, { quoted: m });
  }
};
