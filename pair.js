// pair.js

import qrcode from 'qrcode';
import { useMultiFileAuthState, makeWASocket } from '@whiskeysockets/baileys';

export const handlePairCommand = async (sock, m, args, from, cmd) => {
  if (cmd === '.dark') {
    const target = args[1];
    if (!target || !/^01\d{9}$/.test(target)) {
      return await sock.sendMessage(from, {
        text: '📌 اكتب رقم مصري بعد الأمر بالشكل الصحيح:\nمثال: .dark 01012345678'
      }, { quoted: m });
    }

    const { state, saveCreds } = await useMultiFileAuthState(`./sessions/${target}`);
    const tempSock = makeWASocket({
      auth: state,
      printQRInTerminal: false
    });

    tempSock.ev.once('connection.update', async (update) => {
      const { qr } = update;
      if (qr) {
        const qrImage = await qrcode.toBuffer(qr, { type: 'png' });

        await sock.sendMessage(from, {
          image: qrImage,
          caption: `🔗 امسح هذا الكود من رقمك ${target} خلال دقيقة لربط البوت.`
        }, { quoted: m });

        setTimeout(() => {
          try {
            tempSock.end();
          } catch {}
        }, 60000);
      }
    });
  }
};

