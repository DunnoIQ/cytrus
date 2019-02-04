const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);
    if (message.guild.members.get(message.author.id).highestRole.position >= message.guild.roles.find(r => r.name == args.slice(1).join(' ')).position) {
      if (message.member.hasPermission('MANAGE_ROLES')) {
        if (user) {
          const member = message.guild.member(user);
          if (member) {
            if (message.guild.roles.find(r => r.name == args.slice(1).join(' '))) {
              member.addRole(message.guild.roles.find(r => r.name == args.slice(1).join(' '))).then(() => {
                message.reply(`Successfully added Role to ${user.tag}`);

                const modLogChannel = settings.modLogChannel;
                if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
                  let embed = new Discord.RichEmbed()
                  .setTitle('Add Role')
                  .setColor('#eeeeee')
                  .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

                  message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
                }
              }).catch('There was an error!');
            } else message.reply('I can\'t find that Role!');
          } else message.reply('That user isn\'t in this guild!');
        } else message.reply('You didn\'t mention the user to add the Role to!');
      } else message.reply('You dont have the Manage Roles permission!');
    } else message.reply('The role you are trying to add is above your roles position!');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Administrator'
};

exports.help = {
  name: 'addrole',
  category: 'Moderation',
  description: 'Adds the specifyed role to your role list',
  usage: 'addrole <user> <role name/id>'
};