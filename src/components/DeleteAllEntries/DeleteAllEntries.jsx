import axios from "axios"; // Импорт axios для выполнения HTTP-запросов

const APIURL = import.meta.env.VITE_APIURL;

export async function DeleteAllEntries(setLoading) {
  try {
    setLoading(true);
    await axios.delete(`${APIURL}/deleteallentries`)
  } catch (error) {
    console.error(`Ошибка при удалении всех записей:`, error);
  } finally {
    setLoading(false);
  }
}
