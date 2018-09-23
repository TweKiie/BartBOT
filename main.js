const config = require('./config.json');
const Discord = require('discord.js');

const bot = new Discord.Client({disableEveryone: true});

bot.on('ready', async () => {
    console.log(`${bot.user.username} est en ligne !`);
    
    bot.user.setActivity(`🚀 | En Dev ...`);
});

bot.on('message', async message =>{
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    // INFO BOT
    if (command == `${prefix}bot`) {
       
       let botIcon = bot.user.displayAvatarURL;
       let infoBOTembed = new Discord.RichEmbed()

       .setDescription('__**Information sur le bot.**__')
    .setColor(0xFFFF00)       
       .setThumbnail(botIcon)
       .addField("Nom du bot :", bot.user.username)
       .addField("Création du bot :", bot.user.createdAt)
       .addField("Créateur du bot", "TweKiie")
       .addField("ID du bot :", bot.user.id)
       .addField("Prefix actuel :", `your prefix : "${prefix}"`)
       .addField("Commande d'aide :", `${prefix}help`)
       .addField("Support :", "`Bientot`")

        return message.channel.send(infoBOTembed);
    }

    // SERVEUR INFO

    if (command == `${prefix}servinfo`) {
       
        let servIcon = message.guild.iconURL;
        let servinfoembed = new Discord.RichEmbed()
 
        .setDescription('__**Information sur le Serveur.**__')
     .setColor(0xFFFF00)       
        .setThumbnail(servIcon)
        .addField("Nom du Serveur :", message.guild.name)
        .addField("Nombre de membre total :", message.guild.memberCount)
        .addField("Créateur du Serveur", message.guild.owner)
        .addField("Régon du serveur :", message.guild.region)
        .addField("Date de Céation du serveur :", message.guild.createdAt) 
        .addField("Vous avez rejoind le :", message.member.joinedAt)

         return message.channel.send(servinfoembed);
    }

    // Reports
    if (command == `${prefix}report`) {

        let errorReport = new Discord.RichEmbed()
            .setDescription("**Erreur !**")
            .setColor(0xFF0000)
            .addField(":no_entry_sign: | Aucun Utilisateur n'a été mentionné !", `Usage : ${prefix}report **@utilisateur** <raison> `);

         
        let reportedUser = message.guild.member(
            message.mentions.users.first() || message.guild.members.get(args[0])
        );
        if (!reportedUser) {
            return message.channel.send(errorReport);
        }
        let reportReason = args.join(' ').slice(22);
        let botIcon = bot.user.displayAvatarURL;

        let reportEmbed = new Discord.RichEmbed()
        

            .setDescription("**Report**")
            .setThumbnail(botIcon)
            .setColor(0xFE0101)
            .addField("Utilisateur reporté", `${reportedUser} | ID: ${reportedUser.id}`)
            .addField("Auteur du report", `${message.author} | ID: ${message.author.id}`)
            .addField("Channel :", `Channel : ${message.channel}`)
            .addField("Raison :", `Raison : ${reportReason}`)

            let reportChannel = message.guild.channels.find('name', "reports");
            if (!reportChannel) {
                return message.channel.send("Channel `reports` introuvable ! Merci de le crée."
                );
            }

            message.delete();
            reportChannel.send(reportEmbed);
        
    }

});

bot.login(config.token);