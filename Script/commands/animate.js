module.exports = {
  config: {
    name: "animate",
    aliases: [],
    version: "1.0",
    author: "MZ",
    shortDescription: {
      en: "Generate animated video from image",
      bn: "ছবি থেকে অ্যানিমেটেড ভিডিও তৈরি করুন"
    },
    longDescription: {
      en: "Use this command to animate a photo with a custom prompt",
      bn: "এই কমান্ডটি ব্যবহার করে একটি ছবি অ্যানিমেট করুন কাস্টম প্রম্পট সহ"
    },
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
      return message.reply({
        body: "📸 Please attach a photo to animate.\n\n📸 অনুগ্রহ করে একটি ছবি সংযুক্ত করুন অ্যানিমেট করার জন্য।"
      });
    }

    const imageUrl = attachments[0].url;
    message.reply("⏳ Generating animated video...\n\n⏳ অ্যানিমেটেড ভিডিও তৈরি করা হচ্ছে...");

    try {
      // Replace with your actual animation API
      const animatedVideoUrl = await generateAnimation(imageUrl, prompt);

      if (!animatedVideoUrl) throw new Error("No video returned");

      return message.reply({
        body: `🎬 Animation complete!\n📝 Prompt: ${prompt}`,
        attachment: await global.utils.getStreamFromURL(animatedVideoUrl)
      });
    } catch (err) {
      console.error("Animation error:", err);
      return message.reply({
        body: "❌ Failed to generate animation.\n\n❌ অ্যানিমেশন তৈরি করতে ব্যর্থ। আবার চেষ্টা করুন।"
      });
    }
  }
};

// Dummy animation function (replace with real API call)
async function generateAnimation(imageUrl, prompt) {
  // Simulate API call delay
  await new Promise(res => setTimeout(res, 2000));
  // Return a sample video URL (replace with actual logic)
  return "https://example.com/sample-animation.mp4";
}
