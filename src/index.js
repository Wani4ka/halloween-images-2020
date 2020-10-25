import $ from 'jquery'
import axios from 'axios'

$(() => {
	let btn = $('#submitBtn')
	let responses = []
	let submitting = false

	let canSubmit = () => {
		let ok = !submitting
		responses.forEach((response) => {
			let val = parseInt(response.val())
			if (isNaN(val) || val < 1 || val > 20) {
				ok = false
				response.addClass('is-danger')
			} else response.removeClass('is-danger')
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
		btn.addClass('is-loading')
		
		let result = []
		responses.forEach((response) => result.push(response.val()))

		submitting = true
		let response = await axios.post('/submit', 'data=' + result.join(','))
		btn.removeClass('is-loading')
		if (response.code === 500)
			alert('Произошла непредвиденная ошибка. Сообщи об этом разработчикам.')
		else if (response.code === 401)
			window.open('/auth', '_self')
		else if (response.data === 'ok')
			window.location.reload()
		else alert(response.data.msg)
		submitting = false

	})
})
