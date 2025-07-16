// الكلمات الممنوعة
const badWords = [
  "كس", "نيك", "طيز", "عرص", "شرموط", "خول", "متناك",
  "أيري", "زب", "كلب", "كسمك", "منيوك", "ديوث", "منيك"
];

// فلتر لتطبيع النص العربي
const normalize = (text) => text
  .toLowerCase()
  .replace(/[^\u0600-\u06FF\s]/g, '')  // إزالة الرموز غير العربية
  .replace(/[\u064B-\u065F]/g, '')     // تشكيل
  .replace(/[إأآ]/g, 'ا')
  .replace(/ى/g, 'ي')
  .replace(/ؤ/g, 'و')
  .replace(/ئ/g, 'ي')
  .replace(/\s+/g, '');

// تحذيرات وحظر
const warnings = {};
const blocked = new Set();

export const checkMessageForInsults = async (sock, from, body, m) => {
  try {
    // لا تتفاعل مع الرسائل اللي قبل تشغيل البوت
    if (!body || body.startsWith('.') || m.messageTimestamp < Math.floor(Date.now() / 1000) - 10) return;

    const user = m.key.participant || m.key.remoteJid;
    if (blocked.has(user)) return;

    const cleanText = normalize(body);

    // تطابق دقيق مع الكلمات الممنوعة
    const hasBad = badWords.some(bad => cleanText.includes(normalize(bad)));

    if (!hasBad) return;

    warnings[user] = (warnings[user] || 0) + 1;

    // حذف الرسالة
    try {
      await sock.sendMessage(from, {
        delete: {
          remoteJid: from,
          fromMe: false,
          id: m.key.id,
          participant: user
        }
      });
    } catch {}

    const mentionTag = `@${user.split('@')[0]}`;

    if (warnings[user] === 1) {
      await sock.sendMessage(from, {
        text: `⚠️ تحذير أول يا ${mentionTag}، الكلام ده مرفوض.`,
        mentions: [user]
      });
    } else if (warnings[user] === 2) {
      await sock.sendMessage(from, {
        text: `🚫 إنذار أخير يا ${mentionTag}، المرة الجاية هتتطرد.`,
        mentions: [user]
      });
    } else {
      // محاولة طرده
      const groupMeta = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botData = groupMeta.participants.find(p => p.id === botNumber);
      const targetData = groupMeta.participants.find(p => p.id === user);

      const isBotAdmin = botData?.admin === 'admin';
      const isTargetAdmin = targetData?.admin === 'admin';

      if (isBotAdmin && !isTargetAdmin) {
        await sock.groupParticipantsUpdate(from, [user], 'remove');
        await sock.sendMessage(from, {
          text: `❌ تم طرد ${mentionTag} بسبب تكرار الشتائم.`,
          mentions: [user]
        });
      } else {
        await sock.sendMessage(from, {
          text: `⚠️ مقدرتش أطرد ${mentionTag} (يا إما هو أدمن أو البوت مش أدمن).`,
          mentions: [user]
        });
      }

      blocked.add(user);
    }

  } catch (err) {
    console.error('❌ خطأ في فلتر الشتائم:', err.message);
  }
};
