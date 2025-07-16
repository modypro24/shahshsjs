import fs from 'fs';
import path from 'path';

const PAIR_CODES_PATH = './pair-codes.json';
const IMAGE_PATH = path.resolve('./pairdark.jpg');

const handlePairCommand = async (sock, m, args, from, cmd) => {
  if (cmd !== '.pair') return;

  const number = args[1];
  if (!number || !/^\d{10,15}$/.test(number)) {
    return sock.sendMessage(from, {
      text: '❗ من فضلك اكتب الأمر بهذا الشكل:\n\n.pair 201234567890'
    }, { quoted: m });
  }

  const code = Math.floor(10000000 + Math.random() * 90000000);

  const caption = `🌌 *ربط الجهاز* 🌌

🔗 رقم الهاتف: wa.me/${number}
📟 كود الربط: *${code}*

📥 انسخ الكود وادخله في تطبيق البوت لإتمام الربط.
`;

  try {
    if (!fs.existsSync(IMAGE_PATH)) {
      throw new Error('❌ الصورة pairdark.jpg غير موجودة في المجلد.');
    }

    const imageBuffer = fs.readFileSync(IMAGE_PATH);

    await sock.sendMessage(from, {
      image: imageBuffer,
      caption
    }, { quoted: m });

    let data = {};
    if (fs.existsSync(PAIR_CODES_PATH)) {
      try {
        data = JSON.parse(fs.readFileSync(PAIR_CODES_PATH, 'utf8'));
      } catch {
        data = {};
      }
    }

    data[number] = {
      code,
      timestamp: new Date().toISOString()
    };

    fs.writeFileSync(PAIR_CODES_PATH, JSON.stringify(data, null, 2));

  } catch (err) {
    console.error('❌ خطأ في إرسال كود الربط:', err.message);
    await sock.sendMessage(from, {
      text: '❌ فشل في إرسال كود الربط أو تحميل الصورة. تأكد من وجود "pairdark.jpg".'
    }, { quoted: m });
  }
};

// ✅ تصدير الدالة بالشكل الصحيح
export { handlePairCommand };
