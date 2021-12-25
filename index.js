const {
    MessageActionRow,
    MessageButton,
    MessageEmbed,
    MessageAttachment,
    Client
} = require('discord.js')
const Discord = require('discord.js'),
    client = new Discord.Client(),
    disbut = require('discord-buttons');
const cron = require('node-cron')
disbut(client);
// const WOKCommands = require('wokcommands')
// const Disbut = require('discord-buttons')
require('dotenv').config()
const config = {
    token: process.env.TOKEN,
    prefix: "!",
    adminID: "824640870157516840",
    embed_color: "#ffffff"
};
// const client = new Client({
//     partials: ['MESSAGE', 'REACTION'],
// })
const PeakOnlineTime = ['время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено', 'время не определено'];

function timeNow() {
    return new Date().toLocaleString().split(', ')[1].split(':')[0] + 3 + ':' + new Date().toLocaleString().split(',')[1].split(':')[1]
}

function dateNow() {
    return new Date().toJSON().slice(0, 10).split('-').reverse().join('')
}
cron.schedule('*/1  * * * *', async function() {
    const fs = require('fs');
    const axios = require('axios')
    const servList = ['Downtown', 'StrawBerry', 'VineWood', 'BlackBerry', 'InSquad', 'Sunrise', 'Rainbow', 'Richman', 'Eclipse', 'LaMesa', 'Burton', 'Rockford']
    const result = [await axios.get('https://cdn.rage.mp/master/')]
    let gta5rp = []
    for (let i = 0; i < servList.length; i++) {
        let serv = result[0].data[`${servList[i].toLowerCase()}.gta5rp.com:22005`]
        serv['name'] = servList[i]
        gta5rp.push(serv)
    }
    gta5rp.sort((a, b) => a.players > b.players ? -1 : 1);
    let arrO = []

    let data = require('./dataServers.json')
    gta5rp.filter((item, index) => {
        if (new Date().getHours() === 0 && new Date().getMinutes() === 1) {
            // PeakOnlineTime[index] = timeNow()
            // if (data[item.name].PeakOnlineDays.length === 10) {
            // console.log('1');
            // console.log(item);
            if (data[item.name].lastDateUpdate.split('.').join('') < dateNow()) {
                // data[item.name].PeakOnlineDays.splice(0, 1)
                data[item.name].PeakOnlineDays.push(item.peak)
                data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
                data[item.name].timePeakOnline = timeNow()
                data[item.name].onlineNow = item.players
            } else {
                data[item.name].PeakOnlineDays[data[item.name].PeakOnlineDays.length - 1] = item.peak
                data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
                data[item.name].timePeakOnline = timeNow()
                data[item.name].onlineNow = item.players
            }
            // } else if (data[item.name].PeakOnlineDays.length < 10) {
            // data[item.name].PeakOnlineDays.push(item.peak)
            // data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
            // data[item.name].timePeakOnline = timeNow()
            // data[item.name].onlineNow = item.players
            // }
            fs.writeFile("dataServers.json", JSON.stringify(data), function(err) {
                if (err) throw err;
            });


            arrO.push({
                name: item.name + ': ' + data[item.name].onlineNow + '/1700. Пик онлайна: ' + data[item.name].PeakOnlineDays[data[item.name].PeakOnlineDays.length - 1] + ', в ' + data[item.name].timePeakOnline + '.',
                value: '\u200B'
            })
        } else {
            // console.log(item);
            if (item.peak === item.players) {
                // PeakOnlineTime[index] = timeNow()
                // if (data[item.name].PeakOnlineDays.length === 10) {
                if (data[item.name].lastDateUpdate.split('.').join('') < dateNow()) {
                    // data[item.name].PeakOnlineDays.splice(data[item.name].PeakOnlineDays.length, 1)
                    data[item.name].PeakOnlineDays.push(item.peak)
                    data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
                    data[item.name].timePeakOnline = timeNow()
                    data[item.name].onlineNow = item.players
                } else {
                    data[item.name].PeakOnlineDays[data[item.name].PeakOnlineDays.length - 1] = item.peak
                    data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
                    data[item.name].timePeakOnline = timeNow()
                    data[item.name].onlineNow = item.players
                }
                // } else if (data[item.name].PeakOnlineDays.length < 10) {
                //     data[item.name].PeakOnlineDays.push(item.peak)
                //     data[item.name].lastDateUpdate = new Date().toJSON().slice(0, 10).split('-').reverse().join('.')
                //     data[item.name].timePeakOnline = timeNow()
                //     data[item.name].onlineNow = item.players
                // }
                fs.writeFile("dataServers.json", JSON.stringify(data), function(err) {
                    if (err) throw err;
                });

            }

            arrO.push({
                name: item.name + ': ' + data[item.name].onlineNow + '/1700. Пик онлайна: ' + data[item.name].PeakOnlineDays[data[item.name].PeakOnlineDays.length - 1] + ', в ' + data[item.name].timePeakOnline + '.',
                value: '\u200B'
            })
        }
    })


    let embed = new Discord.MessageEmbed()
        .setColor('#ff6200')
        // .addFields({ name: 'Текущий онлайн на серверах', value: '' }, { name: '\u200B', value: '\u200B' }, )
        .setTitle('Beta - Текущий онлайн на серверах:')
        // .addField('Текущий онлайн на серверах:')
        // .setURL('https://discord1.js.org/')
        .setAuthor('GTA5RP', 'https://wiki.gta5rp.com/skins/GTA5RP/resources/images/icons/orange-star.png', 'https://gta5rp.com/')
        .setDescription('\u200B')
        .setThumbnail('https://gta5rp.com/images/logo.png')
        .addFields(arrO)
        // .addField('Inline field title', 'Some value here', true)
        // .setImage('https://i.imgur.com/AfFp7pu.png')
        .setTimestamp()
        .setFooter('Подписываемся на мендозу', 'https://static-cdn.jtvnw.net/jtv_user_pictures/00e1e6ac-81a0-4326-8905-e7483e783a48-profile_image-70x70.png');
    // message.channel.send(embed)
    client.channels.cache.get("910430953988558848").messages.fetch("910431576012247040").then(m => {
        m.edit(embed)
    });
})

client.on('ready', () => {
    const umnie = 'Бот готов!'
    console.log(umnie)
        // const dbOptions = {
        //     keepAlive: true,
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        //     useFindAndModify: false,
        // }
        // new WOKCommands(client, {
        //         commandsDir: 'commands',
        //         featureDir: 'features',
        //         dbOptions
        //     })
        //     .setDefaultPrefix('.')
})

client.on('message', async(message) => {
    const servList = ['Downtown', 'StrawBerry', 'VineWood', 'BlackBerry', 'InSquad', 'Sunrise', 'Rainbow', 'Richman', 'Eclipse', 'LaMesa', 'Burton', 'Rockford']
    const blackList = ['857992092398911538', '864800135363952640']
    if ((message.content.charAt(0) === '!')) {
        if (servList.includes((message.content).replace('!', '')) && (!blackList.includes(message.author.id))) {
            var dates = [];
            var date = new Date();
            let month = '';
            var data = require('./dataServers.json')
            if (date.getMonth() == 0) {
                month = ' Января'
            } else if (date.getMonth() == 1) {
                month = ' Февраля'
            } else if (date.getMonth() == 2) {
                month = ' Марта'
            } else if (date.getMonth() == 3) {
                month = ' Апреля'
            } else if (date.getMonth() == 4) {
                month = ' Мая'
            } else if (date.getMonth() == 5) {
                month = ' Июня'
            } else if (date.getMonth() == 6) {
                month = ' Июля'
            } else if (date.getMonth() == 7) {
                month = ' Августа'
            } else if (date.getMonth() == 8) {
                month = ' Сентября'
            } else if (date.getMonth() == 9) {
                month = ' Октября'
            } else if (date.getMonth() == 10) {
                month = ' Ноября'
            } else if (date.getMonth() == 11) {
                month = ' Декабря'
            }

            for (var i = 0; i < data[(message.content).replace('!', '')].PeakOnlineDays.length; i++) {
                var date1 = new Date();
                date1.setDate(date1.getDate() - i);
                var str = pad(date1.getDate()) + " " + month;
                dates.push(str);
            }

            function pad(n) {
                return (n < data[(message.content).replace('!', '')].PeakOnlineDays.length) ? ("0" + n) : n;
            }

            const chart = {
                type: 'line',
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: (message.content).replace('!', '') + `: пиковый онлайн за последние ${data[(message.content).replace('!', '')].PeakOnlineDays.length}д.`,
                        data: data[(message.content).replace('!', '')].PeakOnlineDays.slice((data[(message.content).replace('!', '')].PeakOnlineDays.length - data[(message.content).replace('!', '')].PeakOnlineDays.length)),
                        backgroundColor: data[(message.content).replace('!', '')].colorServerRGBA,
                        fill: false,
                        borderColor: data[(message.content).replace('!', '')].colorServerRGBA
                    }],

                },
            }
            const encodedChart = encodeURIComponent(JSON.stringify(chart));
            const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
            // const chartEmbed = {
            //     title: 'Статистика онлайна ' + (message.content).replace('!', ''),
            //     image: {
            //         url: chartUrl,
            //     },
            // };
            let arrLastWeakPeakOnline = Object.assign([], data[(message.content).replace('!', '')].PeakOnlineDays)
            arrLastWeakPeakOnline = arrLastWeakPeakOnline.reverse()
            let arrAvgDeys = []
            for (let i = 0; i < 8; i++) {
                arrAvgDeys.push(arrLastWeakPeakOnline[i])
            }

            let avgOnline = ((arrAvgDeys.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0)) / arrAvgDeys.length)


            let embed = new Discord.MessageEmbed()
                .setColor(data[(message.content).replace('!', '')].colorServerHEX)
                // .addFields({ name: 'Текущий онлайн на серверах', value: '' }, { name: '\u200B', value: '\u200B' }, )
                .setTitle('Статистика ' + (message.content).replace('!', ''))
                // .setURL('https://discord1.js.org/')
                // .setAuthor('GTA5RP', 'https://wiki.gta5rp.com/skins/GTA5RP/resources/images/icons/orange-star.png', 'https://gta5rp.com/')
                .setDescription('\u200B')
                .setThumbnail('https://gta5rp.com/images/logo.png')
                .addField('Текущий онлайн на сервере: ' + data[(message.content).replace('!', '')].onlineNow, '\u200B')
                .addField('Пик онлайн за сегодня: ' + data[(message.content).replace('!', '')].PeakOnlineDays[data[(message.content).replace('!', '')].PeakOnlineDays.length - 1], '\u200B')
                .addField('Средний онлайн за последние 7д: ' + Math.round(avgOnline), '\u200B')
                // .addFields(arrO)
                // .addField('Inline field title', 'Some value here', true)
                .setImage(chartUrl)
                .setTimestamp()
                .setFooter('Подписываемся на мендозу', 'https://static-cdn.jtvnw.net/jtv_user_pictures/00e1e6ac-81a0-4326-8905-e7483e783a48-profile_image-70x70.png');
            message.channel.send({
                embed: embed
            });
            // message.channel.send({
            //     embed: chartEmbed
            // });
        } else if (blackList.includes(message.author.id)) {
            message.channel.send(`<@${message.author.id}> откисай дорогой`);
        } else {
            message.channel.send(`<@${message.author.id}> не придумывай, нет такой команды ну или ты ошибся в написании. А вообще не мешай мне спать...`);
        }
    }

    if (message.content == "button") {
        const btn = [new disbut.MessageButton()
            .setStyle('blurple')
            .setID('1')
            .setEmoji('891016542593122304')
            .setLabel('Test')
            //.setURL('https://npmjs.com/discord-buttons') // Требуется .setStyle('url') и удаление .setID()
            .setDisabled(false), new disbut.MessageButton()
            .setStyle('blurple')
            .setID('2')
            .setEmoji('891016542593122304')
            .setLabel('Test')
            //.setURL('https://npmjs.com/discord-buttons') // Требуется .setStyle('url') и удаление .setID()
            .setDisabled(false), new disbut.MessageButton()
            .setStyle('blurple')
            .setID('3')
            .setEmoji('891016542593122304')
            .setLabel('Test')
            //.setURL('https://npmjs.com/discord-buttons') // Требуется .setStyle('url') и удаление .setID()
            .setDisabled(false), new disbut.MessageButton()
            .setStyle('blurple')
            .setID('4')
            .setEmoji('891016542593122304')
            .setLabel('Test')
            //.setURL('https://npmjs.com/discord-buttons') // Требуется .setStyle('url') и удаление .setID()
            .setDisabled(false)
        ]
        message.channel.send(`Demo blue Button`, {
            component: btn
        });
    }

    if (message.content == "row") {
        const btn1 = new disbut.MessageButton()
            .setStyle('blurple')
            .setID('click_to_function_in_row')
            .setEmoji("🍕")
            .setLabel('Button 1 in row')
            .setDisabled(false);

        const btn2 = new disbut.MessageButton()
            .setStyle('url')
            .setLabel('URL button in row')
            .setURL('https://npmjs.com/discord-buttons')
            .setDisabled(false);

        const row = new disbut.MessageActionRow()
            .addComponent(btn1)
            .addComponent(btn2);

        message.channel.send(`Demo Row of Buttons`, {
            component: row
        });
    }

    if (message.content == "rows") {
        const btn1 = new disbut.MessageButton()
            .setStyle('grey')
            .setID('click_to_function_in_row_1_2')
            .setLabel('Button 1 in row 1')
            .setDisabled(false);

        const btn2 = new disbut.MessageButton()
            .setStyle('url')
            .setLabel('URL button in row 1')
            .setURL('https://npmjs.com/discord-buttons')
            .setDisabled(false);

        const btn12 = new disbut.MessageButton()
            .setStyle('green')
            .setID('click_to_function_in_row_2_2')
            .setLabel('Button 1 in row 2')
            .setDisabled(false);

        const btn22 = new disbut.MessageButton()
            .setStyle('url')
            .setLabel('URL button in row 2')
            .setURL('https://npmjs.com/discord-buttons')
            .setDisabled(false);

        const row1 = new disbut.MessageActionRow()
            .addComponent(btn1)
            .addComponent(btn2);

        const row2 = new disbut.MessageActionRow()
            .addComponent(btn12)
            .addComponent(btn22);

        message.channel.send(`Demo Row of Buttons`, {
            components: [row1, row2]
        });

    }

    if (message.content == 'gta5rp1') {

        const axios = require('axios')
        const servList = ['Downtown', 'StrawBerry', 'VineWood', 'BlackBerry', 'InSquad', 'Sunrise', 'Rainbow', 'Richman', 'Eclipse', 'LaMesa', 'Burton', 'Rockford']
        const result = [await axios.get('https://cdn.rage.mp/master/')]
        let gta5rp = []
        for (let i = 0; i < servList.length; i++) {
            let serv = result[0].data[`${servList[i].toLowerCase()}.gta5rp.com:22005`]
            serv['name'] = servList[i]
            gta5rp.push(serv)
        }
        gta5rp.sort((a, b) => a.players > b.players ? -1 : 1);
        let arrO = []
        gta5rp.filter(item => {
            arrO.push({
                name: item.name + ': ' + item.players + '/1700',
                value: '\u200B'
            })
        })
        let embed = new Discord.MessageEmbed()
            .setColor('#ff6200')
            // .addFields({ name: 'Текущий онлайн на серверах', value: '' }, { name: '\u200B', value: '\u200B' }, )
            .setTitle('Текущий онлайн на серверах:')
            // .addField('Текущий онлайн на серверах:')
            // .setURL('https://discord1.js.org/')
            .setAuthor('GTA5RP', 'https://wiki.gta5rp.com/skins/GTA5RP/resources/images/icons/orange-star.png', 'https://gta5rp.com/')
            // .setDescription('Some description here')
            .setThumbnail('https://gta5rp.com/images/logo.png')
            .addFields(arrO)
            // .addField('Inline field title', 'Some value here', true)
            // .setImage('https://i.imgur.com/AfFp7pu.png')
            .setTimestamp()
            .setFooter('Подписываемся на мендозу', 'https://static-cdn.jtvnw.net/jtv_user_pictures/00e1e6ac-81a0-4326-8905-e7483e783a48-profile_image-70x70.png');
        // console.log(message.channel);
        message.channel.send(embed)
    }
});

client.on('clickButton', async(button) => {
    if (button.id == "click_to_function") {
        button.reply.send('On Red Button click');
    } else if (button.id == "click_to_function_in_row") {
        // console.log(11);
        button.think(true);
        client.setTimeout(() => {
            const embed = new Discord.MessageEmbed()
                .setTitle("On Row first Button click");
            button.channel.send(embed);
        }, 1000 * 10);
    } else if (button.id == "click_to_function_in_row_1_2") {
        // console.log(22);
        button.defer();
        button.message.channel.send('On Row 1 first Button click');
    } else if (button.id == "click_to_function_in_row_2_2") {
        button.reply.send('On Row 2 first Button click');
        // (33);
    }
});

client.on('messageReactionAdd', async(messageReaction, user) => {
    let message = messageReaction.message
    if (message.channel.id != '873867745316438027') return
        // console.log(messageReaction.emoji.id)
    if (messageReaction.emoji.id === '868819412453556304') {
        // console.log('1111')
        let member = message.guild.members.cache.get(user.id)
        member.roles.add('825397831233830962')
    }
})

client.on('messageReactionRemove', async(messageReaction, user) => {
    let message = messageReaction.message
    if (message.channel.id != '873867745316438027') return
        // console.log(messageReaction.emoji.id)
    if (messageReaction.emoji.id === '868819412453556304') {
        // console.log('1111')
        let member = message.guild.members.cache.get(user.id)
        member.roles.remove('825397831233830962')
    }
})

client.on('guildMemberAdd', user => {
    user.send('Приветсвую тебя на сервере!')
    user.roles.add('825397831233830962')
        // user.roles.add('824941936556376074')
        // let message = user.message
        // let member = message.guild.members.cache.get(user.id)
        // member.roles.add('825397831233830962')
        // console.log(user)
})


client.on('guildMemberAdd', async(member) => {
    const Canvas = require('canvas')
    if (!member.guild) return
    const canvas = Canvas.createCanvas(1772, 633)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage('./welcome.png')
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = '#f2f2f2'
    ctx.strokeRect(0, 0, canvas.width, canvas.height)
    var text1 = `${member.user.username}`
    var text2 = `${member.user.discriminator}`
    var text3 = `Участник №${member.guild.memberCount}`
        // var text4 = `${member.guild.name}`
    if (text1.length >= 14) {
        ctx.font = 'bold 100px Sans-Serif'
        ctx.fillStyle = '#f2f2f2'
        ctx.fillText(text1, 720, canvas.height / 2 + 20)
    } else {
        ctx.font = 'bold 150px Sans-Serif'
        ctx.fillStyle = '#f2f2f2'
        ctx.fillText(text1, 720, canvas.height / 2 + 20)
    }
    //Дискриминатор
    ctx.font = 'bold 40px Sans-Serif'
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText(text2, 730, canvas.height / 2 + 58)
        //Участники
    ctx.font = 'bold 60px Sans-Serif'
    ctx.fillStyle = '#f2f2f2'
    ctx.fillText(text3, 730, canvas.height / 2 + 150)
        //Гильдия
        // ctx.font = 'bold 60px Sans-Serif'
        // ctx.fillStyle = '#f2f2f2'
        // ctx.fillText(text4, 700, canvas.height / 2 - 150)

    ctx.beginPath()
    ctx.arc(315, canvas.height / 2, 250, 0, Math.PI * 2, true)
    ctx.closePath()
    ctx.clip()

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({
        format: 'jpg'
    }))
    ctx.drawImage(avatar, 65, canvas.height / 2 - 250, 500, 500)
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'welcome-image.png')
    const welcome = new Discord.MessageEmbed()
        .setColor('RED')
        .setTimestamp()
        .setImage('attachment://welcome-image.png')
        .attachFiles(attachment)
    const channel = member.guild.channels.cache.find(ch => ch.id === '873867745316438027')
    channel.send(welcome)
})



client.login(process.env.TOKEN)