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
import { sign } from "crypto";

interface SignProps {
  num?: number;
  head?: string;
  des?: string;
}

const Sign: React.FC<SignProps> = (props) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [name, setName] = useState<string>("");
  const [login, setLogin] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    name: false,
    login: false,
    email: false,
    password: false,
  });
  const send = async(name:string, login:string, email:string,password:string)=>{
    const newErrors = { ...errors };
    if (name == "") {
      newErrors.name = true;
    }
    if (login == "") {
      newErrors.login = true;
    }
    if (password == "") {
      newErrors.password = true;
    }
    if (email == "") {
      newErrors.email = true;
    }
    if (
      !newErrors.name &&
      !newErrors.email &&
      !newErrors.login &&
      !newErrors.password
    ) {
      const data = { name, login, email,password};
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
      setName("");
      setLogin("");
      setPassword("");
      setEmail("");
    }
    setErrors(newErrors);
  }
  return (
    <Paper elevation={3} className="addVol">
      <form className="addVolForm">
        <h2>Зарегистрировать предприятие</h2>
        <TextField
          fullWidth
          className="input"
          id="name"
          label="Наименование предприятия"
          variant="filled"
          error={errors.name}
          helperText={errors.name ? "Введите Наименование предприятия" : ""}
          value={name}
          onChange={(e) => {
            setName(e.currentTarget.value);
            setErrors({
              name: false,
              login: false,
              email: false,
              password: false,
            });
          }}
        />
        <TextField
          fullWidth
          className="input"
          id="login"
          label="Логин"
          variant="filled"
          error={errors.login}
          helperText={errors.login ? "Введите логин" : ""}
          value={login}
          onChange={(e) => {
            setLogin(e.currentTarget.value);
            setErrors({
              name: false,
              login: false,
              email: false,
              password: false,
            });
          }}
        />
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
              name: false,
              login: false,
              email: false,
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
                name: false,
                login: false,
                email: false,
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
          disabled={errors.name || errors.password || errors.email || errors.login}
          color="secondary"
          onClick={() => {
            send(name, login, email,password);
          }}
          variant="contained"
        >
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};

export default Sign;
