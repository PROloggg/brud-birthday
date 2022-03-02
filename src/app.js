if (!!!cheer) {
    var cheer = {}
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)',
    ))
    return matches ? decodeURIComponent(matches[1]) : undefined
}

function getAway() {
    alert('Ваши попытки закончились. Вы не Анька Бруд! Покиньте этот тест!')
    document.location.href = 'https://youtu.be/dQw4w9WgXcQ'
}

function $_GET(key) {
    var p = window.location.search
    p = p.match(new RegExp(key + '=([^&=]+)'))
    return p ? p[1] : false
}

cheer = {
    app: null,
    init: function () {
        setTimeout(function () {
            document.getElementById('container').classList.remove('hide')
            document.getElementById('load').classList.add('hide')
        }, 5000)

        if (getCookie('try') === 'false') {
            getAway()
        }
        let live = 3
        if (getCookie('live')) {
            live = parseInt(getCookie('live'))
        }
        let step = 0
        if ($_GET('round') == '2') {
            step = 5
        }

        cheer.app = new Vue({
                el: '#app',
                data: {
                    step: step,
                    live: live,
                    questions: [
                        {
                            question: 'Где мы познакомились?',
                            answers: [
                                { text: 'На улице', code: 1 },
                                { text: 'В интернете', code: 2 },
                                { text: 'В лагере', code: 3 },
                                { text: 'В походе', code: 4 },
                            ],
                            right: 3,
                            gift: false,
                        },
                        {
                            question: 'Какого цвета наша форма?',
                            answers: [
                                { text: 'Жёлто-черная', code: 1 },
                                { text: 'Сине-черная', code: 2 },
                                { text: 'Оранжево-красная', code: 3 },
                                { text: 'Красно-черная', code: 4 },
                            ],
                            right: 2,
                            gift: false,
                        },
                        {
                            question: '"Только одна тренировка" это когда?',
                            answers: [
                                { text: '08.03.2022', code: 1 },
                                { text: 'В субботу', code: 2 },
                                { text: 'Когда нет основных тренировок', code: 3 },
                                { text: 'Как договоримся', code: 4 },
                            ],
                            right: 2,
                            gift: false,
                        },
                        {
                            question: 'Имя твоей первой базы:',
                            answers: [
                                { text: 'Игнат', code: 1 },
                                { text: 'Аркаша', code: 2 },
                                { text: 'Гоша', code: 3 },
                                { text: 'Святик', code: 4 },
                            ],
                            right: 4,
                            gift: false,
                        },
                        {
                            question: 'Наш стант назван в честь:',
                            answers: [
                                { text: 'Måneskin', code: 1 },
                                { text: 'Pussycat Dolls', code: 2 },
                                { text: 'Игрушки', code: 3 },
                                { text: 'Цвета формы', code: 4 },
                            ],
                            right: 2,
                            gift: true,
                        },

                        //раунд 2
                        {
                            question: 'Какой твой основной недостаток?',
                            answers: [
                                { text: 'Не умеешь готовить', code: 1 },
                                { text: 'Сторисы', code: 2 },
                                { text: 'Имя', code: 3 },
                                { text: 'Стремно красишься', code: 4 },
                            ],
                            right: 3,
                            gift: false,
                        },
                        {
                            question: 'Сколько осталось дней?',
                            answers: [
                                { text: '121', code: 1 },
                                { text: '365', code: 2 },
                                { text: '13', code: 3 },
                                { text: '31', code: 4 },
                            ],
                            right: 2,
                            gift: false,
                        },
                        {
                            question: 'Что на нашей медали?',
                            answers: [
                                { text: 'Цифра', code: 1 },
                                { text: 'Милая надпись', code: 2 },
                                { text: 'Запрещенное фото', code: 3 },
                                { text: 'Кубок', code: 4 },
                            ],
                            right: 3,
                            gift: false,
                        },
                        {
                            question: 'Где мы были перед соревами?',
                            answers: [
                                { text: 'В японском ресторане', code: 1 },
                                { text: 'В спа-салоне', code: 2 },
                                { text: 'У тебя дома', code: 3 },
                                { text: 'В кинотеатре', code: 4 },
                            ],
                            right: 1,
                            gift: false,
                        },
                        {
                            question: 'Самое чистое чувство?',
                            answers: [
                                { text: 'Голод', code: 1 },
                                { text: 'Любовь', code: 2 },
                                { text: 'Усталость', code: 3 },
                                { text: 'Ненависть', code: 4 },
                            ],
                            right: 4,
                            gift: true,
                        },
                    ],

                    userAnswers: [],
                    isFinish: false,
                    isFinal: false,
                    finalAnswer: null,
                    result: null,
                },
                methods: {
                    checked: function (e) {
                        let code = parseInt(e.currentTarget.value),
                            id = e.currentTarget.id,
                            app = cheer.app,
                            step = app.step

                        if (code !== app.questions[step].right) {
                            document.getElementById(id + '_checkbox').classList.add('funkyradio-danger')
                            app.live--
                            document.cookie = 'live=' + app.live
                            if (app.live <= 0) {
                                document.cookie = 'try=false'
                                getAway()
                            }
                        } else {
                            Vue.set(app.userAnswers, step, code)
                            app.nextStep(app.questions[step].gift === true)
                        }
                    },
                    nextStep: function (gift) {
                        let app = cheer.app,
                            code = app.userAnswers.join('')

                        if (gift) {
                            document.location.href = 'http://bot.cheer-ural.ru/anbr.php?step=' + app.step
                        }
                        if (app.userAnswers.length < app.questions.length) {
                            app.step++
                        }
                        cheer.toUp()
                    },
                },
            },
        )
    },
    t: null,
    toUp: function () {
        let top = Math.max(document.body.scrollTop, document.documentElement.scrollTop)
        if (top > 0) {
            window.scrollBy(0, -10)
            cheer.t = setTimeout(cheer.toUp(), 20000)
        } else clearTimeout(cheer.t)
        return false
    },
}


document.addEventListener('DOMContentLoaded', cheer.init)
