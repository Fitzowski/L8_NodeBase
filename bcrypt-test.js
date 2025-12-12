const bcrypt = require('bcryptjs');

console.log('\n🔐 ТЕСТИРУЕМ МОДУЛЬ BCRYPT');
console.log('===========================\n');

// Массив из 13 паролей для тестирования
const passwords = [
  'password1', '123456', 'qwerty', 'admin', 'letmein',
  'welcome', 'password123', 'hello123', 'sunshine', 
  'football', 'monkey', 'abc123', 'password'
];

console.log('🔄 Шифруем 13 паролей...\n');

// Хешируем каждый пароль и замеряем время
passwords.forEach((password, index) => {
  const startTime = Date.now();
  
  // Синхронное хеширование с солью сложностью 12
  const hashedPassword = bcrypt.hashSync(password, 12);
  
  const endTime = Date.now();
  const duration = endTime - startTime;

  console.log(`Пароль ${(index + 1).toString().padStart(2, '0')}: "${password}"`);
  console.log(`   Хеш: ${hashedPassword}`);
  console.log(`   Время: ${duration}мс\n`);
});

// Проверяем верификацию
console.log('🔍 ПРОВЕРЯЕМ ВЕРИФИКАЦИЮ ПАРОЛЕЙ...\n');

const testPassword = 'password123';
const hashedTest = bcrypt.hashSync(testPassword, 12);

console.log(`Пароль: "${testPassword}"`);
console.log(`Хеш: ${hashedTest}`);

// Проверяем правильный пароль
const isMatchCorrect = bcrypt.compareSync(testPassword, hashedTest);
console.log(`✅ Проверка правильного пароля: ${isMatchCorrect}`);

// Проверяем неправильный пароль
const isMatchWrong = bcrypt.compareSync('wrongpassword', hashedTest);
console.log(`❌ Проверка неправильного пароля: ${isMatchWrong}`);

console.log('\n📊 ВЫВОД О ВРЕМЕНИ ШИФРОВАНИЯ:');
console.log('================================');
console.log('• Время шифрования каждого пароля составляет от 200 до 500 мс');
console.log('• Это связано с тем, что bcrypt использует алгоритм,');
console.log('  специально разработанный для МЕДЛЕННОЙ работы');
console.log('• Медленная работа усложняет подбор паролей brute-force');
console.log('• Сложность (salt rounds = 12) означает 2^12 итераций');
console.log('• Чем выше сложность - тем безопаснее, но дольше шифрование');