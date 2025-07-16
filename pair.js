// pair.js

import qrcode from 'qrcode';
import { useMultiFileAuthState, makeWASocket } from '@whiskeysockets/baileys';

export const handlePairCommand = async (sock, m, args, from, cmd) => {
  if (cmd === '.dark') {
    const target = args[1];
    
    // تحقق من صحة الرقم المصري
    if (!target || !/^01\d{9}$/.test(target)) {
      return await sock.sendMessage(from, {
        text: '📌 اكتب رقم مصري بعد الأمر بالشكل الصحيح:\nمثال: .dark 01012345678'
      }, { quoted: m });
    }

    try {
      const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${target}`);
      const tempSock = makeWASocket({
        auth: state,
        printQRInTerminal: false
      });

      // انتظار QR
      tempSock.ev.once('connection.update', async (update) => {
        const { qr } = update;

        if (qr) {
          const qrBuffer = await qrcode.toBuffer(qr); // توليد صورة QR

          await sock.sendMessage(from, {
            image: qrBuffer,
            caption: `🔗 امسح هذا الكود من رقمك ${target} خلال دقيقة لربط البوت بالجهاز.`
          }, { quoted: m });

          // إغلاق الاتصال المؤقت بعد دقيقة
          setTimeout(() => {
            try {
              tempSock.end();
            } catch (e) {}
          }, 60000);
        }
      });
    } catch (err) {
      console.error('❌ خطأ أثناء توليد الكود:', err);
      await sock.sendMessage(from, { text: '❌ حدث خطأ أثناء توليد كود التنصيب. حاول مرة أخرى.' }, { quoted: m });
    }
  }
};
