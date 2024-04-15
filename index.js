const { Client, GatewayIntentBits, ApplicationCommandOptionType } = require('discord.js');
const token = 'MTIyNTc5OTk1MTI1NTM0MzIwNw.GMciKU.Zk9vzn9ulgxeKDmOISTiLkn0Sk9Cgr02IDcays';
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const GigaChat = require('gigachat-node').GigaChat;
const client_giga = new GigaChat(
    clientSecretKey = 'NDA5YWJiNzAtM2U2Ni00MzkyLTllNGEtOGQ0YTA1MTMwNzM2OmIwYWY3MmMxLTc3NmMtNGJjMi1hMTI2LWY0NjJmYjBhMzEwNg==',
    isIgnoreTSL = true,
    isPersonal = true,
    autoRefreshToken = true,
);
client_giga.createToken();


client.once('ready', () => {
    console.log(`Ready! Logged as ${client.user.tag}`);

    const command = {
        name: "prompt",
        description: "Голова умная. Можешь поговорить с головой.",
        options: [
            {
                name: "prompt",
                description: "Задай голове вопрос",
                type: ApplicationCommandOptionType.String
            }
        ],

        name: "ping",
        description: "Пинг-понг"
    };

    client.application.commands.create(command)
        .then(console.log)
        .catch(console.error);
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  
  switch (interaction.commandName) {
        case 'ping': {
          await interaction.reply('Пошел нахуй! <:roflanEbalo:1071216974044078220>');
        }
        break;
        
        case 'dai_deneg_golova': {
            const words = [
                'Хуй блять! <:roflanDaunich:1071217183289507880>',
                'Нихуя тебе больше не надо? <:roflanDaunich:1071217183289507880>',
                'Пошел ты нахуй, пес <:roflanDaunich:1071217183289507880>',
            ];

            await interaction.reply(words[Math.floor(Math.random() * words.length)]);
        }
        break;

        case 'ruletka': {
            let player = Math.floor(Math.random() * 101);
            let bot = Math.floor(Math.random() * 101);
            let sentence = `Тебе выпало: ${player}  Мне выпало: ${bot}`;

            if (player < bot) {
                await interaction.reply('Проебал как лошара! <:roflanPominki:1071217071918153859>\n' + sentence);
            } else {
                await interaction.reply('На этот раз тебе повезло, людишка <:roflanEbalo:1071216974044078220>\n' + sentence);
            }
        }
        break;

        case 'prompt': {
            const {options} = interaction;
            if (options.getString('prompt')) {
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