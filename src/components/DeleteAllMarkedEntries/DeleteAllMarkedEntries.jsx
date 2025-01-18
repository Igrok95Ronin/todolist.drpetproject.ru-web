import axios from "axios"; // Импорт axios для выполнения HTTP-запросов

const APIURL = import.meta.env.VITE_APIURL;

export async function DeleteAllMarkedEntries(setLoading) {
  try {
    setLoading(true);
    await axios.delete(`${APIURL}/deleteallmarkedentries`);
  } catch (error) {
    console.error(`Ошибка при удалении всех отмеченных записей:`, error);
  } finally {
    setLoading(false);
  }
}
