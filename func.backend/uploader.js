
let axios = require('axios')
let BodyForm = require('form-data')
let fs = require('fs')



function TelegraPh (Path) {
	return new Promise (async (resolve, reject) => {
		if (!fs.existsSync(Path)) return reject(new Error("File not Found"))
		try {
			const form = new BodyForm();
			form.append("file", fs.createReadStream(Path))
			const data = await  axios({
				url: "https://telegra.ph/upload",
				method: "POST",
				headers: {
					...form.getHeaders()
				},
				data: form
			})
			return resolve("https://telegra.ph" + data.data[0].src)
		} catch (err) {
			return reject(new Error(String(err)))
		}
	})
}

JapaUp = async(path) => {
	return new Promise((resolve,reject) => {
		const bodyForm = new BodyForm();
		bodyForm.append('file', fs.createReadStream(path))
		axios(`https://japa-team.herokuapp.com/upload`,{
			method: 'POST',
			data: bodyForm,
			headers: {
				"accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
				"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
				"content-type": `multipart/form-data; boundary=${bodyForm._boundary}`
			}
		})
        .then(({ data }) => {
			resolve(data)
		})
	})
}

module.exports = { TelegraPh, JapaUp }
