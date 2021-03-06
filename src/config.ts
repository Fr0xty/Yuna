import { Player } from 'discord-player';
import Discord, { Collection, Intents, MessageEmbed } from 'discord.js';
import firebaseAdmin from 'firebase-admin';

/**
 * Yuna instance
 */
const Yuna = new Discord.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ],
});

/**
 * Yuna's properties
 */
Yuna.color = '#F7BD72';
Yuna.prefix = 'yuna ';
Yuna.okEmoji = '920600099556589569';

/**
 * to store all Yuna's commands
 */
Yuna.commands = new Collection();

/**
 * player from discord-player
 */
Yuna.player = new Player(Yuna);

Yuna.player.on('error', (queue, error) => {
    console.log(error);
});

Yuna.player.on('connectionError', (queue, error) => {
    console.log(error);
});

/**
 * connect to firebase
 */
const app = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS!)),
});
Yuna.database = app.firestore();
await Yuna.database.collection('guilds').doc('guildId').delete();

/**
 * embeds
 */
Yuna.notSetupYetEmbed = new MessageEmbed()
    .setColor(Yuna.color)
    .setTitle('Server is not setup yet!')
    .setDescription('Please do `yuna setup` first.');

export { Yuna };
