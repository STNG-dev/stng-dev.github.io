import Toastify from "toastify-js";

import "./style.css";
import "toastify-js/src/toastify.css";

// Извлекаем параметры из URL
const urlParams = new URLSearchParams(window.location.search);
const tid = urlParams.get("tid");

// Добавляем скрытые поля для Telegram данных
const form = document.getElementById("registrationForm");

const tidInput = document.createElement("input");
tidInput.type = "hidden";
tidInput.name = "tid";
tidInput.value = tid;
form.appendChild(tidInput);

// Обработка отправки формы
form.addEventListener("submit", async (e) => {
  let response;
  e.preventDefault();

  const formData = new FormData(form);
  try {
    response = await fetch("https://smartstng.ru/webhook/telegram-regestration", {
      method: "POST",
      body: formData,
    });
  } catch (error) {
    Toastify({
      text: "Произошла ошибка отправки данных.\nСервер не отвечает",
      duration: 3000,
      gravity: "top",
      position: "right",
      style: {
        background: "linear-gradient(to right,rgb(176, 0, 21),rgb(201, 145, 125))",
      },
    }).showToast();
    throw error;
  }

  if (response.ok) {
    window.close(); // Закрываем окно
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
