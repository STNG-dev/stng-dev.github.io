import "./style.css";

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
form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);
  const response = await fetch("https://smartstng.ru/webhook/telegram-regestration", {
    method: "POST",
    body: formData,
    mode: "no-cors",
  });

  console.log(response);

  if (response.ok) {
    alert("Регистрация успешна! Окно закроется автоматически.");
    window.close(); // Закрываем окно
  } else {
    alert("Ошибка регистрации. Попробуйте еще раз.");
  }
});
