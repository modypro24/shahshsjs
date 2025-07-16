import { makeWASocket, useMultiFileAuthState } from '@whiskeysockets/baileys';
import qrcode from 'qrcode';
import fs from 'fs';

export const handlePairCommand = async (sock, m, args, from, cmd) => {
  if (cmd !== '.dark') return;

  if (!args[1]) {
    return await sock.sendMessage(from, {
      text: '📌 اكتب رقم واتساب:\nمثال: `.dark 201000000000`'
    }, { quoted: m });
  }

  const number = args[1].replace(/\D/g, '');
  const authPath = `./auths/${number}`;
  if (!fs.existsSync('./auths')) fs.mkdirSync('./auths');

  const { state, saveCreds } = await useMultiFileAuthState(authPath);
  const newSock = makeWASocket({ auth: state });

  newSock.ev.on('connection.update', async ({ qr, connection }) => {
    if (qr) {
      const qrImage = await qrcode.toDataURL(qr);
      const buffer = Buffer.from(qrImage.split(',')[1], 'base64');

      await sock.sendMessage(from, {
        image: buffer,
        caption: `🔗 امسح الكود من تطبيق واتساب لربط رقم *${number}*`,
      }, { quoted: m });
    }

    if (connection === 'open') {
      await sock.sendMessage(from, {
        text: `✅ تم ربط رقم *${number}* بنجاح. يمكنك الآن استخدام البوت من الرقم دا.`
      }, { quoted: m });
    }
  });

  newSock.ev.on('creds.update', saveCreds);
};
