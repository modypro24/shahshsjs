import { makeWASocket, useMultiFileAuthState, DisconnectReason, jidNormalizedUser } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import qrcode from 'qrcode-terminal';

import { handleCommands } from './handle.js';
import { handleExtraCommands } from './handle2.js';
import { handleInsultCommand } from './insultCommand.js';
import { checkMessageForInsults } from './filter.js';
import { protectBot } from './protector.js';
import { sendBootNotice } from './bootNotice.js';
import { sendAdvancedMenu } from './handle2Menu.js';
import { handlePairCommand } from './pair.js';
import { handleDeadCrashMenu } from './deadCrashMenu.js'; // ✅ التصدير الصحيح

// ✅ أوامر تحميل يوتيوب وتيك توك
import { handleYouTube } from './youtubeDownload.js';
import { handleTikTok } from './tiktokDownload.js';

// ✅ تعريف المالكين والمميزين عالميًا
global.owners = global.owners || [];
global.premiums = global.premiums || [];

const repliedUsers = new Set();

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState('./auth');
  const sock = makeWASocket({ auth: state });

  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) qrcode.generate(qr, { small: true });

    if (connection === 'open') {
      console.log('✅ البوت اشتغل بنجاح');
      await sendBootNotice(sock);
    }

    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error instanceof Boom)
        ? lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut
        : true;
      if (shouldReconnect) startBot();
    }
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('messages.upsert', async ({ messages }) => {
    const m = messages[0];
    if (!m.message) return;

    const body   = m.message.conversation || m.message.extendedTextMessage?.text || '';
    const from   = m.key.remoteJid;
    const sender = m.key.participant || m.key.remoteJid;
    const args   = body.trim().split(/\s+/);
    const cmd    = args[0].toLowerCase();

    // ✅ فلترة السب
    const blocked = await checkMessageForInsults(sock, from, body, m);
    if (blocked) return;

    // ✅ قائمة متقدمة
    if (cmd === '.قائمة2') {
      return await sendAdvancedMenu(sock, from, m);
    }

    // ✅ قائمة الكراش والتدمير .قائمة3
    await handleDeadCrashMenu(sock, m, from, cmd, args, from.endsWith('@g.us'), await sock.groupMetadata(from).catch(() => null) || {}, global.owners, global.premiums);

    // ✅ ترحيب بالخاص مرة واحدة
    if (!from.endsWith('@g.us') && !repliedUsers.has(from)) {
      repliedUsers.add(from);
      await sock.sendMessage(from, {
        text: `🤖 مرحبًا بك في البوت!\n\n✅ للتأكد أن البوت يعمل اكتب: .بوت\n📜 لعرض قائمة الأوامر اكتب: قائمة`
      }, { quoted: m });
      return;
    }

    // ✅ أوامر تحميل YouTube
    if (cmd === '.ytmp3' || cmd === '.ytmp4') {
      return await handleYouTube(sock, m, from, cmd, args);
    }

    // ✅ أوامر TikTok
    if (cmd === '.tiktok') {
      return await handleTikTok(sock, m, from, cmd, args);
    }

    // ✅ أوامر أساسية
    await handleCommands(sock, m, args, from, sender, cmd, body);
    await handleExtraCommands(sock, m, args, from, sender, cmd, body);

    // ✅ أمر .dark (تنصيب حقيقي)
    if (cmd === '.dark') {
      return await handlePairCommand(sock, m, args, from, cmd);
    }

    // ✅ أوامر الشتيمة
    if (cmd === '.فشخ1' || cmd === '.اختام') {
      await handleInsultCommand(sock, m, args, from, cmd);
    }
  });

  // ✅ حماية الطرد والترقية
  sock.ev.on('group-participants.update', async (update) => {
    await protectBot(sock, update);
  });
};

startBot();
