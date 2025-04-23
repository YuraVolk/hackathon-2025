import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

interface EnterProps {
  num?: number;
  head?: string;
  des?: string;
}

const Enter: React.FC<EnterProps> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    login: false,
    password: false,
  });
  const enter = async (login: string, password: string) => {
    const newErrors = { ...errors };
    if (login == "") {
      newErrors.login = true;
    }
    if (password == "") {
      newErrors.password = true;
    }
    if (!newErrors.login && !newErrors.password) {
      const data = { login, password };
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

      setPassword("");
      setLogin("");
    }
    setErrors(newErrors);
  };
  return (
    <Paper elevation={3} className="addVol">
      <form className="addVolForm">
        <h2>Войти</h2>
        <TextField
          fullWidth
          className="input"
          id="email"
          label="Логин"
          variant="filled"
          error={errors.login}
          helperText={errors.login ? "Введите ваш логин" : ""}
          value={login}
          onChange={(e) => {
            setLogin(e.currentTarget.value);
            setErrors({
              login: false,
              password: false,
            });
          }}
        />
        <FormControl sx={{ m: 1, width: "100%" }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password">
            {errors.password ? "Пароль неверный!" : "Пароль"}
          </InputLabel>
          <FilledInput
            error={errors.password}
            id="filled-adornment-password"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
              setErrors({
                login: false,
                password: false,
              });
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? "hide the password" : "display the password"
                  }
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Button
          className="button"
          disabled={errors.login || errors.password}
          color="secondary"
          onClick={() => {
            enter(login, password);
          }}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

export default Enter;
