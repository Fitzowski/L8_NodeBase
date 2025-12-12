// Модуль для сортировки строк без учета пробелов
function sortStringsIgnoreSpaces(arr) {
  if (!Array.isArray(arr)) {
    throw new Error('Входные данные должны быть массивом');
  }
  
  return arr
    .map(str => String(str)) // Преобразуем в строки
    .sort((a, b) => {
      // Убираем пробелы для сравнения
      const aClean = a.replace(/\s/g, '');
      const bClean = b.replace(/\s/g, '');
      return aClean.localeCompare(bClean);
    });
}

// Дополнительная функция для сортировки по длине
function sortByLength(arr) {
  return arr.sort((a, b) => a.length - b.length);
}

module.exports = {
  sortStringsIgnoreSpaces,
  sortByLength
};