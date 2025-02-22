import axios from "axios"; // Импорт axios для выполнения HTTP-запросов

const APIURL = import.meta.env.VITE_APIURL;

// Функция для отправки PUT-запроса на сервер для обновления состояния Completed
export async function MarkCompletedEntry(id, completed) {
  try {
    // Отправка PUT-запроса с использованием axios
    const response = await axios.put(
      `${APIURL}/markcompletedentry/${id}`, // URL запроса с динамическим ID
      {
        check: completed, // Тело запроса: новое значение поля Completed
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
  }
}
