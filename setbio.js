const Insta = require('./insta.js');
const client = new Insta.Client();
const fetch = require('node-fetch')
const axios = require('axios')
const {
	exec,
	spawn,
	execSync
} = require("child_process")
const util = require('util')
const { getBuffer , getRandom} = require("./func.backend/buff");

client.on('connected', () => {
	console.log('mudando bio ')
});


const prefix = '/'

client.on('messageCreate', async japa => {
if (!japa.content || japa.authorID === client.user.id) return;
 const budy = japa.content
	const args = japa.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	const q = args.join(" ").replace(command,'')
	const pushname = japa.author.username
	const sender = japa.author.id
	const ppimg = japa.author.avatarURL
	const from = japa.chatID
  const moment = require('moment-timezone')
  const time = moment().format('DD/MM HH:mm:ss')
	
	
	
const pperfil = await getBuffer(ppimg)

const reply = (teks) => {
japa.chat.sendMessage(teks)
}


setTimeout(() => {
let bio = 
`Your Body Language...
@biaahxzs
Pᴇssᴏᴀs Tʀ¡sᴛᴇs Mᴏππᴇᴍ † † † † †. ..
${time.replace(' ', `\n`).replace(':', ' ')} ⏰`
japa.client.ig.account.setBiography(bio)
}, 60 * 5000)




switch (command) {
		


	
default: break
}})
client.login('_breno.js', '34615194');
