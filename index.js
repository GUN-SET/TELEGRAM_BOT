const TelegramApi = require('node-telegram-bot-api')
const {gameOptions, againOptions} = require("./options");

const token = '5061101652:AAEv8idu7tH6OhVLe_YkHl9_4zCFSZ9Qjms'

const bot = new TelegramApi(token, {polling: true})

const chats = {};

const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен её отгадать!`)
	const randomNumber = Math.floor(Math.random() * 10)
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, `Отгадывай`, gameOptions)
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Начальное приветствие'},
		{command: '/info', description: 'Получить информацию о пользователе'},
		{command: '/game', description: 'Игра угадай цифру'},
	])
	
	bot.on('message',  async msg => {
		const text = msg.text
		const chatId = msg.chat.id
		
		if (text=== '/start') {
			return  bot.sendMessage(chatId, `Добро пожаловать, я телеграм-бот Гансет`)
			await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/0e3/159/0e315900-c335-352c-b746-124d5b940ac2/1.webp')
		}
		if (text === '/info') {
			return  bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
		}
		if (text === '/game') {
			return startGame(chatId);
		}
		return bot.sendMessage(chatId, `Я тебя не понимаю, попробуй еще раз!`)
	})
}

start()

bot.on('callback_query',  async msg => {
	const data = msg.data;
	const chatId = msg.message.chat.id;
	if (data === '/again') {
		return startGame(chatId)
	}
	if (data == chats[chatId]) {
		return await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}!`, againOptions)
	} else {
		return await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions)
	}
})