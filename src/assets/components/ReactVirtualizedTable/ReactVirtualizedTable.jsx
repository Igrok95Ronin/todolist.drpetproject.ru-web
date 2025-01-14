import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import { TableVirtuoso } from "react-virtuoso";
import axios from "axios";

import { MarkCompletedEntry } from "../MarkCompletedEntry/MarkCompletedEntry";

// Компоненты для кастомной таблицы Virtuoso
const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => <TableContainer component={Paper} {...props} ref={ref} />),
  Table: (props) => <Table {...props} sx={{ borderCollapse: "separate", tableLayout: "fixed" }} />,
  TableHead: React.forwardRef((props, ref) => <TableHead {...props} ref={ref} />),
  TableRow,
  TableBody: React.forwardRef((props, ref) => <TableBody {...props} ref={ref} />),
};

// Фиксированный заголовок таблицы
function fixedHeaderContent() {
  return <TableRow></TableRow>; // Здесь можно определить заголовки столбцов
}

// Основной компонент таблицы
export default function ReactVirtualizedTable({ loading, setLoading }) {
  const [notes, setNotes] = React.useState([]); // Состояние для списка заметок
  const [error, setError] = React.useState(null); // Состояние для ошибок

  // Генерация содержимого строк
  function rowContent(_index, row) {
    // Обработчик изменения состояния чекбокса
    const handleCheckboxChange = async () => {
      const updatedCompleted = !row.Completed; // Переключаем значение Completed

      // Отправляем запрос на сервер для обновления
      await MarkCompletedEntry(row.ID, updatedCompleted);

      // Обновляем локальное состояние с новым значением Completed
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.ID === row.ID ? { ...note, Completed: updatedCompleted } : note))
      );
    };

    return (
      <React.Fragment>
        <TableCell>
          {/* Чекбокс для управления Completed */}
          <Checkbox checked={row.Completed} onChange={handleCheckboxChange} />
          {row.Note} {/* Текст заметки */}
        </TableCell>
      </React.Fragment>
    );
  }

  // Эффект для получения данных при загрузке компонента
  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get("http://localhost:8080"); // Получаем список заметок с сервера
        setNotes(response.data); // Устанавливаем данные в состояние
        setLoading(false); // Отключаем индикатор загрузки
      } catch (err) {
        console.error("Ошибка при получении данных:", err); // Логируем ошибку
        setError("Ошибка при загрузке заметок"); // Устанавливаем сообщение об ошибке
        setLoading(false);
      }
    };

    fetchNotes(); // Вызываем функцию загрузки заметок
  }, [loading]); // Зависимость от состояния загрузки

  return (
    <Paper style={{ height: 300, width: "100%", marginTop: "20px" }}>
      {loading && <div>Загрузка...</div>} {/* Показ индикатора загрузки */}
      {error && <div style={{ color: "red" }}>{error}</div>} {/* Показ сообщения об ошибке */}
      {!loading && !error && (
        <TableVirtuoso
          data={notes} // Передаём данные заметок в таблицу
          components={VirtuosoTableComponents} // Кастомные компоненты таблицы
          fixedHeaderContent={fixedHeaderContent} // Фиксированный заголовок
          itemContent={rowContent} // Генерация строк таблицы
        />
      )}
    </Paper>
  );
}
