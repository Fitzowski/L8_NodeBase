const fs = require('fs');
const fsPromises = require('fs/promises');
const path = require('path');

// ==================== СИНХРОННЫЕ ФУНКЦИИ ====================

// 1. Функция записи в файл (Синхронная)
function writeFileSync(filePath, data) {
  try {
    fs.writeFileSync(filePath, data);
    console.log(`✅ [SYNC] Файл ${filePath} успешно записан`);
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка записи файла ${filePath}:`, error.message);
    return false;
  }
}

// 2. Функция чтения из файла (Синхронная)
function readFileSync(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(`✅ [SYNC] Файл ${filePath} успешно прочитан`);
    return data;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка чтения файла ${filePath}:`, error.message);
    return null;
  }
}

// 3. Функция изменения информации в файле (Синхронная)
function updateFileSync(filePath, newData) {
  try {
    fs.writeFileSync(filePath, newData);
    console.log(`✅ [SYNC] Файл ${filePath} успешно обновлен`);
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка обновления файла ${filePath}:`, error.message);
    return false;
  }
}

// 4. Функция удаления информации из файла (Синхронная)
function clearFileSync(filePath) {
  try {
    fs.writeFileSync(filePath, '');
    console.log(`✅ [SYNC] Файл ${filePath} успешно очищен`);
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка очистки файла ${filePath}:`, error.message);
    return false;
  }
}

// 5. Функция, удаляющая весь шум из файла (Синхронная)
function cleanFileSync(filePath) {
  try {
    let data = fs.readFileSync(filePath, 'utf8');
    // Удаляем все цифры, переводим в нижний регистр
    data = data.replace(/\d/g, '').toLowerCase();
    fs.writeFileSync(filePath, data);
    console.log(`✅ [SYNC] Файл ${filePath} очищен от шума`);
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка очистки шума файла ${filePath}:`, error.message);
    return false;
  }
}

// 6. Функция копирования файла (Синхронная)
function copyFileSync(sourcePath, destPath) {
  try {
    fs.copyFileSync(sourcePath, destPath);
    console.log(`✅ [SYNC] Файл скопирован из ${sourcePath} в ${destPath}`);
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка копирования файла:`, error.message);
    return false;
  }
}

// 7. Функция создания папки (Синхронная)
function createDirSync(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ [SYNC] Папка ${dirPath} создана`);
    } else {
      console.log(`ℹ️ [SYNC] Папка ${dirPath} уже существует`);
    }
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка создания папки ${dirPath}:`, error.message);
    return false;
  }
}

// 8. Функция удаления папки (Синхронная)
function removeDirSync(dirPath) {
  try {
    if (fs.existsSync(dirPath)) {
      fs.rmdirSync(dirPath, { recursive: true });
      console.log(`✅ [SYNC] Папка ${dirPath} удалена`);
    } else {
      console.log(`ℹ️ [SYNC] Папка ${dirPath} не существует`);
    }
    return true;
  } catch (error) {
    console.error(`❌ [SYNC] Ошибка удаления папки ${dirPath}:`, error.message);
    return false;
  }
}

// 9. Функция, которая выводит пути ко всем файлам в проекте (Синхронная)
function getAllFilesSync(dirPath = __dirname, arrayOfFiles = []) {
  try {
    const files = fs.readdirSync(dirPath);
    const ignoreDirs = ['node_modules', '.git'];

    files.forEach(file => {
      const fullPath = path.join(dirPath, file);
      if (fs.statSync(fullPath).isDirectory()) {
        if (!ignoreDirs.includes(file)) {
          getAllFilesSync(fullPath, arrayOfFiles);
        }
      } else {
        arrayOfFiles.push(fullPath);
      }
    });
    return arrayOfFiles;
  } catch (error) {
    console.error('❌ [SYNC] Ошибка получения списка файлов:', error.message);
    return [];
  }
}

function printAllFilesSync() {
  const files = getAllFilesSync(process.cwd());
  console.log('\n=== ВСЕ ФАЙЛЫ В ПРОЕКТЕ ===');
  files.forEach(file => console.log('📄', file));
  console.log(`Всего файлов: ${files.length}`);
}

// 10. Функция, которая удаляет все файлы и папки в текущем проекте, за исключением служебных
function cleanProjectSync() {
  try {
    const files = fs.readdirSync(process.cwd());
    const keepFiles = ['node_modules', '.git', '.env', '.gitignore', 'package.json', 'package-lock.json'];
    
    files.forEach(file => {
      if (!keepFiles.includes(file)) {
        const fullPath = path.join(process.cwd(), file);
        if (fs.statSync(fullPath).isDirectory()) {
          fs.rmdirSync(fullPath, { recursive: true });
          console.log(`🗑️ [SYNC] Удалена папка: ${file}`);
        } else {
          fs.unlinkSync(fullPath);
          console.log(`🗑️ [SYNC] Удален файл: ${file}`);
        }
      }
    });
    console.log('✅ [SYNC] Проект очищен (кроме служебных файлов)');
    return true;
  } catch (error) {
    console.error('❌ [SYNC] Ошибка очистки проекта:', error.message);
    return false;
  }
}

// ==================== АСИНХРОННЫЕ ФУНКЦИИ ====================

// 1. Функция записи в файл (Асинхронная)
async function writeFileAsync(filePath, data) {
  try {
    await fsPromises.writeFile(filePath, data);
    console.log(`✅ [ASYNC] Файл ${filePath} успешно записан`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка записи файла ${filePath}:`, error.message);
    return false;
  }
}

// 2. Функция чтения из файла (Асинхронная)
async function readFileAsync(filePath) {
  try {
    const data = await fsPromises.readFile(filePath, 'utf8');
    console.log(`✅ [ASYNC] Файл ${filePath} успешно прочитан`);
    return data;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка чтения файла ${filePath}:`, error.message);
    return null;
  }
}

// 3. Функция изменения информации в файле (Асинхронная)
async function updateFileAsync(filePath, newData) {
  try {
    await fsPromises.writeFile(filePath, newData);
    console.log(`✅ [ASYNC] Файл ${filePath} успешно обновлен`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка обновления файла ${filePath}:`, error.message);
    return false;
  }
}

// 4. Функция удаления информации из файла (Асинхронная)
async function clearFileAsync(filePath) {
  try {
    await fsPromises.writeFile(filePath, '');
    console.log(`✅ [ASYNC] Файл ${filePath} успешно очищен`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка очистки файла ${filePath}:`, error.message);
    return false;
  }
}

// 5. Функция, удаляющая весь шум из файла (Асинхронная)
async function cleanFileAsync(filePath) {
  try {
    let data = await fsPromises.readFile(filePath, 'utf8');
    data = data.replace(/\d/g, '').toLowerCase();
    await fsPromises.writeFile(filePath, data);
    console.log(`✅ [ASYNC] Файл ${filePath} очищен от шума`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка очистки шума файла ${filePath}:`, error.message);
    return false;
  }
}

// 6. Функция копирования файла (Асинхронная)
async function copyFileAsync(sourcePath, destPath) {
  try {
    await fsPromises.copyFile(sourcePath, destPath);
    console.log(`✅ [ASYNC] Файл скопирован из ${sourcePath} в ${destPath}`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка копирования файла:`, error.message);
    return false;
  }
}

// 7. Функция создания папки (Асинхронная)
async function createDirAsync(dirPath) {
  try {
    await fsPromises.mkdir(dirPath, { recursive: true });
    console.log(`✅ [ASYNC] Папка ${dirPath} создана`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка создания папки ${dirPath}:`, error.message);
    return false;
  }
}

// 8. Функция удаления папки (Асинхронная)
async function removeDirAsync(dirPath) {
  try {
    await fsPromises.rm(dirPath, { recursive: true, force: true });
    console.log(`✅ [ASYNC] Папка ${dirPath} удалена`);
    return true;
  } catch (error) {
    console.error(`❌ [ASYNC] Ошибка удаления папки ${dirPath}:`, error.message);
    return false;
  }
}

// Экспортируем все функции
module.exports = {
  // Синхронные функции
  writeFileSync,
  readFileSync,
  updateFileSync,
  clearFileSync,
  cleanFileSync,
  copyFileSync,
  createDirSync,
  removeDirSync,
  getAllFilesSync,
  printAllFilesSync,
  cleanProjectSync,
  
  // Асинхронные функции
  writeFileAsync,
  readFileAsync,
  updateFileAsync,
  clearFileAsync,
  cleanFileAsync,
  copyFileAsync,
  createDirAsync,
  removeDirAsync
};