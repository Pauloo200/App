require('./configuração');
const {
 default: makeWASocket,
useSingleFileAuthState,
DisconnectReason,
getContentType,
WAProto,
downloadContentFromMessage,
prepareWAMessageMedia,
MediaType,
generateWAMessageFromContent,
proto,
WA_DEFAULT_EPHEMERAL
 } = require('@adiwajshing/baileys')
const fetch = require('node-fetch')
const axios = require('axios')
 
const moment = require('moment-timezone')
 
const { usuario, Utils } = require('./backend/modelagem')

const { TelegraPh } = require("./func.backend/uploader");

const mimetype = require('mime-types')

 const util = require('util')

 const {
imageToWebp,
videoToWebp,
writeExifImg,
writeExifVid
 } = require('./func.backend/exif')
 
const { getBuffer, getRandom } = require("./func.backend/buff");
 
 const fs = require('fs')
 
const {
exec
 } = require('child_process')
 
const {
state,
saveState
 } = useSingleFileAuthState('./japa.json')
 
 const P = require('pino')
 const qrcode = require('qrcode-terminal')
 
 
const connectToWA = () => {
const japa = makeWASocket({
 logger: P({
level: 'silent'
 }),
browser: ['japa apis', 'TCL_TV', '1.0.0'],
 printQRInTerminal: false,
 auth: state,
})
 japa.ev.on('connection.update', (update) => {
 const {
connection, lastDisconnect
 } = update
 if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
 connectToWA()
}
 } else if (connection === 'open') {
 console.log('conectado')
 }
})

async function enviarnozap(from, msg) {
await japa.sendMessage(from + '@s.whatsapp.net', { text: msg }, { quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}
module.exports.enviarnozap = enviarnozap

async function enviarnozap_button(from, msg, msg2, botaos) {
await japa.sendMessage(from + '@s.whatsapp.net', { text: msg, footer: msg2, templateButtons: botaos}).then((res) => console.log(res)).catch((err) => console.log(err))
}
module.exports.enviarnozap_button = enviarnozap_button


async function enviarnozaptime(from, msg) {
setTimeout(async () => {
await japa.sendMessage(from + '@s.whatsapp.net', { text: msg }, { quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}, 10 * 1000)
}
module.exports.enviarnozaptime = enviarnozaptime

async function enviarnozap_buttontime(from, msg, msg2, botaos) {
setTimeout(async () => {
await japa.sendMessage(from + '@s.whatsapp.net', { text: msg, footer: msg2, templateButtons: botaos }).then((res) => console.log(res)).catch((err) => console.log(err))
}, 60 * 1000)
}
module.exports.enviarnozap_buttontime = enviarnozap_buttontime


async function enviarbutimg(from, msg, msg2, img, botaos) {
const buttonMessage = {
    text: msg,
    footer: msg2,
    templateButtons: botaos,
    image: {url: img}
}

await japa.sendMessage(from + '@s.whatsapp.net', buttonMessage)
}
module.exports.enviarbutimg = enviarbutimg		

async function enviarimg(from, img, msg) {
await japa.sendMessage(from, { video: { url: 'https://japa-team.herokuapp.com/file/BiwZg.mp4'}, thumbnail: { url: 'https://japa-team.herokuapp.com/file/rDXeI.jpg'}, jpegThumbnail: { url: 'https://japa-team.herokuapp.com/file/rDXeI.jpg'} }, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}
module.exports.enviarimg = enviarimg

async function enviarimg2(from, img, msg) {
await japa.sendMessage(from, { video: { url: 'https://japa-team.herokuapp.com/file/BiwZg.mp4'}, caption: null, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: 'https://youtu.be/0os1QdZ74FI', title: 'japa-APIS', body: 'TM OFC', thumbnail: fs.readFileSync('./public/img/japa.jpg'), sourceUrl: 'https://youtu.be/0os1QdZ74FI'  }}}, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}
module.exports.enviarimg2 = enviarimg2


japa.ev.on('messages.upsert',
 async m => {
try {
 const mek = m.messages[0]
// await japa.sendReadReceipt(mek.key.remoteJid, mek.key.participant, [mek.key.id])
 if (!mek.key.participant) mek.key.participant = mek.key.remoteJid
 mek.key.participant = mek.key.participant.replace(/:[0-9]+/gi, "")
 if (!mek.message) return
 const fromMe = mek.key.fromMe
 const content = JSON.stringify(mek.message)
 const from = mek.key.remoteJid
 const type = Object.keys(mek.message).find((key) => !["senderKeyDistributionMessage", "messageContextInfo"].includes(key))
 const body = (type === "conversation" &&
mek.message.conversation.startsWith(prefix)) ?
 mek.message.conversation: (type == "imageMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "videoMessage") &&
 mek.message[type].caption.startsWith(prefix) ?
 mek.message[type].caption: (type == "extendedTextMessage") &&
 mek.message[type].text.startsWith(prefix) ?
 mek.message[type].text: (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId:
 (type == "listResponseMessage") &&
 mek.message[type].singleSelectReply.selectedRowId ?
 mek.message.listResponseMessage.singleSelectReply.selectedRowId: (type == "templateButtonReplyMessage") ?
 mek.message.templateButtonReplyMessage.selectedId: (type === "messageContextInfo") ?
 mek.message[type].singleSelectReply.selectedRowId: (type == "japa.sendMessageButtonMessage") &&
 mek.message[type].selectedButtonId ?
 mek.message[type].selectedButtonId: (type == "stickerMessage") && ((mek.message[type].fileSha256.toString("base64")) !== null && (mek.message[type].fileSha256.toString("base64")) !== undefined) ? (mek.message[type].fileSha256.toString("base64")): ""
 const budy = (type === "conversation") ?
 mek.message.conversation: (type === "extendedTextMessage") ?
 mek.message.extendedTextMessage.text: ""
 const bady = mek.message.conversation ? mek.message.conversation: mek.message.imageMessage ? mek.message.imageMessage.caption: mek.message.videoMessage ? mek.message.videoMessage.caption: mek.message.extendedTextMessage ? mek.message.extendedTextMessage.text: (mek.message.listResponseMessage && mek.message.listResponseMessage.singleSelectReply.selectedRowId) ? mek.message.listResponseMessage.singleSelectReply.selectedRowId: ''
 const bidy = bady.toLowerCase()
 const selectedButton = (type == 'buttonsResponseMessage') ? mek.message.buttonsResponseMessage.selectedButtonId: ''
 const argsButton = selectedButton.trim().split(/ +/)
 const isCmd = body.startsWith(prefix)
 const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase(): ''
  const isMedia = (type === 'imageMessage' || type === 'videoMessage')
 const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
 const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
 const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
 const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')

 const args = body.trim().split(/ +/).slice(1)
 const q = args.join(' ')
 const isGroup = from.endsWith('@g.us')
 const sender = mek.key.fromMe ? (japa.user.id.split(':')[0]+'@s.whatsapp.net' || japa.user.id): (mek.key.participant || mek.key.remoteJid)
 const senderNumber = sender.split('@')[0]
 const botNumber = japa.user.id.split(':')[0]
 const pushname = mek.pushName || 'sem nome'
 const groupMetadata = isGroup ? await japa.groupMetadata(from).catch(e => {}): ''
 const groupName = isGroup ? groupMetadata.subject: ''
 const participants = isGroup ? await groupMetadata.participants: ''
 const groupAdmins = isGroup ? await participants.filter(v => v.admin !== null).map(v => v.id): ''
 const groupOwner = isGroup ? groupMetadata.owner: ''
 const isBotAdmins = isGroup ? groupAdmins.includes(botNumber): false
 const isAdmins = isGroup ? groupAdmins.includes(sender): false
 const groupMembers = isGroup ? groupMetadata.participants: ''
 const isOwner = coderNumero.includes(senderNumber)

function setar_dia_noite() {
  const time = moment.tz('America/Sao_Paulo').format('HH')
  let res = "👋 *BEMVINDO(A) | WELCOME* 👋"
  if (time >= 4) {
    res = "🌇 *Bom Dia | Good Morning* ⛅"
  }
  if (time >= 11) {
    res = "🏙️ *Boa Tarde | Good Afternoon* 🌤️"
  }
  if (time >= 15) {
    res = "🌆 *Boa Tarde | Good Afternoon* 🌥️"
  }
  if (time >= 17) {
    res = "🌃 *Boa Noite | Good Evening* 💫"
  }
  return res
}

async function fetchJson(url, options) {
	try {
		options ? options: {}
		const res = await axios({
			method: 'GET',
			url: url,
			headers: {
				'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
			},
			...options
		})
		return res.data
	} catch (err) {
		return err
	}
}

function abreviar(num) {
     if (num >= 1000000000000000000000000000000000) {
        return (num / 1000000000000000000000000000000000).toFixed(1).replace(/\.0$/, '') + ' d';
     }
     if (num >= 1000000000000000000000000000000) {
        return (num / 1000000000000000000000000000000).toFixed(1).replace(/\.0$/, '') + ' n';
     }
     if (num >= 1000000000000000000000000000) {
        return (num / 1000000000000000000000000000).toFixed(1).replace(/\.0$/, '') + ' o';
     }     
     if (num >= 1000000000000000000000000) {
        return (num / 1000000000000000000000000).toFixed(1).replace(/\.0$/, '') + ' sep';
     }     
     
     if (num >= 1000000000000000000000) {
        return (num / 1000000000000000000000).toFixed(1).replace(/\.0$/, '') + ' sex';
     }
     if (num >= 1000000000000000000) {
        return (num / 1000000000000000000).toFixed(1).replace(/\.0$/, '') + ' qui';
     }
     if (num >= 1000000000000000) {
        return (num / 1000000000000000).toFixed(1).replace(/\.0$/, '') + ' qua';
     }     
     if (num >= 1000000000000) {
        return (num / 1000000000000).toFixed(1).replace(/\.0$/, '') + ' tri';
     }          
                
     if (num >= 1000000000) {
        return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + ' bi';
     }
     if (num >= 1000000) {
        return (num / 1000000).toFixed(1).replace(/\.0$/, '') + ' mi';
     }
     if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + ' mil';
     }
     return num;
}

async function enviar_reply(msg) {
await japa.sendMessage(from, { text: msg }, { quoted: mek}).then((res) => console.log(res)).catch((err) => console.log(err))
}

async function enviarpoll(id, titulovoto, op1, op2, op3) {
const poll = generateWAMessageFromContent(id, proto.Message.fromObject({
pollCreationMessage: {
name: titulovoto,
options: [
{
optionName: op1
},
{
optionName: op2
},
{
optionName: op3
}
],
selectableOptionsCount: 0
}
}), { userJid: id })
await japa.relayMessage(id, poll.message, { messageId: poll.key.id})
}


async function eumdenos(numero) {
        let users = await usuario.findOne({numero_zap: numero});
        if(users !== null) {
            return users.numero_zap;
        } else {
            return false;
        }
    }
    
async function infodb(numero) {
let users = await usuario.findOne({numero_zap: numero});
if(users !== null) {
return users;
} else {
return false;
}
}

const rg = await infodb(sender.split("@")[0])
const reqXp  = Math.floor(600 + (rg.nivel * 400));

const enviarfiguimg = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifImg(buff, options)
} else {
 buffer = await imageToWebp(buff)
}
await japa.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }


 const enviarfiguvid = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path: /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64'): /^https?:\/\//.test(path) ? await (await getBuffer(path)): fs.existsSync(path) ? fs.readFileSync(path): Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
 buffer = await writeExifVid(buff, options)
} else {
 buffer = await videoToWebp(buff)
}

await japa.sendMessage(jid, {
 sticker: {
url: buffer
 }, ...options
}, {
 quoted
})
return buffer
 }    
 
 const getExtension = async (type) => {
return await mimetype.extension(type)
 }

 const getFileBuffer = async (mediakey, MediaType) => {
const stream = await downloadContentFromMessage(mediakey, MediaType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
 buffer = Buffer.concat([buffer, chunk])
}
return buffer
 } 
 
 try {
ppimg = await japa.profilePictureUrl(sender)
 } catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
const userppbuff = await getBuffer(ppimg) 

const enviarOrda = async(jid, text, orid, img, itcount, title, sellers, tokens, ammount) => {
const order = generateWAMessageFromContent(jid, proto.Message.fromObject({
"orderMessage": {
"orderId": orid, // Change ID
"thumbnail": img, // Change the Image
"itemCount": itcount, // Change the Item Count
"status": "INQUIRY", // Don't Replace
"surface": "CATALOG", // Don't Replace
"orderTitle": title, // Change the title
"message": text, // Change Message
"sellerJid": sellers, // Change the seller
"token": tokens, // Change the token
"totalAmount1000": ammount, // Change the Total Amount
"totalCurrencyCode": "BRL", // Up to you
}
}), { userJid: jid })
japa.relayMessage(jid, order.message, { messageId: order.key.id})
}

const enviarCatalog = async(jid, titulo, texto, valor) => {
const catalog = generateWAMessageFromContent(jid, proto.Message.fromObject({
"productMessage": {
"product": {
	"productImage": {
			"url": "https://mmg.whatsapp.net/d/f/An6ssWQrEx3DYOvrXx5Ld5-1zzyW8DpRhZvr2ZCKrIu-.enc",
			"mimetype": "image/jpeg",
			"fileSha256": "fR9ZYUp6oPISWJNO6ywrBBNck0OpSw7FYL6XPXjKS6M=",
			"fileLength": "99999999999",
			"height": 50,
			"width": 50,
			"mediaKey": "/BQzqmWzeGOB1X7aPOCAxbVUeZL18bw3v9J7yA0Vn2Y=",
			"fileEncSha256": "C7LQFJx65AAS6sdALkCGNmDC+0NWilRBH8zHa+Lt4x4=",
			"directPath": "/v/t62.7118-24/35880876_730612661375500_4224816547459430339_n.enc?ccb=11-4&oh=01_AVxtkNgm-pIDHhEhvkfWXRnfU9WbYIckQFKZrtbZuAzGmw&oe=631A1B4E&_nc_hot=1660217709",
			"mediaKeyTimestamp": "1660217472",
			"jpegThumbnail": userppbuff
		},
		"productId": "7912700932134833",
		"title": titulo,
		"description": texto,
		"currencyCode": "BRL",
		"priceAmount1000": valor,
		"productImageCount": 2
		},
	"businessOwnerJid": "6281315265406@s.whatsapp.net"
	}
}), { userJid: jid })
japa.relayMessage(jid, catalog.message, { messageId: catalog.key.id})
}

const verificadokkk = {
    key : {
    remoteJid: 'status@broadcast',
    participant : '0@s.whatsapp.net'
    },
    message: {
    orderMessage: {
    itemCount : 2022,
    status: 1,
    surface : 1,
    message: `japa`, 
    orderTitle: `APIS`,
    thumbnail: fs.readFileSync('./public/img/japa.jpg'),
    sellerJid: '0@s.whatsapp.net' 
    }
    }
    }
    
const enviardocBut = async(id, msg, msg2, titulo, nomearquivo, documentobuff, tipo, tumb, but = [], options = {}) => {	
const buttonMessage = {
contextInfo: options,
document: documentobuff,
mimetype: tipo, 
title : titulo,
fileLength : 999999999999, 
pageCount: 100, 
fileName : nomearquivo,
thumbnail : tumb,
caption: msg,
footer: msg2,
buttons: but,
headerType: "DOCUMENT"
}

await japa.sendMessage(id, buttonMessage,options)
}    

if (budy.startsWith('>')) {
if (!isOwner) return
try {
 let evaled = await eval(budy.slice(2))
 if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
 await enviar_reply(evaled)
} catch (err) {
 await enviar_reply(String(err))
}
 }

 if (budy.startsWith('$')) {
 if (!isOwner) return
exec(budy.slice(2), (err, stdout) => {
 if (err) return enviar_reply(err)
 if (stdout) return enviar_reply(stdout)
})
 }


/*if (budy && isGroup) {
var jid = '120363045171866602@g.us' //id :)
//var timert = moment.tz('America/Sao_Paulo').format('DD/MM HH:mm:ss')
// toda mensagem enviada sera apagada.
// coloque a key da mensagem... ^-^

await japa.sendMessage(jid, { delete: mek.key })
// titulo & participante
/*
var gpcriado = await japa.groupCreate(`${pushname} ` + timert, [sender])
japa.sendMessage(gpcriado.id, { text: budy }) // manda mensagem no grupo
await japa.groupSettingUpdate(gpcriado.id, 'locked')
*/
//}


/*let checking = await eumdenos(sender.split("@")[0]);
if (isCmd && !checking){ 
japa.sendMessage(from, {video: fs.readFileSync('./public/video/japa.mp4'), gifPlayback: false, caption: `Olá @${sender.split('@')[0]}, para poder usar meus comandos faça um registro no site https://japa-team.herokuapp.com\nTenha um bom dia!` , mentions: [sender]}, {quoted: mek}) 
return
}*/

switch (command) {
/*case 'menu':
let reactionMessage = {
    react: {
        text: emoji_bo,
        key: mek.key
    }
}
await japa.sendMessage(from, reactionMessage)
let menutxt =
`
╭━━ ⪩
▢ ️❯ ${setar_dia_noite()}
▢ ╭═══⊷
▢ ⌁ 𖠂 prefix:『${prefix}』•
▢ ⌁ 𖠂 ${rg.nome_usuario} •
▢ ⌁ 𖠂 ${rg.numero_zap} •
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟✨𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺✨️️⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}sticker [_img/vídeo_] °
▢ ⌁ 𖥂 ${prefix}attp1 [_texto_] °
▢ ⌁ 𖥂 ${prefix}play [_nome_] °
▢ ⌁ 𖥂 ${prefix}ytmp3 [_link_] °
▢ ⌁ 𖥂 ${prefix}ytmp4 [_link_] °
▢ ⌁ 𖥂 ${prefix}perfil [__] °
▢ ╰═══⊷
╰━━━ ⪨

╭━━ ⪩
▢ き⃟🌹𝑶𝑼𝑻𝑹𝑶𝑺🌹⃟ き
▢ ╭═══⊷
▢ ⌁ 𖥂 ${prefix}produtoid °
▢ ⌁ 𖥂 ${prefix}botzipid °
▢ ⌁ 𖥂 ${prefix}ping °
▢ ╰═══⊷
╰━━━ ⪨
`
enviar_reply('verifique seu privado...')
//await enviarCatalog(from, '✨ 𝖈𝖑𝖎𝖖𝖚𝖊 𝖆𝖖𝖚𝖎⚡', menutxt, 30000)
await enviarOrda(sender, menutxt, "1018430412188621", fs.readFileSync('./public/img/japa.jpg'), `666`, `333`, "6281315265406@s.whatsapp.net", "AR7RorqhCmsQ+f+T/VSgwBx3gc81RZtizDRtI8rGDJ2O6Q==", "666")
break
case 'perfil': {
 try {
ppimg = await japa.profilePictureUrl(sender)
 } catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
    let reactionMessage = {
    react: {
        text: '🤩',
        key: mek.key
    }
}
await japa.sendMessage(from, reactionMessage)
let buff = await getBuffer(ppimg)
ran = getRandom('.jpg')
await fs.writeFileSync(ran, buff)
let upp = await TelegraPh(ran)
let perfilcanvas = `https://japa-team.herokuapp.com/api/canvas/rank?nome=${rg.nome_usuario}&perfil=${util.format(upp)}&fundo=https://telegra.ph/file/14c9a6ce9c4e3e43a8ee1.jpg&cor=yellow&xp=${reqXp}&fullxp=${rg.exp}&rank=${rg.nivel}&level=${rg.nivel}&contagem=${rg.totalreq}&apikey=saladakk`
var usuario_tipo = 'Comum'
if (rg.admin === 'sim') {
usuario_tipo = 'Criador 😎'
} else if (rg.premium !== null) {
usuario_tipo = 'Premium 🥳'
} 
perfill =
`
🤠 *${rg.nome_usuario}* 🤠

📲•Número : ${rg.numero_zap}
🌷️•Limit : ${rg.limit}
🍃️•Totalreq : ${rg.totalreq}
🆙️•Nível : ${rg.nivel}
🆙️•Exp : ${abreviar(rg.exp)} / ${abreviar(reqXp)}
🤑•Dinheiro : ${abreviar(rg.dinheiro)}
👉•Tipo de user : ${usuario_tipo}

`
await japa.sendMessage(from, { image: { url: perfilcanvas}, caption: perfill, thumbnail: fs.readFileSync('./public/img/japa.jpg'), height: 1000, width: 100, fileLength: 999999999999, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: 'https://japa-team.herokuapp.com/perfil/' + rg.nome_usuario + '/', title: 'PERFIL', body: 'CLIQUE AQUI', thumbnail: fs.readFileSync('./public/img/japa.jpg'), sourceUrl: 'https://japa-team.herokuapp.com/perfil/' + rg.nome_usuario + '/' }}}, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}
break
case 'produtoid': {
let reactionMessage = {
    react: {
        text: '🤑',
        key: mek.key
    }
}
await japa.sendMessage(from, reactionMessage)
await enviarCatalog(from, 'veja alguns produtos!', 'Premium por 1 mês\n\n☆ limite : 999999\n☆ verificado : ✅\n☆ recursos especiais : ✅', 30000)
await enviarOrda(from, 'clique aqui 🐒', "1018430412188621", fs.readFileSync('./public/img/japa.jpg'), `1`, `japa PREMIUM`, "6281315265406@s.whatsapp.net", "AR7RorqhCmsQ+f+T/VSgwBx3gc81RZtizDRtI8rGDJ2O6Q==", "1")
}
break



case 'ping': {
  enviar_reply('pong')
}
break

case 'botzipid':
let options2 =
{ 
externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: 'https://instagram.com/_breno.pv_/', title: 'japa-APIS', body: 'OFC', thumbnail: fs.readFileSync('./public/img/japa.jpg'), sourceUrl: 'https://instagram.com/_breno.pv_/'  }
}   

let botaone = [
{"buttonId": `${prefix}menu`,"buttonText": {"displayText": `〖MENU〗`},"type": "RESPONSE"},
{"buttonId": `${prefix}produtoid`,"buttonText": {"displayText": `〖PRODUTOS〗`},"type": "RESPONSE"}
]
enviardocBut(from, `japa`, 'BOT', 'V1', 'japa OFC BOT', fs.readFileSync('./public/js/japa.zip'), botaone, options2)
break*/

case 'menuid': {
 try {
ppimg = await japa.profilePictureUrl(sender)
 } catch {
ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
 }
    let reactionMessage = {
    react: {
        text: '🌷',
        key: mek.key
    }
}
await japa.sendMessage(from, reactionMessage)
let menuString = 
 `
┌─「japa-api」
├❏ 
├❏──────
├─「 inf-user 」
├❏ ${rg.nome_usuario}
├❏ +${rg.numero_zap}
├❏ totalreq : ${rg.totalreq}
├❏ limit : ${rg.limit}
├❏ nível : ${rg.nivel}
├❏ exp : ${abreviar(rg.exp)}/${abreviar(reqXp)}
├❏ dinheiro : ${abreviar(rg.dinheiro)}
├❏──────
├❏${prefix}sticker [marq,img] •
├❏${prefix}attp1 [nome] •
├❏${prefix}play [nome] •
└────ׂ
⇲ _breno_ ⇱
 `
let buff = await getBuffer(ppimg)
ran = getRandom('.jpg')
await fs.writeFileSync(ran, buff)
let upp = await TelegraPh(ran)
let imganuncio2 = `https://japa-team.herokuapp.com/api/canvas/rank?nome=${rg.nome_usuario}&perfil=${util.format(upp)}&fundo=https://telegra.ph/file/14c9a6ce9c4e3e43a8ee1.jpg&cor=yellow&xp=${reqXp}&fullxp=${rg.exp}&rank=${rg.nivel}&level=${rg.nivel}&contagem=${rg.totalreq}&apikey=saladakk`
let imganuncio3 = [`https://japa-team.herokuapp.com/api/canvas/bolsonaro?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/wanted?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/wasted?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/del?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/comunismo?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/gay?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/facepalm?img=${util.format(upp)}&apikey=saladakk`,`https://japa-team.herokuapp.com/api/canvas/jail?img=${util.format(upp)}&apikey=saladakk`]
let imganuncio = imganuncio3[Math.floor(Math.random() * imganuncio3.length)]
let options2 =
{ 
externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: 'https://instagram.com/_breno.pv_/', title: 'japa-APIS', body: 'OFC', thumbnail: await getBuffer(imganuncio), sourceUrl: 'https://instagram.com/_breno.pv_/'  }
}   
let botaone = [
{"buttonId": `${prefix}menu`,"buttonText": {"displayText": `〖MENU〗`},"type": "RESPONSE"},
{"buttonId": `${prefix}produtoid`,"buttonText": {"displayText": `〖PRODUTOS〗`},"type": "RESPONSE"}
]
enviardocBut(from, menuString, setar_dia_noite(), ' ', ' ', fs.readFileSync('./public/js/japa.zip'), botaone, options2)
}
break

case 'sticker': case 's': case 'stickergif': case 'sgif': case 'f': case 'figu': {
if ((isMedia && !mek.message.videoMessage || isQuotedImage)) {
 enviar_reply('criando figurinha')
 console.log('criando figurinha image')
 const encmedia = isQuotedImage ? mek.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage: mek.message.imageMessage
 rane = getRandom('.'+ await getExtension(encmedia.mimetype))
 imgbuff = await getFileBuffer(encmedia, 'image')
 fs.writeFileSync(rane, imgbuff)
 const media = rane
 ran = getRandom('.'+media.split('.')[1])
 const upload = await TelegraPh(media)
 await enviarfiguimg(from, util.format(upload), mek, {
packname: pacote, author: auutor
 })
} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11)) {
 enviar_reply('criando figurinha')
 console.log('criando figurinha vídeo')
 const encmedia = isQuotedVideo ? mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage: mek.message.videoMessage
 rane = getRandom('.'+ await getExtension(encmedia.mimetype))
 imgbuff = await getFileBuffer(encmedia, 'video')
 fs.writeFileSync(rane, imgbuff)
 const media = rane
 ran = getRandom('.'+media.split('.')[1])
 const upload = await TelegraPh(media)
 await enviarfiguvid(from, util.format(upload), mek, {
packname: pacote, author: auutor
 })
} else return enviar_reply(`Marque a imagem com o comando ${prefix}sticker ou coloque na legenda, o video ou gif so pode ter 10 segundos de duração`)
 }
break

case 'votar':
reactionMessage = {
    react: {
        text: '🗳️️',
        key: mek.key
    }
}
await japa.sendMessage(from, reactionMessage)
enviarpoll(from, q ? q : 'japabot e a melhor né?', 'sim', 'não', 'tenho dúvidas')
break

case 'play':{
if (!q) return reply('imbecil?')
ytpe = await fetchJson(encodeURI(`https://japa-team.herokuapp.com/api/pesquisa/ytsrc?nome=${q}&apikey=saladakk`))
japaresu = ytpe[Math.floor(Math.random() * ytpe.length)]
console.log(japaresu)
japalet = await fetchJson(encodeURI(`https://japa-team.herokuapp.com/api/dl/yt?link=${japaresu.url}&apikey=saladakk`))
console.log(japalet)
capa = `https://japa-team.herokuapp.com/api/canvas/musicard?titulo=${japaresu.title}&fotomusic=${japalet.resultado.capa}&fundo=https://telegra.ph/file/14c9a6ce9c4e3e43a8ee1.jpg&autor=${japaresu.author.name}&nomealbum=breno&apikey=saladakk`
await japa.sendMessage(from, { image: { url: capa}, thumbnail: getBuffer(userppbuff), jpegThumbnail: getBuffer(userppbuff), fileLength: 999999999999, height: 1000, width: 1000, caption: null }, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
japa.sendMessage(from, {
 audio: {
url: japalet.resultado.mp3
 }, mimetype: 'audio/mpeg', fileName: `${japaresu.title}.mp3`, contextInfo: {
externalAdReply: {
 showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: japaresu.url, title: japaresu.title, body: japalet.resultado.tamanho_mp3, thumbnail: await getBuffer(japalet.resultado.capa), sourceUrl: japaresu.url
}}}, {
 quoted: false
}).then((res) => console.log(res)).catch((err) => console.log(err))
}
break

/*case 'play': {
if(!q) return reply('?')
enviar_reply(`procurando sua música!`)
japalet = await fetchJson(encodeURI(`https://japa-team.herokuapp.com/api/pesquisa/ytsrc?nome=${q}&apikey=saladakk`))
japaresu = japalet[Math.floor(Math.random() * japalet.length)]
let aD =
{ 
externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: japaresu.url, title: japaresu.title, body: japaresu.duration.timestamp, thumbnail: await getBuffer(japaresu.thumbnail), sourceUrl: japaresu.url  }
}   

let botaone = [
{"buttonId": `${prefix}ytmp3 ${japaresu.url}`,"buttonText": {"displayText": `〖MP3〗`},"type": "RESPONSE"},
{"buttonId": `${prefix}ytmp4 ${japaresu.url}`,"buttonText": {"displayText": `〖MP4〗`},"type": "RESPONSE"}
]
let templateButtons = [
  {index: 1, urlButton: {displayText: '⭐ Copiar Link!', url: 'https://www.whatsapp.com/otp/copy/' + q}},
  {index: 2, urlButton: {displayText: '⭐ Abrir Link!', url: q}},
  {index: 3, urlButton: {displayText: '⭐ Api Usada!', url: 'https://japa-team.herokuapp.com'}},
  {index: 4, quickReplyButton: {displayText: '〖MP3〗', id: `${prefix}ytmp3 ${q}`}},  
  {index: 5, quickReplyButton: {displayText: '〖MP4〗', id: `${prefix}ytmp4 ${q}`}},  
]
enviardocBut(from, '🥀', japaresu.description, 'V1', japaresu.title, await getBuffer(japaresu.thumbnail), 'image/jpeg', await getBuffer(japaresu.thumbnail), botaone, aD)
}
break



case 'ytmp4':{
if (!q.includes('youtu.be')) return reply('o link precisa ser do https://youtu.be')
japalet = await fetchJson(encodeURI(`https://japa-team.herokuapp.com/api/dl/yt?link=${q}&apikey=saladakk`))
await japa.sendMessage(from, { video: { url: japalet.mp4}, caption: '🥀', contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: q, title: japalet.titulo, body: japalet.tamanho, thumbnail: await getBuffer(japalet.capa), sourceUrl: q  }}}, {quoted: mek}).then((res) => console.log(res)).catch((err) => console.log(err))
}
break

case 'cpf3':
japacpf = await fetchJson(encodeURI(`https://japa-susc.herokuapp.com/cpf3/${q}`))
buff = await getBuffer(`https://japa-team.herokuapp.com/api/maker/puxadatxt2?texto=${japacpf.resultado}&apikey=saladakk`)
//fs.writeFileSync(`./consulta.txt`, `${japacpf.resultado}`)
//await conn.sendMessage(from, { image: buff, caption: null }, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
conn.sendMessage(from, { document: buff, mimetype: 'image/jpeg', fileName: 'consultas.txt', thumbnail: buff, jpegThumbnail: buff })
break
*/
case 'attp1': {
if(!q) return enviar_reply('?')
await japa.sendMessage(from, { sticker: { url: `https://japa-team.herokuapp.com/api/maker/${command}?texto=${q}&apikey=saladakk`}, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: 'https://chat.whatsapp.com/L6pLdkVmkVhFwvKzpnKgQn', title: 'japa-APIS', body: 'OFC', thumbnail: fs.readFileSync('./public/img/japa.jpg'), sourceUrl: 'https://chat.whatsapp.com/L6pLdkVmkVhFwvKzpnKgQn'  }}}, {quoted: null}).then((res) => console.log(res)).catch((err) => console.log(err))
}
break

 }
 } catch (e) {
const isError = String(e)
console.log(isError)
}
})
}

connectToWA()
 
 
 
