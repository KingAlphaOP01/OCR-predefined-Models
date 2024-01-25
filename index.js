const { Client, GatewayIntentBits } = require('discord.js');
const Tesseract = require('tesseract.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const userIdToWatch = '696161886734909481';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
  try {
    // Check if the message is from the specified user
    if (message.author.id === userIdToWatch) {
      console.log('Message received:', message.content);

      // Iterate through all embeds in the message
      for (const embed of message.embeds) {
        // Check if the embed has an image property
        if (embed.image) {
          const imageUrl = embed.image.url;

          console.log('Image URL:', imageUrl);

          // Perform image-to-text conversion
          Tesseract.recognize(
            imageUrl,
            'eng',
            { logger: (info) => console.log(info) }
          ).then(({ data: { text } }) => {
            console.log('Text from the image:', text);
            message.channel.send(`${text}:`);
          }).catch((error) => {
            console.error('Error during image-to-text conversion:', error);
            message.channel.send('Error during image-to-text conversion. Please try again.');
          });
        }
      }
    }
  } catch (error) {
    console.error('Error in messageCreate event:', error);
  }
});

client.login('MTExNTMwNDE3NDk5ODAxNjE3MQ.GUyCLt.9YzlRwwzqDAdgzzquCX48SY_UcGdGxFxakKb6E')