import axios from 'axios';

export const handleTiktokCommand = async (sock, m, args, from, sender, cmd, body) => {
    if (!body.startsWith('تيك')) return;

    let query = args.slice(1).join(' ');
    if (!query) {
        return await sock.sendMessage(from, { text: '❗ اكتب كلمة البحث بعد الأمر، مثل: .تيك بيلي ايليش' });
    }

    try {
        const { data } = await axios.get(`https://www.tikwm.com/api/feed/search?keyword=${encodeURIComponent(query)}&count=4`);

        if (!data || !data.data || !data.data.length) {
            return await sock.sendMessage(from, { text: '❌ لم يتم العثور على نتائج.' });
        }

        for (const item of data.data) {
            const video = {
                video: { url: item.play },
                caption: `🎥 ${item.title || 'بدون عنوان'}\n👤 @${item.author.unique_id}\n❤️ ${item.digg_count} | 💬 ${item.comment_count}`,
                mimetype: 'video/mp4'
            };

            await sock.sendMessage(from, video, { quoted: m });
        }
    } catch (err) {
        console.error('خطأ في البحث في TikTok:', err);
        return await sock.sendMessage(from, { text: '⚠️ حدث خطأ أثناء جلب النتائج. حاول لاحقاً.' });
    }
};
