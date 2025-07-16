 // سكربت دارك بوت بعد الدمج الكامل
import axios from 'axios';

// متغيرات الألعاب
let currentGame = null;
let gamePlayers = [];
let gameType = '';
let gameTimeout = null;
let gameID = '';
let winners = [];

export const games = {
    "1": "أسرع واحد يجاوب",
    "2": "تحدي سرعة الكتابة",
    "3": "منشن وسباق",
    "4": "سؤال اختيارات",
    "5": "صح ولا غلط"
};

// أوقات الصلاة بتوقيت القاهرة
const prayerTimes = {
    "الفجر": "04:09",
    "الظهر": "12:57",
    "العصر": "16:33",
    "المغرب": "20:00",
    "العشاء": "21:33",
    "الشروق": "05:55"
};

const correctPassword = "dark";

// رسالة أمر خناقة ثابتة
const messageKhnaga = `طب عايز اشوف دكر ابن دكر يتخانق فل جروب ودارك موجود# \n
\n
متحاولش هتتناك
😁`;

// نهاية الإضافات الجديدة

// تابع handleCommands الأصلي يبدأ هنا
export const handleCommands = async (sock, m, args, from, sender, cmd, body) => {

// أمر تشغيل البوت
if (cmd === 'بوت') {
    let time = new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toLocaleTimeString();
    let message = `✅ تم تشغيل البوت بنجاح\n⏰ الوقت الحالي: ${time}\n🤖 اسم البوت: دارك بوت\n👑 المطور: دارك الموت\n🌐 جروب الدعم: https://chat.whatsapp.com/EqTzBoyR0ZeCJtFdflFAG7\n💥 جاهز لاستقبال الأوامر`;
    return await sock.sendMessage(from, { text: message });
}

// أوامر أساسية
if (cmd === 'سلام') return await sock.sendMessage(from, { text: 'وعليكم السلام ورحمة الله وبركاته' });
if (cmd === 'بنج') return await sock.sendMessage(from, { text: '✅ البوت شغال ✅' });

// ...

// --- هنا سيتم إضافة أوامر جديدة في باقي الأجزاء
// ... استكمال handleCommands من الجزء السابق

// أوامر أساسية متقدمة
if (cmd === 'كابيتال') {
    let text = args.slice(1).join(' ');
    if (!text) return await sock.sendMessage(from, { text: '❗ اكتب نص بعد الأمر.' });
    return await sock.sendMessage(from, { text: text.toUpperCase() });
}

if (cmd === 'سمول') {
    let text = args.slice(1).join(' ');
    if (!text) return await sock.sendMessage(from, { text: 'اكتب نص لتحويله لسمول يعرص انت؟' });
    return await sock.sendMessage(from, { text: text.toLowerCase() });
}

if (cmd === 'تاريخ') {
    let time = new Date(new Date().getTime() + 3 * 60 * 60 * 1000).toLocaleString();
    return await sock.sendMessage(from, { text: `📅 التاريخ: ${time}` });
}

if (cmd === 'المطور') return await sock.sendMessage(from, { text: '👑 المطور: دارك الموت\n🌐 جروب الدعم: https://chat.whatsapp.com/EqTzBoyR0ZeCJtFdflFAG7' });

    if (cmd === 'قائمة') {
        const list = `𓆩 قائمة أوامر 𝐃𝐀𝐑𝐊 𝐁𝐎𝐓 𓆪

    〰️ الأوامر العامة:

    ˼①˹╎▪️ .سلام — للتحية  
    ˼②˹╎▪️ .بنج — فحص حالة البوت  
    ˼③˹╎▪️ .كابيتال — تحويل النص إلى CAPITAL  
    ˼④˹╎▪️ .سمول — تحويل النص إلى small  
    ˼⑤˹╎▪️ .تاريخ — معرفة الوقت والتاريخ  
    ˼⑥˹╎▪️ .المطور — معلومات عن المطور  

    〰️ أوامر الكراش والسبام:

    ˼⑦˹╎▪️ .كراش_رموز [عدد] — إرسال رموز كراش  
    ˼⑧˹╎▪️ .كراش_ايموجي [عدد] — إرسال إيموجي كراش  
    ˼⑨˹╎▪️ .كراش_منشن [رقم] [عدد] — منشن كراش  
    ˼⑩˹╎▪️ .سبام [رقم] [عدد] — سبام لرقم معين  

    〰️ أوامر الجروب:

    ˼⑪˹╎▪️ .تنصيب — تفعيل البوت  
    ˼⑫˹╎▪️ .خد بزبي [رقم] — طرد شخص  
    ˼⑬˹╎▪️ .اضافة [رقم] — إضافة شخص  
    ˼⑭˹╎▪️ .قفل — قفل المجموعة  
    ˼⑮˹╎▪️ .فتح — فتح المجموعة  
    ˼⑯˹╎▪️ .منشن_الكل — منشن لكل الأعضاء  

    〰️ أوامر الألعاب:

    ˼⑰˹╎▪️ .العاب — عرض الألعاب المتوفرة  
    ˼⑱˹╎▪️ .بداية [رقم اللعبة] — بدء اللعبة  
    ˼⑲˹╎▪️ .انضمام — للانضمام للعبة  
    ˼⑳˹╎▪️ .الغاء — لإلغاء اللعبة  
    ˼㉑˹╎▪️ .الفائزين — عرض سجل الفائزين  

    〰️ خدمات متقدمة:

    ˼㉒˹╎▪️ .dark_bugbro11 [رقم] — happy crashing  
    ˼㉓˹╎▪️ .اذان [الصلاة] — تفعيل وقت الأذان  
    ˼㉔˹╎▪️ .داتا — بيانات الخدمات  
    ˼㉕˹╎▪️ .حاله — عرض حالة الأعضاء  
    ˼㉖˹╎▪️ .ترقيه [رقم] — ترقية عضو  
    ˼㉗˹╎▪️ .خناقة — إرسال تحذير خناقة  

    〰️ أوامر الشتائم الإبداعية:

    ˼㉘˹╎▪️ .اختام [منشن] — سبام شتائم "الختم"  
    ˼㉙˹╎▪️ .فشخ1 [منشن] — سبام شتائم "فشخ"  

    *⊹‏⊱≼━━━⌬〔🧠〕⌬━━━≽⊰⊹*
    مطور البوت: @DARK_DEV`;

        await sock.sendMessage(from, { text: list }, { quoted: m });
    }


// أوامر الكراش
if (cmd === 'كراش_رموز') {
    let count = parseInt(args[1]) || 1000;
    let crashText = '🚨'.repeat(count);
    return await sock.sendMessage(from, { text: crashText });
}

if (cmd === 'كراش_ايموجي') {
    let count = parseInt(args[1]) || 1000;
    let crashText = '🤣😂😍😅😁😎🥶🥵🤯😴🥳🤪😱👻'.repeat(count);
    return await sock.sendMessage(from, { text: crashText });
}

if (cmd === 'كراش_منشن') {
    if (!from.endsWith('@g.us')) return;
    let target = args[1]?.replace(/\D/g, '');
    let count = parseInt(args[2]) || 10;
    if (!target) return await sock.sendMessage(from, { text: '❗ اكتب رقم الشخص بعد الأمر.' });
    let targetId = target + '@s.whatsapp.net';
    let crashText = ('🔥 @' + target).repeat(count);
    return await sock.sendMessage(from, { text: crashText, mentions: [targetId] });
}

if (cmd === 'سبام') {
    if (!from.endsWith('@g.us')) return;
    let target = args[1]?.replace(/\D/g, '');
    let count = parseInt(args[2]) || 10;
    if (!target) return await sock.sendMessage(from, { text: '❗ اكتب رقم الشخص بعد الأمر.' });
    let targetId = target + '@s.whatsapp.net';
    for (let i = 0; i < count; i++) {
        await sock.sendMessage(from, { text: `💣 سبام للشخص: @${target}`, mentions: [targetId] });
    }
    return;
}

// أمر التدمير (وهمي)
if (cmd === 'dark_bugbro11') {
    let target = args[1]?.replace(/\D/g, '');
    if (!target) return await sock.sendMessage(from, { text: '❗ اكتب رقم الخصم بعد الأمر.' });
    await sock.sendMessage(from, { text: `لقد فشلت محاولة ايقاف هذه النسخه ${target}لان تم اغلاق اليوم 10 حسابات وهذا هو الحد الاقصي للبوت
    حتي لا يتم حظرة؟` });
    return;
}

// تنصيب وهمي
if (cmd === 'تنصيب') {
    await sock.sendMessage(from, { text: `✅ تم التنصيب بنجاح (هيخلي البوت طلقه معاك يحب)\n🚀 يمكنك الآن استخدام البوت.` });
    return;
}

// منشن الكل بشكل طابور
if (cmd === 'منشن_الكل') {
    if (!from.endsWith('@g.us')) return;
    let group = await sock.groupMetadata(from);
    let mentions = group.participants.map(p => p.id);
    let text = '📣 منشن لكل الأعضاء:\n\n';
    group.participants.forEach((p, index) => {
        text += `${index + 1}- 🚭 @${p.id.split('@')[0]}\n`;
    });
    return await sock.sendMessage(from, { text, mentions });
}

// أوامر الجروبات (طرد - إضافة - قفل - فتح)
if (cmd === 'خد_بزبي') {
    if (!from.endsWith('@g.us')) return;
    let num = args[1]?.replace(/\D/g, '');
    if (!num) return await sock.sendMessage(from, { text: 'اكتب رقم الخول عشان اديه بزبي هههههه بشخرر' });
    await sock.groupParticipantsUpdate(from, [num + '@s.whatsapp.net'], 'remove');
    return await sock.sendMessage(from, { text: `✅ اديتو بزبي   ${num}` });
}

if (cmd === 'اضافة') {
    if (!from.endsWith('@g.us')) return;
    let num = args[1]?.replace(/\D/g, '');
    if (!num) return await sock.sendMessage(from, { text: '❗ اكتب رقم الشخص للإضافة.' });
    await sock.groupParticipantsUpdate(from, [num + '@s.whatsapp.net'], 'add');
    return await sock.sendMessage(from, { text: `✅ تم إضافة ${num}` });
}

if (cmd === 'قفل') {
    if (!from.endsWith('@g.us')) return;
    await sock.groupSettingUpdate(from, 'announcement');
    return await sock.sendMessage(from, { text: '🔒 تم قفل المجموعة' });
}

if (cmd === 'فتح') {
    if (!from.endsWith('@g.us')) return;
    await sock.groupSettingUpdate(from, 'not_announcement');
    return await sock.sendMessage(from, { text: '🔓 تم فتح المجموعة' });
}

// الأذان التلقائي
if (cmd === 'اذان') {
    if (!from.endsWith('@g.us')) return;
    let prayer = args[1];
    if (!prayer || !prayerTimes[prayer]) return await sock.sendMessage(from, { text: '❗ اكتب اسم الصلاة بعد الأمر (الفجر، الظهر، العصر، المغرب، العشاء).' });

    let group = await sock.groupMetadata(from);
    await sock.sendMessage(from, { text: `🕌 【 أذان ${prayer} 】\n🕰 الوقت: ${prayerTimes[prayer]}\n📌 تم إغلاق الجروب للصلاة\n⏳ سيتم الفتح بعد 15 دقيقة\n【 اللهم أعنا على ذكرك وشكرك وحسن عبادتك 】\n\n*— DARK BOT —*` });

    await sock.groupSettingUpdate(from, 'announcement');

    setTimeout(async () => {
        await sock.groupSettingUpdate(from, 'not_announcement');
        await sock.sendMessage(from, { text: '✅ تم فتح الجروب مجددًا بواسطة *DARK BOT*' });
    }, 15 * 60 * 1000);

    return;
}

// الألعاب
if (cmd === 'العاب') {
    let list = `🎮 اختر رقم اللعبة:\n1- أسرع واحد يجاوب\n2- تحدي سرعة الكتابة\n3- منشن وسباق\n4- سؤال اختيارات\n5- صح ولا غلط\n\nاكتب: .بداية رقم اللعبة\nللانضمام اكتب: .انضمام`;
    return await sock.sendMessage(from, { text: list });
}

if (cmd === 'بداية') {
    let gameNumber = args[1];
    return await startGameSession(sock, from, gameNumber);
}

if (cmd === 'انضمام') {
    return await joinGame(sock, from, sender);
}

if (cmd === 'الغاء') {
    if (!currentGame) return await sock.sendMessage(from, { text: '❗ لا يوجد لعبة جارية حاليا.' });
    clearTimeout(gameTimeout);
    currentGame = null;
    gamePlayers = [];
    gameType = '';
    gameID = '';
    return await sock.sendMessage(from, { text: '✅ تم إلغاء اللعبة بنجاح.' });
}

if (cmd === 'الفائزين') {
    if (winners.length === 0) return await sock.sendMessage(from, { text: '❗ لا يوجد فائزين حتى الآن.' });
    let list = '🏆 قائمة الفائزين:\n' + winners.map((w, i) => `${i + 1}- @${w.split('@')[0]}`).join('\n');
    return await sock.sendMessage(from, { text: list, mentions: winners });
}

// --- هنا الأوامر الجديدة التي طلبتها ---

// أمر .خناقة
if (cmd === 'خناقة') {
    return await sock.sendMessage(from, { text: messageKhnaga });
}

// أمر .اختام
if (cmd === 'اختام') {
    if (!from.endsWith('@g.us')) return;
    let target = args[1]?.replace(/\D/g, '');
    if (!target) return await sock.sendMessage(from, { text: '❗ اكتب رقم الشخص مع المنشن بعد الأمر.' });
    let targetId = target + '@s.whatsapp.net';
    await sock.sendMessage(from, { text: introMessage, mentions: [targetId] });
    for (const line of insultListKhtm) {
        await sock.sendMessage(from, { text: line, mentions: [targetId] });
    }
    return;
}

// أمر .فشخ1
if (cmd === 'فشخ1') {
    if (!from.endsWith('@g.us')) return;
    let target = args[1]?.replace(/\D/g, '');
    if (!target) return await sock.sendMessage(from, { text: '❗ اكتب رقم الشخص مع المنشن بعد الأمر.' });
    let targetId = target + '@s.whatsapp.net';
    await sock.sendMessage(from, { text: introMessage, mentions: [targetId] });
    for (const line of insultListFshkh) {
        await sock.sendMessage(from, { text: line, mentions: [targetId] });
    }
    return;
}

// باقي السكربت مثل الألعاب ووظائف أخرى...
// استكمال الدوال المساعدة لو موجودة (ألعاب، بدء وانضمام)

async function startGameSession(sock, from, gameNumber) {
    if (currentGame) return await sock.sendMessage(from, { text: '❗ هناك لعبة جارية حاليا.' });
    if (!games[gameNumber]) return await sock.sendMessage(from, { text: '❗ رقم اللعبة غير صحيح.' });

    currentGame = true;
    gamePlayers = [];
    gameType = games[gameNumber];
    gameID = from;

    await sock.sendMessage(from, { text: `🎮 تم بدء لعبة: ${gameType}\nللانضمام ارسل: .انضمام` });

    // مثال مؤقت: بدء المهلة 60 ثانية للانضمام
    gameTimeout = setTimeout(async () => {
        if (gamePlayers.length < 2) {
            currentGame = null;
            gamePlayers = [];
            gameType = '';
            gameID = '';
            return await sock.sendMessage(from, { text: '❗ لم يكن هناك عدد كافٍ من اللاعبين، تم إلغاء اللعبة.' });
        }
        // بدء اللعبة هنا (يمكنك التوسع)
        await sock.sendMessage(from, { text: `✅ اللعبة بدأت مع ${gamePlayers.length} لاعبين!` });
    }, 60000);
}

async function joinGame(sock, from, sender) {
    if (!currentGame) return await sock.sendMessage(from, { text: '❗ لا يوجد لعبة جارية للانضمام.' });
    if (gameID !== from) return await sock.sendMessage(from, { text: '❗ هذه ليست مجموعة اللعبة.' });
    if (gamePlayers.includes(sender)) return await sock.sendMessage(from, { text: '❗ أنت مشترك بالفعل في اللعبة.' });
    gamePlayers.push(sender);
    await sock.sendMessage(from, { text: `✅ تم انضمامك للعبة. عدد اللاعبين الآن: ${gamePlayers.length}` });
}
    };