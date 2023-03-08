// Task 10.2
// Сверстайте кнопку, клик на которую будет выводить данные о размерах экрана с помощью alert. 

const btn = document.querySelector('.btn');

btn.addEventListener('click',() =>{
alert(`Ширина экрана: ${window.screen.width}, 
Высота экрана: ${window.screen.height}`);

})
