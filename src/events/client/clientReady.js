const Discord = require('discord.js');
const chalk = require('chalk');
const { random } = require('mathjs');
const { ApplicationCommand } = require('discord.js');

module.exports = async (client) => {
    const startLogs = new Discord.WebhookClient({
        id: client.webhooks.startLogs.id,
        token: client.webhooks.startLogs.token,
    });

    console.log(`\u001b[0m`);
    console.log(chalk.blue(chalk.bold(`Bot`)), (chalk.white(`>>`)), chalk.green(`Started on`), chalk.red(`${client.guilds.cache.size}`), chalk.green(`servers!`))


    setInterval(async function () {
        let statuttext;
        if (process.env.DISCORD_STATUS) {
            statuttext = process.env.DISCORD_STATUS.split(', ');
        } else {
            statuttext = [
                `・❓┆/help`,
                `・💻┆${client.guilds.cache.size} servers`,
                `・📨┆discord.gg/uoaio`,
                `・🎉┆400+ commands`,
                `・🏷️┆Version ${require(`${process.cwd()}/package.json`).version}`
            ];
        }
        const randomText = statuttext[Math.floor(Math.random() * statuttext.length)];
        client.user.setPresence({ activities: [{ name: randomText, type: Discord.ActivityType.Playing }], status: 'online' });

    }, 50000)

    const appCommands = await client.application.commands.fetch();
    client.getSlashMentions = (query) => {
        /** @type {ApplicationCommand} */
        const cmd = appCommands.find((c) => c.name === query);
        let array = [];
        if (cmd?.options?.length > 0) {
            const sub = cmd.options.filter(y => y.type === 1);
            const group = cmd.options.filter(y => y.type === 2);
            if (sub.length > 0) {
                for (const y of sub) {
                    array.push(
                        [`</${cmd.name} ${y.name}:${cmd.id}>`, y.description.toString()]
                    )
                }
            }

            if (group.length > 0) {
                for (const y of group) {
                    const groupSub = y.options.filter(a => a.type === 1);
                    if (groupSub.length > 0) {
                        for (const x of groupSub) {
                            array.push(
                                [`</${cmd.name} ${y.name} ${x.name}:${cmd.id}>`, x.description]
                            )
                        }
                    }
                }
            }
        }
        if (array.length === 0) array.push([`</${cmd.name}:${cmd.id}>`, cmd.description])
        return array;
    }

    client.player.init(client.user.id);
}

