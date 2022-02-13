const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const todos = JSON.parse(localStorage.getItem("todos"));  //localStorageのデータ

if(todos) {
  todos.forEach(todo => {
    add(todo);
  })
}

//eventという種類のデータの受け取り
form.addEventListener("submit", function(event) {  //enter => submit
  event.preventDefault(); //addEventListenerのリロードメソッドを削除
  add();
});

function add(todo) {
  let todoText = input.value;

  if(todo){
    todoText = todo;
  }

  if(todoText){  //空文字falseは実行されない
    const li = document.createElement("li");  //liを作る
    li.innerText = todoText;
    li.classList.add("list-group-item");
    li.addEventListener("contextmenu", function(event) {  //削除　contextmenu == 右クリック
      event.preventDefault();  //メニューバーのブロック
      li.remove();
      saveData();
    })
    ul.appendChild(li);
    input.value = "";  //毎回inputを空にする
    saveData();
  }

  //リロード後のリストデータをブラウザに保存する(localstorage)
  function saveData() {
    const lists = document.querySelectorAll("li");
    let todos = [];
    lists.forEach(list => {
      // console.log(list.innerText);
      todos.push(list.innerText);
    })
    localStorage.setItem("todos", JSON.stringify(todos));  //application >> Strage
  }

}