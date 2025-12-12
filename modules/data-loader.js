// Модуль для загрузки данных с API
async function fetchData(url) {
  const result = {
    data: [],
    isLoading: true,
    error: null
  };

  try {
    console.log(`🔄 Загружаем данные из: ${url}`);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    result.data = await response.json();
    result.isLoading = false;
    console.log('✅ Данные успешно загружены');
    
  } catch (error) {
    result.error = error.message;
    result.isLoading = false;
    console.log('❌ Ошибка загрузки:', error.message);
  }

  return result;
}

module.exports = { fetchData };