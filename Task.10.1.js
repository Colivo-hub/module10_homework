// Task 10.1
// Сверстайте кнопку, которая будет содержать в себе icon_01 (как в примере в последнем видео). 
// При клике на кнопку иконка должна меняться на icon_02. Повторный клик меняет иконку обратно.

const btn = document.querySelector('.push-btn');

btn.addEventListener('click', (e) => {
    e.target.closest('.push-btn').classList.toggle('push_btn_toggle')

});