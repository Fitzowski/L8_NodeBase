// Переэкспортируем функции из нашего FS модуля
const fsModule = require('../fs');

// Дополнительные удобные функции
async function createUserStructure() {
  console.log('📁 Создаем структуру папок для пользователей...');
  
  // Создаем основную папку
  await fsModule.createDirAsync('./users');
  
  // Создаем файлы
  await fsModule.writeFileAsync('./users/names.txt', '');
  await fsModule.writeFileAsync('./users/emails.txt', '');
  
  console.log('✅ Структура пользователей создана');
  return true;
}

async function saveUsersData(users) {
  try {
    console.log('💾 Сохраняем данные пользователей...');
    
    // Извлекаем имена и emails
    const names = users.map(user => user.name).join('\n');
    const emails = users.map(user => user.email).join('\n');
    
    // Записываем в файлы
    await fsModule.writeFileAsync('./users/names.txt', names);
    await fsModule.writeFileAsync('./users/emails.txt', emails);
    
    console.log(`✅ Сохранено ${users.length} пользователей`);
    return true;
  } catch (error) {
    console.error('❌ Ошибка сохранения данных:', error.message);
    return false;
  }
}

// Экспортируем всё
module.exports = {
  // Функции из FS модуля
  ...fsModule,
  
  // Наши новые функции
  createUserStructure,
  saveUsersData
};