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
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";

import { MarkCompletedEntry } from "../MarkCompletedEntry/MarkCompletedEntry";
import { DeleteEntry } from "../DeleteEntry/DeleteEntry";
import { EditEntry } from "../EditEntry/EditEntry";

import "./ReactVirtualizedTable.scss";

const APIURL = import.meta.env.VITE_APIURL;

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
  const [currentEdit, setCurrentEdit] = React.useState({ id: null, value: "" });

  const handleCheckboxChange = async (id, currentValue) => {
    const updatedCompleted = !currentValue; // Переключаем значение Completed
    await MarkCompletedEntry(id, updatedCompleted); // Отправляем запрос на сервер
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.ID === id ? { ...note, Completed: updatedCompleted } : note))
    );
  };

  const handlerDeleteEntry = async (id) => {
    await DeleteEntry(id, setLoading); // Удаляем запись
  };

  const handleEditChange = (id, newValue) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) => (note.ID === id ? { ...note, Note: newValue, isEditing: false } : note))
    );
  };

  const rowContent = (_index, row) => {
    const isEditing = currentEdit.id === row.ID;

    const handleInputChange = (e) => {
      setCurrentEdit((prev) => ({ ...prev, value: e.target.value })); // Обновляем только локальное состояние
    };

    const handleInputBlur = async () => {
      if (currentEdit.value.trim() !== "") {
        await EditEntry(row.ID, currentEdit.value, setLoading); // Обновляем запись

        handleEditChange(row.ID, currentEdit.value); // Сохраняем изменения
      }
      setCurrentEdit({ id: null, value: "" }); // Сбрасываем локальное состояние
    };

    const handleEditClick = () => {
      setCurrentEdit({ id: row.ID, value: row.Note }); // Включаем режим редактирования
    };

    return (
      <React.Fragment>
        <TableCell sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            {/* Чекбокс */}
            <Checkbox
              checked={row.Completed}
              onChange={() => handleCheckboxChange(row.ID, row.Completed)}
              sx={{ marginRight: "10px" }}
            />
            {/* Инпут или текст */}
            {isEditing ? (
              <input
                type="text"
                value={currentEdit.value}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                autoFocus
                style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "4px" }}
              />
            ) : (
              <span style={{ textDecoration: row.Completed ? "line-through" : "none", color: "#4a9ac0" }}>
                {row.Note}
              </span>
            )}
          </div>

          <div>
            {/* Кнопка Редактирования */}
            {!isEditing && (
              <Button sx={{ minWidth: "30px", padding: 0 }} variant="text" type="button" onClick={handleEditClick}>
                <EditIcon sx={{ fontSize: "1.2em" }} />
              </Button>
            )}
            {/* Кнопка Удалить */}
            <Button
              sx={{ minWidth: "30px", padding: 0 }}
              variant="text"
              type="button"
              onClick={() => handlerDeleteEntry(row.ID)}
            >
              <ClearIcon sx={{ fontSize: "1.3em" }} />
            </Button>
          </div>
        </TableCell>
      </React.Fragment>
    );
  };

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${APIURL}`); // Получаем список заметок с сервера
        const notesWithEditing = response.data.map((note) => ({ ...note, isEditing: false })); // Добавляем поле isEditing
        setNotes(notesWithEditing); // Устанавливаем данные в состояние
        setLoading(false); // Отключаем индикатор загрузки
      } catch (err) {
        console.error("Ошибка при получении данных:", err); // Логируем ошибку
        setError("Ошибка при загрузке заметок"); // Устанавливаем сообщение об ошибке
        setLoading(false);
      }
    };

    fetchNotes(); // Вызываем функцию загрузки заметок
  }, [loading]);

  return (
    <Paper style={{ height: 300, width: "100%", marginTop: "20px" }}>
      {loading && <div>Загрузка...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <TableVirtuoso
          className="container"
          data={notes}
          components={VirtuosoTableComponents}
          fixedHeaderContent={fixedHeaderContent}
          itemContent={rowContent}
        />
      )}
    </Paper>
  );
}
