// index.js - ГЛАВНЫЙ ФАЙЛ ДЛЯ ДЕМОНСТРАЦИИ ВСЕХ МОДУЛЕЙ
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' :
                process.env.NODE_ENV === 'domain' ? '.env.domain' :
                '.env';

console.log('🔧 Загружаем файл:', envPath);
require('dotenv').config({ path: envPath });

console.log('\n🎯 ЛАБОРАТОРНАЯ РАБОТА 8 - Node.js Basics');
console.log('=========================================\n');

async function demonstrateAllModules() {
  // ==================== 1. ДАННЫЕ ИЗ .env ====================
  console.log('1. 📋 ДАННЫЕ СТУДЕНТА ИЗ .env');
  console.log('-----------------------------');
  console.log('   Имя:', process.env.FIRST_NAME);
  console.log('   Фамилия:', process.env.LAST_NAME);
  console.log('   Номер группы:', process.env.GROUP_NUMBER);
  console.log('   Номер по списку:', process.env.STUDENT_ID);
  console.log('   Режим работы:', process.env.MODE);
  console.log('✅ Раздел 1 выполнен\n');

  // ==================== 2. МОДУЛЬ OS ====================
  console.log('2. 💻 МОДУЛЬ OS');
  console.log('---------------');
  const osModule = require('./os');
  osModule.checkMemory();
  osModule.getOSInfoIfAllowed();
  console.log('✅ Раздел 2 выполнен\n');

  // ==================== 3. МОДУЛЬ FS ====================
  console.log('3. 📁 МОДУЛЬ FS');
  console.log('---------------');
  const fsModule = require('./fs');
  
  // Создаем тестовую структуру
  fsModule.createDirSync('./test-fs');
  fsModule.writeFileSync('./test-fs/example.txt', 'Hello World 123! TEST FILE 456.');
  
  // Читаем и очищаем от шума
  const content = fsModule.readFileSync('./test-fs/example.txt');
  console.log('   Исходный текст:', content);
  
  fsModule.cleanFileSync('./test-fs/example.txt');
  const cleanedContent = fsModule.readFileSync('./test-fs/example.txt');
  console.log('   После очистки:', cleanedContent);
  
  // Копируем файл
  fsModule.copyFileSync('./test-fs/example.txt', './test-fs/example-copy.txt');
  console.log('✅ Раздел 3 выполнен\n');

  // ==================== 4. МОДУЛЬ BCRYPT ====================
  console.log('4. 🔐 МОДУЛЬ BCRYPT');
  console.log('-------------------');
  const bcrypt = require('bcryptjs');
  
  const passwords = ['password1', '123456', 'qwerty'];
  console.log('   Шифруем 3 пароля:');
  
  passwords.forEach((password, index) => {
    const startTime = Date.now();
    const hashedPassword = bcrypt.hashSync(password, 12);
    const duration = Date.now() - startTime;
    
    console.log(`   Пароль ${index + 1}: "${password}" -> ${duration}мс`);
    
    // Проверяем верификацию
    const isMatch = bcrypt.compareSync(password, hashedPassword);
    console.log(`   Проверка: ${isMatch ? '✅' : '❌'}`);
  });
  console.log('✅ Раздел 4 выполнен\n');

  // ==================== 5. КАСТОМНЫЕ МОДУЛИ ====================
  console.log('5. 🧩 КАСТОМНЫЕ МОДУЛИ');
  console.log('----------------------');
  
  // Модуль сортировки
  const { sortStringsIgnoreSpaces } = require('./modules/sorter');
  const names = ['John Doe', 'Alice', 'Bob Smith'];
  const sortedNames = sortStringsIgnoreSpaces(names);
  console.log('   Сортировка строк:', names, '->', sortedNames);
  
  // Модуль файлового менеджера
  const { createUserStructure } = require('./modules/file-manager');
  await createUserStructure();
  console.log('   Структура папок создана');
  
  console.log('✅ Раздел 5 выполнен\n');

  // ==================== 6. ФИНАЛЬНЫЙ ОТЧЕТ ====================
  console.log('6. 📊 ФИНАЛЬНЫЙ ОТЧЕТ');
  console.log('---------------------');
  fsModule.printAllFilesSync();
  
  console.log('\n🎉 ВСЕ МОДУЛИ ЛАБОРАТОРНОЙ РАБОТЫ УСПЕШНО ВЫПОЛНЕНЫ!');
  console.log('✨ Проверьте папку "users" - там созданы файлы names.txt и emails.txt');
  console.log('✨ Проверьте папку "test-fs" - там тестовые файлы FS модуля');
}

// Запускаем демонстрацию
demonstrateAllModules().catch(console.error);