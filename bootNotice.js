// bootNotice.js
import fs from 'fs';

const message = `🌟 تم تشغيل البوت بنجاح!

✅ للتأكد أن البوت يعمل اكتب: بوت
📜 لعرض قائمة الأوامر اكتب: قائمة
لعرض القائمة المتطورة اكتب:.قائمة2
⏱️ وقت التشغيل: ${new Date().toLocaleString('ar-EG', { timeZone: 'Africa/Cairo' })}

🤖 برعاية: https://wa.me/+201515878218?text=سجلتك+يدارك+سجلني+حبك
`;

export const sendBootNotice = async (sock) => {
  try {
    const allChats = await sock.groupFetchAllParticipating();
    const groups = Object.keys(allChats);

    for (const groupId of groups) {
      // إرسال الرسالة النصية
      await sock.sendMessage(groupId, { text: message.trim() });

      // إرسال الصورة بعد النص
      const imageBuffer = fs.readFileSync('./boot.jpg'); // ← تأكد الصورة اسمها boot.jpg وموجودة جنب الملف
      await sock.sendMessage(groupId, {
        image: imageBuffer,
        caption: '✅ Bot has activity!'
      });
    }

    console.log('✅ تم إرسال رسالة التشغيل والصورة إلى كل الجروبات.');
  } catch (err) {
    console.error('❌ فشل في إرسال رسالة التشغيل أو الصورة:', err);
  }
};
