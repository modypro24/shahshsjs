// ✅ protector.js - إصدار نهائي متطور وثابت

const OWNER_NUMBER = "201557485522@s.whatsapp.net"; // رقم المالك بصيغة واتساب الدولية

const TELEGRAPH_IMAGE_URL = "https://telegra.ph/file/eab56d7f8cccb2c50eb00.png"; // صورة أنمي مظلمة بتنسيق .png

// دالة لحساب عدد الرسائل خلال آخر نصف ساعة
const countMessagesInLast30Min = (messages, jid) => {
  const now = Date.now();
  const halfHour = 30 * 60 * 1000;
  return messages.filter(msg =>
    msg.key?.participant === jid &&
    (now - (msg.messageTimestamp * 1000)) <= halfHour
  ).length;
};

export const protectBot = async (sock, update) => {
  const { participants, action, id: groupId, author } = update;
  if (!participants || !action || !groupId) return;

  try {
    const metadata = await sock.groupMetadata(groupId);

    // تحميل آخر 100 رسالة من المجموعة (قد تحتاج إلى وجود store مفعل)
    const recentMessages = sock.store?.messages?.get(groupId)?.toArray?.() || [];

    for (const participant of participants) {
      const userMention = `@${participant.split('@')[0]}`;
      const messagesCount = countMessagesInLast30Min(recentMessages, participant);
      const initiator = author || 'عضو غير معروف';
      const initiatorMention = `@${initiator.split('@')[0]}`;

      // 🛡️ منع طرد البوت أو المالك
      if (action === 'remove' && (participant === sock.user.id || participant === OWNER_NUMBER)) {
        try {
          await sock.groupParticipantsUpdate(groupId, [participant], 'add');
          await sock.sendMessage(groupId, {
            text: `🚫 لا يمكن طرد هذا العضو من المجموعة! تم إرجاعه تلقائيًا.`
          });
        } catch (e) {
          console.error('❌ فشل في إعادة العضو:', e);
        }
        continue;
      }

      // 📤 إشعار بالطرد
      if (action === 'remove') {
        await sock.sendMessage(groupId, {
          text: `🚷 تم طرد العضو:\n👤 ${userMention}\nبواسطة: ${initiatorMention}\n\n💬 عدد الرسائل آخر نصف ساعة: ${messagesCount}`,
          mentions: [participant, initiator],
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title: "𝐃𝐀𝐑𝐊 𝐁𝐎𝐓 ⚡ الحماية",
              body: "تم طرد عضو من المجموعة",
              thumbnailUrl: TELEGRAPH_IMAGE_URL,
              mediaType: 1,
              renderLargerThumbnail: true,
              showAdAttribution: true,
              sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
            }
          }
        });
      }

      // 🆙 إشعار بالترقية
      if (action === 'promote') {
        await sock.sendMessage(groupId, {
          text: `👑 تم ترقية العضو:\n🆙 ${userMention}\nبواسطة: ${initiatorMention}\n\n💬 عدد الرسائل آخر نصف ساعة: ${messagesCount}`,
          mentions: [participant, initiator],
          contextInfo: {
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
              title: "𝐃𝐀𝐑𝐊 𝐁𝐎𝐓 ⚡ حماية المجموعة",
              body: "تمت ترقية عضو جديد",
              thumbnailUrl: TELEGRAPH_IMAGE_URL,
              mediaType: 1,
              renderLargerThumbnail: true,
              showAdAttribution: true,
              sourceUrl: "https://whatsapp.com/channel/0029VbApA5g6LwHf2RgRYH0D"
            }
          }
        });
      }
    }
  } catch (err) {
    console.error('❌ خطأ في وحدة الحماية:', err);
  }
};
