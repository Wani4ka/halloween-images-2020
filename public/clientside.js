$(document).ready(() => {
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

    btn.click(() => {
        canSubmit()
        if (btn.prop('disabled')) { return }
        btn.prop('disabled', true)

        let result = []
        responses.forEach((response) => result.push(response.val()))

        let xmlHttp = new XMLHttpRequest()
        xmlHttp.onreadystatechange = () => {
            if (xmlHttp.readyState !== 4) return;
            if (xmlHttp.status === 500)
                alert('Произошла непредвиденная ошибка. Сообщи об этом разработчикам.')
            else if (xmlHttp.status === 401)
                window.open('/auth', '_self')
            else if (xmlHttp.status === 400)
                alert('Что-то пошло не так')
            else if (xmlHttp.responseText === 'ok')
                window.location.reload(false)
            else alert(JSON.parse(xmlHttp.responseText).msg)
        }
        xmlHttp.open('POST', '/submit', true)
        xmlHttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttp.send('data=' + result.join(','))
    })
})
