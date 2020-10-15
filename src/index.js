import $ from 'jquery'
import axios from 'axios'

$(() => {
	let btn = $('#submitBtn')
	let responses = []

	let canSubmit = () => {
		let ok = true
		responses.forEach((response) => {
			let val = parseInt(response.val())
			if (isNaN(val) || val < 1 || val > 20)
				ok = false
		})
		btn.prop('disabled', !ok)
	}

	for (let i = 0; i < 4; ++i) {
		let resp = $('#response' + i)
		responses.push(resp)
		resp.on('input', canSubmit)
	}
	canSubmit()

	btn.on('click', async () => {
		canSubmit()
		if (btn.prop('disabled')) { return }
		btn.prop('disabled', true)

		let result = []
		responses.forEach((response) => result.push(response.val()))

		let response = await axios.post('/submit', 'data=' + result.join(','))
		if (response.code === 500)
			alert('Произошла непредвиденная ошибка. Сообщи об этом разработчикам.')
		else if (response.code === 401)
			window.open('/auth', '_self')
		else if (response.data === 'ok')
			window.location.reload()
		else alert(response.data.msg)

	})
})
