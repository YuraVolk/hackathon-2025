import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface SignProps {
  num?: number;
  head?: string;
  des?: string;
}

const Sign: React.FC<SignProps> = (props) => {
  const { num, head, des } = props;
  const [fio, setFio] = useState<string>("");
  const [inn, setInn] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birth_date, setBirthDate] = useState<Dayjs | null>(null);
  const [errors, setErrors] = useState({
    fio: false,
    inn: false,
    phone_number: false,
    email: false,
    birth_date: false,
  });

  const send = async (
    fio: string,
    inn: string,
    phone_number: string,
    email: string,
    birth_date: Dayjs | null
  ) => {
    const newErrors = { ...errors };
    if (fio == "") {
      newErrors.fio = true;
    }
    if (inn == "" || inn.length != 12) {
      newErrors.inn = true;
    }
    if (phone_number == "") {
      newErrors.phone_number = true;
    }
    if (email == "") {
      newErrors.email = true;
    }
    if (birth_date == null) {
      newErrors.birth_date = true;
    }
    if (
      !newErrors.birth_date &&
      !newErrors.email &&
      !newErrors.fio &&
      !newErrors.inn &&
      !newErrors.phone_number
    ) {
      const data = { fio, inn, phone_number, email, birth_date };
      try {
        const response = fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!(await response).ok) {
          throw new Error("Ошибка при отправке данных");
        }

        const result = (await response).json();
        console.log("Успех:", result);
      } catch (error) {
        console.error("Ошибка:", error);
      }
      setFio("");
      setInn("");
      setPhoneNumber("");
      setBirthDate(null);
      setEmail("");
    }
    setErrors(newErrors);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} className="addVol">
        <form className="addVolForm">
          <h2>Регистрация Волонтера</h2>
          <label htmlFor="fio"></label>
          <TextField
            fullWidth
            className="input"
            error={errors.fio}
            helperText={errors.fio ? "Введите ваше ФИО" : ""}
            id="fio"
            label="ФИО"
            variant="filled"
            value={fio}
            onChange={(e) => {
              setFio(e.currentTarget.value);
              setErrors({
                fio: false,
                inn: false,
                phone_number: false,
                email: false,
                birth_date: false,
              });
            }}
          />
          <TextField
            fullWidth
            className="input"
            id="inn"
            label="ИНН"
            variant="filled"
            error={errors.inn}
            helperText={errors.inn ? "Введите ваш ИНН" : ""}
            value={inn}
            onChange={(e) => {
              setInn(e.currentTarget.value);
              setErrors({
                fio: false,
                inn: false,
                phone_number: false,
                email: false,
                birth_date: false,
              });
            }}
          />
          <TextField
            fullWidth
            className="input"
            id="phone_number"
            label="Номер телефона"
            variant="filled"
            error={errors.phone_number}
            helperText={errors.phone_number ? "Введите ваш номер телефона" : ""}
            value={phone_number}
            onChange={(e) => {
              setPhoneNumber(e.currentTarget.value);
              setErrors({
                fio: false,
                inn: false,
                phone_number: false,
                email: false,
                birth_date: false,
              });
            }}
          />
          <DatePicker
            label="Дата рождения"
            value={birth_date}
            onChange={(date: Dayjs | null) => {
              setBirthDate(date);
              setErrors({ ...errors, birth_date: date === null });
            }}
            slotProps={{
              openPickerIcon: { fontSize: "large" },
              openPickerButton: {
                color: errors.birth_date ? "error" : "undefined",
              },
              textField: {
                variant: "filled",
                focused: true,
                fullWidth: true,
                color: errors.birth_date ? "error" : "#1e1e1e",
              },
            }}
          />
          {errors.birth_date && (
            <div style={{ color: "red" }}>Введите вашу дату рождения</div>
          )}
          <TextField
            fullWidth
            className="input"
            id="email"
            label="Электронна почта"
            variant="filled"
            error={errors.email}
            helperText={errors.email ? "Введите вашу почту" : ""}
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
              setErrors({
                fio: false,
                inn: false,
                phone_number: false,
                email: false,
                birth_date: false,
              });
            }}
          />
          <Button
            className="button"
            disabled={
              errors.birth_date ||
              errors.email ||
              errors.fio ||
              errors.inn ||
              errors.phone_number
            }
            color="secondary"
            onClick={() => {
              send(fio, inn, phone_number, email, birth_date);
            }}
            variant="contained"
          >
            Зарегистрироваться
          </Button>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default Sign;
