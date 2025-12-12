console.log('🚀 ИСПОЛЬЗОВАНИЕ КАСТОМНЫХ МОДУЛЕЙ');
console.log('================================\n');

// Импортируем наши модули
const { fetchData } = require('./modules/data-loader');
const { sortStringsIgnoreSpaces } = require('./modules/sorter');
const { createUserStructure, saveUsersData } = require('./modules/file-manager');

async function main() {
  try {
    console.log('1. 📥 ЗАГРУЗКА ДАННЫХ С JSONPLACEHOLDER...');
    
    // Загружаем пользователей
    const usersResult = await fetchData('https://jsonplaceholder.typicode.com/users');
    
    if (usersResult.error) {
      throw new Error(usersResult.error);
    }
    
    console.log(`✅ Загружено ${usersResult.data.length} пользователей\n`);

    // 2. 📊 СОРТИРОВКА ДАННЫХ
    console.log('2. 📊 СОРТИРОВКА ПОЛЬЗОВАТЕЛЕЙ ПО ИМЕНАМ...');
    
    const userNames = usersResult.data.map(user => user.name);
    const sortedNames = sortStringsIgnoreSpaces(userNames);
    
    console.log('📋 Отсортированные имена:');
    sortedNames.forEach((name, index) => {
      console.log(`   ${(index + 1).toString().padStart(2, '0')}. ${name}`);
    });
    console.log('');

    // 3. 📁 СОЗДАНИЕ СТРУКТУРЫ ПАПОК
    console.log('3. 📁 СОЗДАНИЕ СТРУКТУРЫ ФАЙЛОВ...');
    
    await createUserStructure();
    
    // 4. 💾 СОХРАНЕНИЕ ДАННЫХ
    console.log('\n4. 💾 СОХРАНЕНИЕ ДАННЫХ В ФАЙЛЫ...');
    
    await saveUsersData(usersResult.data);
    
    // 5. 📖 ПРОВЕРКА СОХРАНЕННЫХ ДАННЫХ
    console.log('\n5. 📖 ПРОВЕРКА СОХРАНЕННЫХ ДАННЫХ...');
    
    const savedNames = require('fs').readFileSync('./users/names.txt', 'utf8');
    const nameCount = savedNames.split('\n').filter(name => name.trim()).length;
    
    const savedEmails = require('fs').readFileSync('./users/emails.txt', 'utf8');
    const emailCount = savedEmails.split('\n').filter(email => email.trim()).length;
    
    console.log(`✅ В names.txt сохранено: ${nameCount} имен`);
    console.log(`✅ В emails.txt сохранено: ${emailCount} email-адресов`);
    
    console.log('\n🎉 ВСЕ МОДУЛИ УСПЕШНО РАБОТАЮТ!');
    
  } catch (error) {
    console.error('❌ Ошибка в основном скрипте:', error.message);
  }
}

// Запускаем основную функцию
main();