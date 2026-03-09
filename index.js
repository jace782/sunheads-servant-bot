const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

const prefix = process.env.PREFIX || "sun!";
PREFIX = sun!

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // BAN
    if (command === "ban") {
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention someone to ban.");
        await member.ban().catch(() => message.reply("I couldn't ban that user."));
        message.reply(`${member.user.tag} has been banned.`);
    }

    // KICK
    if (command === "kick") {
        const member = message.mentions.members.first();
        if (!member) return message.reply("Please mention someone to kick.");
        await member.kick().catch(() => message.reply("I couldn't kick that user."));
        message.reply(`${member.user.tag} has been kicked.`);
    }

    // CLEAR
    if (command === "clear") {
        const amount = parseInt(args[0]);
        if (!amount || amount < 1 || amount > 100)
            return message.reply("Enter a number between 1 and 100.");
        await message.channel.bulkDelete(amount, true);
        message.reply(`Cleared ${amount} messages.`);
    }
});


client.login(process.env.TOKEN);

 client.on("messageCreate", async (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Commands go here 
    
});
 if (command === "lock") {
    if (!message.member.permissions.has("ManageChannels"))
        return message.reply("You need **Manage Channels** to lock this.");

    await message.channel.permissionOverwrites.edit(message.guild.id, {
        SendMessages: false
    });

    message.reply("🔒 Channel locked.");
}
  if (command === "slowmode") {
    const amount = parseInt(args[0]);
    if (isNaN(amount)) return message.reply("Give me a number in seconds.");

    await message.channel.setRateLimitPerUser(amount);
    message.reply(`🐌 Slowmode set to **${amount} seconds**.`);
}

