module.exports = {
  config: {
    name: "zzo",
    version: "1.0",
    author: "MZ",
    countDown: 5,
    role: 0,
    shortDescription: "🌀 Zzo effect generator",
    longDescription: "Apply Zzo-style animation or effect to attached image with custom prompt",
    category: "media",
    guide: {
      en: "{pn} [prompt]",
      bn: "{pn} [প্রম্পট]"
    }
  },

  onStart: async function ({ message, event, args }) {
    const prompt = args.join(" ") || "default zzo effect";
    const attachments = event.attachments;

    if (!attachments || attachments.length === 0) {
      return message.reply(
        "📸 Please attach a photo to apply Zzo effect.\n\n📸 অনুগ্রহ করে একটি ছবি সংযুক্ত করুন Zzo ইফেক্ট প্রয়োগ করতে।"
      );
    }

    const imageUrl = attachments[0].url;
    message.reply("⏳ Applying Zzo effect...\n\n⏳ Zzo ইফেক্ট প্রয়োগ করা হচ্ছে...");

    try {
      const zzoVideoUrl = await generateZzoEffect(imageUrl, prompt);

      if (!zzoVideoUrl) throw new Error("No video returned");

      return message.reply({
        body: `🌀 Zzo effect complete!\n📝 Prompt: ${prompt}`,
        attachment: await global.utils.getStreamFromURL(zzoVideoUrl)
      });
    } catch (err) {
      console.error("Zzo error:", err);
      return message.reply(
        "❌ Failed to apply Zzo effect.\n\n❌ Zzo ইফেক্ট প্রয়োগ করতে ব্যর্থ। আবার চেষ্টা করুন।"
      );
    }
  }
};

// Dummy Zzo effect generator — replace with real API
async function generateZzoEffect(imageUrl, prompt) {
  await new Promise(res => setTimeout(res, 2000));
  return "https://example.com/zzo-sample.mp4"; // Replace with actual video URL
}
