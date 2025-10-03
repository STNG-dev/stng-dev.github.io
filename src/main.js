import Toastify from "toastify-js";
import * as Yup from "yup";

import "./style.css";
import "toastify-js/src/toastify.css";

const urlParams = new URLSearchParams(window.location.search);
const tid = urlParams.get("tid");
const form = document.getElementById("registrationForm");

const tidInput = document.createElement("input");
tidInput.type = "hidden";
tidInput.name = "tid";
tidInput.value = tid;
form.appendChild(tidInput);

// Схема валидации
const schema = Yup.object().shape({
  name: Yup.string()
    .required("Поле \"name\" обязательно для заполнения")
    .min(1, "Имя должно быть не короче 1 символа"),
  password: Yup.string()
    .required("Поле \"password\" обязательно для заполнения")
    .min(4, "Пароль должен содержать минимум 4 символа"),
  email: Yup.string()
    .required("Поле \"email\" обязательно для заполнения")
    .matches(
      /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/,
      "Введите корректный email"
    ),
});

form.addEventListener("submit", async (evt) => {
  let response;
  evt.preventDefault();

  // Очистка ошибок
  document.querySelectorAll(".error").forEach(el => el.textContent = "");

  // Подготовка данных для отправки
  const formData = {
    name: form.name.value.trim(),
    password: form.password.value,
    email: form.email.value.trim(),
    tid: form.tid.value,
  };

  // Валидация
  try {
    await schema.validate(formData, { abortEarly: false });
  } catch (validationError) {
    if (validationError.name === "ValidationError" && validationError.inner) {
      validationError.inner.forEach(({ path, message }) => {
        const errorEl = document.getElementById("error-" + path);
        if (errorEl) errorEl.textContent = message;
      });
    } else {
      throw validationError;
    }
    return;
  }

  // Проверка подключения к Интернет
  if (!navigator.onLine) {
    Toastify({
      text: "Нет подключения к Интернету.\nОтправка невозможна.",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right,rgb(176, 0, 21),rgb(201, 145, 125))",
      },
    }).showToast();
    return;
  }

  // Отправка данных
  try {
    response = await fetch("https://smartstng.ru/webhook/telegram-regestration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  } catch (fetchError) {
    Toastify({
      text: "Произошла ошибка отправки данных.\nСервер не отвечает",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right,rgb(176, 0, 21),rgb(201, 145, 125))",
      },
    }).showToast();
    throw fetchError;
  }

  if (response.ok) {
    window.close();
  } else {
    if (response.status === 400) {
      Toastify({
        text: "Ссылка не корректна.\nПерейдите по ссылке из Telegram",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,rgb(176, 0, 21),rgb(201, 145, 125))",
        },
      }).showToast();
    } else {
      Toastify({
        text: "Не удалось зарегистрировать.\nВозможно вы уже зарегистрированы",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
          background: "linear-gradient(to right,rgb(176, 0, 21),rgb(201, 145, 125))",
        },
      }).showToast();
    }
    throw new Error(`${response.status}: ${response.statusText}`);
  }
});
