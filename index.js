const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const token = 'TOKEN';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const GigaChat = require('gigachat-node').GigaChat;
const client_giga = new GigaChat(
    clientSecretKey = 'SECRET KEY(base64)',
    isIgnoreTSL = true,
    isPersonal = true,
    autoRefreshToken = true,
);
client_giga.createToken();


client.once('ready', () => {
    console.log(`Ready! Logged as ${client.user.tag}`);

    const command = {
        name: "name",
        description: "desc",
        options: [
            {
                name: "subcommand name",
                description: "subcommand desc",
                type: ApplicationCommandOptionType.String
            }
        ],
    };

    client.application.commands.create(command)
        .then(console.log)
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  switch (interaction.commandName) {
        case 'NAME FORM COMMAND VARIABLE': {
            const {options} = interaction;
            if (options.getString('SUBCOMMAND NAME FROM COMMAND VARIABLE')) {
                await interaction.reply("Генерирую...")
                try {
                    const response = await client_giga.completion({
                        "model": "GigaChat:latest",
                        "messages": [
                          {
                            role: "user",
                            content: options.getString('prompt')
                          }  
                        ] 
                    });
                    
                    let completion = response.choices[0].message;
                    await interaction.editReply(completion);
                }
                catch (error) {
                    await interaction.editReply(`Возникла ошибка!\n${error}`);
                }
            }
            else {
                await interaction.reply('Введите что-нибудь!');
            }
        }
        break;
  }

});

client.login(token);
