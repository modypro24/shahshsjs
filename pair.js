// ✅ pair.js import { makeWASocket, useMultiFileAuthState, DisconnectReason } from '@whiskeysockets/baileys'; import qrcode from 'qrcode';

export const handleRealInstall = async (sock, m, args, from) => { if (!args[1]) { return await sock.sendMessage(from, { text: '📲 اكتب رقمك المصري بعد الأمر:\nمثال: .dark 201000000000' }, { quoted: m }); }

const target = args[1].replace(/\D/g, ''); if (!target.startsWith('2010') && !target.startsWith('2011') && !target.startsWith('2012') && !target.startsWith('2015')) { return await sock.sendMessage(from, { text: '❌ رقم غير مصري أو غير مدعوم للتنصيب الحقيقي.' }, { quoted: m }); }

// 🔐 أنشئ auth جديد لهذا الرقم const authPath = ./auth-${target}; const { state, saveCreds } = await useMultiFileAuthState(authPath);

const tempSock = makeWASocket({ auth: state, printQRInTerminal: false, });

tempSock.ev.once('connection.update', async ({ qr, connection }) => { if (qr) { const qrImage = await qrcode.toDataURL(qr); const base64 = qrImage.split(',')[1]; const buffer = Buffer.from(base64, 'base64');

await sock.sendMessage(from, {
    image: buffer,
    caption: 🔒 امسح هذا الكود من واتساب على جهازك الجديد لتثبيت البوت الحقيقي.,
  }, { quoted: m });
}

if (connection === 'open') {
  await sock.sendMessage(from, { text: ✅ تم ربط الجهاز بنجاح مع الرقم ${target} });
}

});

tempSock.ev.on('creds.update', saveCreds); };
