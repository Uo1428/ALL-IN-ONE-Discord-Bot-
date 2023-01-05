const { CommandInteraction, Client } = require('discord.js');
const { ContextMenuCommandBuilder } = require('discord.js');
const Discord = require('discord.js');
const axios = require("axios");

const model = require('../../database/models/badge');

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Userinfo')
        .setType(2),

    /** 
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (client, interaction, args) => {
        const member = interaction.guild.members.cache.get(interaction.targetId);

        const badgeFlags = {
            DEVELOPER: client.emotes.badges.developer,
            BUGS: client.emotes.badges.bug,
            MANAGEMENT: client.emotes.badges.management,
            PREMIUM: client.emotes.badges.premium,
            SUPPORTER: client.emotes.badges.supporter,
            TEAM: client.emotes.badges.team,
            BOOSTER: client.emotes.badges.booster,
            PARTNER: client.emotes.badges.partner,
            VOTER: client.emotes.badges.voter,
            SUPPORT: client.emotes.badges.support,
            MODERATOR: client.emotes.badges.moderator,
            DESIGNER: client.emotes.badges.designer,
            MARKETING: client.emotes.badges.marketing
        }

 const flags = {
  DISCORD_EMPLOYEE: "<:discordEmployee:992385182273372210>",
  DISCORD_PARTNER: "<a:discord_Discord_Partner_disc:992385380865294386>",
  BUGHUNTER_LEVEL_1: "<:bughunter_level_1:992385588328144927> ",
  BUGHUNTER_LEVEL_2: "<:bughunter_level_2:992385753596305468>",
  HYPESQUAD_EVENTS: "<:hypesquad_events:992385931703222303>",
  HOUSE_BRAVERY: "<:house_bravery:992387170943909980>",
  HOUSE_BRILLIANCE: "<:house_brilliance:992387318012985374>",
  HOUSE_BALANCE: "<:HOUSE_BALANCE:992439438988812408> ",
  EARLY_SUPPORTER: "<:early_supporter:992387546246029422>",
  SYSTEM: "<a:verified_developer:992387826572333056>",
  VERIFIED_BOT: "Verified Bot <:verified_bot:992387663875297360>",
  VERIFIED_DEVELOPER: "<a:verified_developer:992387826572333056>",
  NITRO: "<:Nitro:1006219187825426444>",
  BOOSTER_1: "<a:ex_booster:1006210639158579371>",
  BOOSTER_2: "<a:ex_booster:1006210639158579371>",
  BOOSTER_3: "<a:ex_booster:1006210639158579371>",
  BOOSTER_4: "<a:ex_booster:1006210639158579371>",
  BOOSTER_5: "<a:ex_booster:1006210639158579371>",
  BOOSTER_6: "<a:ex_booster:1006210639158579371>",
  BOOSTER_7: "<a:ex_booster:1006210639158579371>",
  BOOSTER_8: "<a:ex_booster:1006210639158579371>",
  BOOSTER_9: "<a:ex_booster:1006210639158579371>",
};
        let Badges = await model.findOne({ User: member.user.id });
        if (!Badges) Badges = { User: member.user.id }
        const roles = member.roles.cache ? member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1).join(", ") : "None"
        const userFlags = member.user.flags ? member.user.flags.toArray() : [];

        // const userBanner = await axios.get(`https://discord.com/api/users/${member.id}`, {
        //     headers: {
        //         Authorization: `Bot ${client.token}`,
        //     },
        // })

        var nickName = member.nickname;

        // const { banner } = userBanner.data;
        let url = `https://api.daimon-bot.ga/imagegen/welcomecardv2?avatar=${member.displayAvatarURL({ dynamic: true })}&discriminator=${member.user.discriminator}&user=${member.user.username}`;

        // if (banner) {
        //     const extension = banner.startsWith("a_") ? ".gif" : ".png";
        //     url = `https://cdn.discordapp.com/banners/${member.id}/${banner}${extension}?size=1024`;
        // }

        return client.embed({
            title: `👤・User information`,
            desc: `Information about ${member.user.username}`,
            thumbnail: member.user.displayAvatarURL({ dynamic: true, size: 1024 }),
            image: url,
            fields: [
                {
                    name: "Username",
                    value: `${member.user.username}`,
                    inline: true,
                },
                {
                    name: "Discriminator",
                    value: `${member.user.discriminator}`,
                    inline: true,
                },
                {
                    name: "Nickname",
                    value: `${nickName || 'No nickname'}`,
                    inline: true,
                },
                {
                    name: "id",
                    value: `${member.user.id}`,
                    inline: true,
                },
                {
                    name: "Flags",
                    value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
                    inline: true,
                },
                {
                    name: "Badges",
                    value: `${Badges.FLAGS ? Badges.FLAGS.map(flag => badgeFlags[flag]).join(' ') : 'None'}`,
                    inline: true,
                },
                {
                    name: "Discord joined at",
                    value: `<t:${Math.round(member.user.createdTimestamp / 1000)}>`,
                    inline: true,
                },
                {
                    name: "Server joined at",
                    value: `<t:${Math.round(member.joinedAt / 1000)}>`,
                    inline: true,
                },
                {
                    name: `Roles`,
                    value: roles || `\u200b`,
                    inline: false,
                }
            ],
            type: 'editreply'
        }, interaction)
    },
};

 