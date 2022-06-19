const { sendMessage } = require('./discord/api');

module.exports.notify = async (event) => {
  console.info('input-event', JSON.stringify(event));
  console.info('discord-channel', process.env.DISCORD_CHANNEL);

  try {
    const jobs = event.Records.map(async (record) => {
      const subject = record.Sns.Subject;
      const snsMessage = JSON.parse(record.Sns.Message);

      const discordMessage = {
        content: `${subject}`,
        embeds: [
          {
            title: `${snsMessage.AlarmName}`,
            description: '',
            color: 3066993,
            fields: [
              {
                name: 'NewStateValue',
                value: `${snsMessage.NewStateValue}`,
              },
              {
                name: 'NewStateReason',
                value: `${snsMessage.NewStateReason}`,
              },
              {
                name: 'Region',
                value: `${snsMessage.Region}`,
              },
            ],
          },
        ],
      };

      await sendMessage(process.env.DISCORD_CHANNEL, discordMessage);
      console.log('Message sent', discordMessage);
    });

    await Promise.all(jobs);
  } catch (error) {
    console.error('Error sending message', error);
    throw error;
  }
};
