module.exports = {
  config: {
    name: "mate",
    version: "1.0",
    author: "MZ",
    countDown: 5,
    role: 0,
    shortDescription: "🎬 Animate image with prompt",
    longDescription: "Generate animated video from attached image using a custom prompt",
    category: "media",
    guide: {
      en: "{pn} [prompt]",
      bn: "{pn} [প্রম্পট]"
    }
  },

  onStart: async function ({ message, event, args, api }) {
    const prompt = args.join(" ") || "default animation";
    const attachments = event.attachments;

    if (!attachments || attachments.length === 0) {
      return message.reply(
        "📸 Please attach a photo to animate.\n\n📸 অনুগ্রহ করে একটি ছবি সংযুক্ত করুন অ্যানিমেট করার জন্য।"
      );
    }

    const imageUrl = attachments[0].url;
    message.reply("⏳ Generating animated video...\n\n⏳ অ্যানিমেটেড ভিডিও তৈরি করা হচ্ছে...");

    try {
      const animatedVideoUrl = await generateAnimation(imageUrl, prompt);

      if (!animatedVideoUrl) throw new Error("No video returned");

      return message.reply({
        body: `🎬 Animation complete!\n📝 Prompt: ${prompt}`,
        attachment: await global.utils.getStreamFromURL(animatedVideoUrl)
      });
    } catch (err) {
      console.error("Animation error:", err);
      return message.reply(
        "❌ Failed to generate animation.\n\n❌ অ্যানিমেশন তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।"
      );
    }
  }
};

// Dummy animation function — replace with real API
async function generateAnimation(imageUrl, prompt) {
  await new Promise(res => setTimeout(res, 2000));
  return "https://example.com/sample-animation.mp4"; // Replace with actual video URL
}
