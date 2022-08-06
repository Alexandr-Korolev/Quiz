const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

// Отчистим поле (разметку)

// Находим элементы
const headerContainer = document.querySelector('#header');  // обертка для заголовка

const listContainer = document.querySelector('#list');   // обертка для вариантов ответа

const submitBtn = document.querySelector('#submit');   // кнопка


// Переменный игры
let score = 0;    //  кол-во правильных ответов
let questionIndex = 0;   // текущий индекс массива


// Закрываем стартовое окно и начинаем квиз
document.querySelector('.start-btn').onclick = function(){
    setTimeout(() =>{
        document.querySelector('.start').style.display = 'none';
        document.querySelector('.quiz-main').style.display = 'flex';
    },500)
}


// функция отчистки страницы (так как вызываем несколько раз)
function clearPage() {
    headerContainer.innerHTML = '';

    listContainer.innerHTML = '';
}
clearPage();


// отображение квиза
function showQuestion() {

    // отображаем вопрос
    const headerTemplate = `<h2 class="title">%title%</h2>`;  // % - шаблонная переменная
    
    const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);  // замена одного элемента на другой

    headerContainer.innerHTML = title;


    // отображаем варианты ответа
    // идем циклом по массиву с вариантами ответов
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']){
        console.log(answerNumber, answerText);

        const questionTemplate = 
        `<li>
				<label>
					<input value ="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
				</label>
			</li>`;

        const answerHTML = questionTemplate
                        .replace('%answer%', answerText)
                        .replace('%number%', answerNumber);

        // вставляем ответ на сайт
        listContainer.innerHTML += answerHTML;

        // после каждого цикла, увеличиваем номер ответа (answerNumber);
        answerNumber++;
        
    }
}
showQuestion();

// правильно ли ответил пользователь
function checkAnswer() {

    // проверяем нажата ли клавиша
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');


    // если ответ не выбран - выходим из ф.
    if (!checkedRadio){
        submitBtn.blur();
        return;
    }

    // узнаем номер ответа пользователя - переведем значение (строку) в число
    const userAnswer = parseInt(checkedRadio.value);


    // проверяем ответ! если правильно - увеличим счет
    questions[questionIndex]['correct']

    if (userAnswer === questions[questionIndex]['correct']){   // строгое сравнение, так как тип приведен к одному
        score++;
    }
    console.log('score =', score);


    // последний ли был вопрос
    // если индекс массива не равен последнему, то отображаем следующий эл.
    // у нас отчистится вся зона и ф шоуквесшон отобразится по новой но уже с новым индексом, потому что мы его увелич на 1
    if ( questionIndex !== questions.length - 1 ){
        console.log('это не последний вопрос');

        questionIndex++;
        clearPage();
        showQuestion();

    }else {
        console.log('это последний вопрос');
        
        clearPage();
        showResults();
    }
}


// показываем результат в зависимости от кол-ва прав-ых ответов
function showResults () {
    console.log(score);

    const resultsTemplate = `
        <h2 class="title">%title%</h2>
        <h3 class="summary">%message%</h3>
        <p class="result">%result%</p>
    `;

    // let - потому что переменная будет меняться
    let title, message;


    // варианты заголовков
    if (score === questions.length) {

        title = `Поздравляем!!!!`;
        message = `Вы ответили верно на ВСЕ вопросы`;

    }else if ((score * 100) / questions.length >= 50) {
        
        title = `Неплохой результат!!`;
        message = `Вы ответили верно на половину вопросов`;

    }else {

        title = `Строит постараться!!`;
        message = `Пока у вас меньше половины правильных ответов`;

    }

    // Результат
    let result = `${score} из ${questions.length}`;

    // Финальный ответ. Подставляем значения

    const finalMessage = resultsTemplate
                                .replace('%title%', title)
                                .replace('%message%', message)
                                .replace('%result%', result)

    //  выводим на страницу
    headerContainer.innerHTML = finalMessage;    
    

    //после окончания меняем кнопку и начинаем квиз заново
    // снимем активн состояние с кнопки
    submitBtn.blur();
    submitBtn.innerHTML = 'Начать Заново';

    // начинаем все заново
    // пишем ф так как он сразу запустится при нажатии
    submitBtn.onclick = () => history.go();

}

// нажимаем и проверяем правильность
submitBtn.onclick = checkAnswer;
