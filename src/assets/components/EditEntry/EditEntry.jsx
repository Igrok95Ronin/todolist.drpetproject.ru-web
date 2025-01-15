import axios from "axios"; // Импорт axios для выполнения HTTP-запросов

const APIURL = import.meta.env.VITE_APIURL;

// Функция для отправки PUT-запроса на сервер для обновления состояния Completed
export async function EditEntry(id, completed, setLoading) {
  try {
    setLoading(true);
    // Отправка PUT-запроса с использованием axios
    const response = await axios.put(
      `${APIURL}/editentry/${id}`, // URL запроса с динамическим ID
      {
        modEntry: completed, // Тело запроса: новое значение поля Completed
      },
      {
        headers: {
          "Content-Type": "application/json", // Указываем, что данные в формате JSON
        },
      }
    );

    // Логируем успешный ответ от сервера
    // console.log(`Успешно обновлено: ID: ${id}, Completed: ${completed}`);
    // console.log("Ответ сервера:", response.data);
  } catch (error) {
    // Логируем ошибки в случае неудачного запроса
    console.error(`Ошибка при обновлении записи ID: ${id}:`, error);
  } finally {
    setLoading(false);
  }
}
