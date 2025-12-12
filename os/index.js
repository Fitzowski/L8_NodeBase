const os = require('os');

// a) Функция вывода основной информации о ОС
function getOSInfo() {
  console.log('\n=== ИНФОРМАЦИЯ О СИСТЕМЕ ===');
  console.log('Платформа:', os.platform());
  console.log('Архитектура:', os.arch());
  console.log('Версия ОС:', os.release());
  console.log('Имя хоста:', os.hostname());
  console.log('Домашняя директория:', os.homedir());
  
  // Память
  const totalMemGB = (os.totalmem() / (1024 ** 3)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 ** 3)).toFixed(2);
  console.log('Общая память:', totalMemGB, 'GB');
  console.log('Свободная память:', freeMemGB, 'GB');
  
  // Процессор
  console.log('Процессоры:', os.cpus().length, 'ядер');
  console.log('Модель CPU:', os.cpus()[0].model);
  
  // Сеть
  console.log('Сетевые интерфейсы:');
  const networks = os.networkInterfaces();
  Object.keys(networks).forEach(interfaceName => {
    networks[interfaceName].forEach(net => {
      if (net.family === 'IPv4' && !net.internal) {
        console.log('  ', interfaceName + ':', net.address);
      }
    });
  });
}

// b) Функция проверки свободной памяти (> 4GB)
function checkMemory() {
  const freeMemGB = os.freemem() / (1024 ** 3);
  const isEnough = freeMemGB > 4;
  console.log(`\n🔍 Проверка памяти: ${freeMemGB.toFixed(2)}GB ${isEnough ? '✅ > 4GB' : '❌ < 4GB'}`);
  return isEnough;
}

// c) Функция с проверкой доступа через .env
function getOSInfoIfAllowed() {
  if (process.env.MODE === 'admin') {
    console.log('\n🔓 Доступ разрешен (режим admin)');
    getOSInfo();
  } else {
    console.log('\n🚫 Доступ запрещен. Требуется режим "admin", а у вас:', process.env.MODE);
  }
}

// Экспортируем функции для использования в других файлах
module.exports = {
  getOSInfo,
  checkMemory,
  getOSInfoIfAllowed
};