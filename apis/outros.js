__path = process.cwd()
const { verificaKey, limitAdd, isLimit, dinheiroadd, expfarm } = require('../backend/db')
const deepai = require('deepai')
const fs = require('fs')

const paramtroerro = __path + '/views/ErroLink.html' //400
const semapikey = __path + '/views/SemKey.html' //404
const semlimit = __path + '/views/SemLimit.html' //429

const fetch = require('node-fetch');
const { rastrear } = require('../func.backend/api')
const { toPTT } = require('../func.backend/converter.js')
const { getBuffer, getRandom } = require("../func.backend/buff");

 const {
educar_IA,
resposta_IA
 } = require('../func.backend/ia.js');
 
 
async function japaia(req, res) {
try {
let apikey = req.query.apikey
let type = req.query.type
let budy = req.query.budy
let quoted = req.query.quoted
if (!apikey) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
await educar_IA(type, quoted)
const ia_inity = await resposta_IA(budy)
console.log(resposta_IA(budy))
if (!ia_inity) res.json({status: 0, resposta: 'ops, não sei oq dizer :(', resultado: 'error'})
if (ia_inity) res.json({
status: 'operando', 
admin: 'https://wa.me/5562936180708', 
resposta: ia_inity
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function rastre(req, res) {
 let apikey = req.query.apikey
 let id = req.query.id
 if (!apikey) return res.sendFile(paramtroerro)
 if (!nome) return res.sendFile(paramtroerro) 
 let check = await verificaKey(apikey)
 if (!check) return res.sendFile(semapikey)
 let limit = await isLimit(apikey);
 if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
rastrear(id).then(resultado => {
res.json(resultado)
}).catch(error => {
console.log(error);
res.status(500).send({
status: 500,
mensagem: 'Erro no Servidor Interno'
})
});
}

async function gethtml(req, res) {
try {
let apikey = req.query.apikey
let site = req.query.site
if (!apikey) return res.sendFile(paramtroerro)
if (!site) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
expfarm(apikey)
fetch(site).then(res => res.text())
.then(i =>{
res.json({html: i})
})   
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}


async function geraCpf(req, res) {
try {
let apikey = req.query.apikey
if (!apikey) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`https://2devs.com.br/v1/cpf?quantity=1&dots=.`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function geraCertidao(req, res) {
try {
let apikey = req.query.apikey
if (!apikey) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`https://2devs.com.br//v1/certificate?quantidade=10&tipo=1`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function geraCnh(req, res) {
try {
let apikey = req.query.apikey
if (!apikey) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`https://2devs.com.br//v1/cnh?quantidade=10`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function geraRg(req, res) {
try {
let apikey = req.query.apikey
if (!apikey) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`https://2devs.com.br//v1/rg?quantidade=10&separador=.`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function nome(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.nome
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/nome/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function cpf(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.cpf
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/cpf1/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function cpf2(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.cpf
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/cpf2/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function cpf3(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.cpf
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/cpf3/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function tel(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.telefone
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/telefone/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function placa(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.placa
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/placa/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function cns(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.cns
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		fetch(encodeURI(`http://${req.hostname}/sayo/cns/${dm}`))
		.then(response => response.json())
		.then(i => {
res.json(i)
})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}

async function antiporn(req, res) {
try {
let apikey = req.query.apikey
let dm = req.query.img
if (!apikey) return res.sendFile(paramtroerro)
if (!dm) return res.sendFile(paramtroerro)
let check = await verificaKey(apikey)
if (!check) return res.sendFile(semapikey)
let limit = await isLimit(apikey);
if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
		deepai.setApiKey('6a6462b1-2f1f-4ca6-b071-8095d697c041')
		const resp = await deepai.callStandardApi("nsfw-detector", {
image: `${dm}`
		})
		if (resp.output.nsfw_score > 0.85) return res.json({
status: true, pornografia: "sim"
		})
		if (resp.output.nsfw_score < 0.85) return res.json({
status: true, pornografia: "nao"
		})
	} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}


async function toaud(req, res) {
try {
 const apikey = req.query.apikey;
 const link = req.query.link;
 if (link === undefined || apikey === undefined) return res.sendFile(paramtroerro)
 let check = await verificaKey(apikey)
 if (!check) return res.sendFile(semapikey)
 let limit = await isLimit(apikey);
 if (limit) return res.sendFile(semlimit)
await limitAdd(apikey);
await expfarm(apikey);
let linkbuff = await getBuffer(link)
let audio = await toPTT(linkbuff, 'mp4')
console.log(audio)
 res.sendFile(audio.data)
		} catch(err) {
		console.log(err)
		res.status(500).send({
			status: 500, info: 'ops, aconteceu um erro no servidor interno, contate o admin pelo Whatsapp wa.me/5516993025827', resultado: 'error'
		})
	}
}


module.exports = { 
geraCpf,
geraCertidao,
geraCnh,
geraRg,
nome,
cpf,
cpf2,
cpf3,
tel,
placa,
cns,
antiporn,
gethtml,
rastre,
toaud,
japaia
}