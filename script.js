/* selectors */
const addButton = document.querySelector(".add_cont");
const modalContainer = document.querySelector(".modal_cont");
const modalColorContainer = document.querySelector('.modal_color_cont');
const modalTextArea = document.querySelector("#modal_textarea");
const mainContainer = document.querySelector(".main_cont");


/* variables */
let modalVisible = true;
let modalColorArr =  modalColorContainer.children;
const uid = new ShortUniqueId({ length: 5 });

/* functions */
addButton.addEventListener("click", (e) => {
  if (modalVisible) {
    modalContainer.style.display = "none";
    modalVisible = false;
  } else {
    modalContainer.style.display = "";
    modalVisible = true;
  }
  for(let i=0;i<modalColorArr.length;i++){
    modalColorArr[i].classList.remove("selected"); 
 }
  modalColorArr[0].classList.add("selected");
});

modalColorContainer.addEventListener("click", (e)=>{
    
   /*  console.log(modalColorArr); */
    for(let i=0;i<modalColorArr.length;i++){
       modalColorArr[i].classList.remove("selected"); 
    }
    e.target.classList.add("selected");
})

modalTextArea.addEventListener("keypress" , (e)=>{
    if(e.key =="Enter"){
        
        modalContainer.style.display="none";
        
        let selectedColor ;
        for(let i=0;i<modalColorArr.length;i++){
            if(modalColorArr[i].classList.contains("selected"))
            selectedColor= modalColorArr[i].classList[1];
        
        }
        const task =modalTextArea.value;
        modalTextArea.value =""
        createTicket(selectedColor, task);
    }
})


function createTicket(selectedColor, task){
   let id = uid.rnd();
    let ticket =`
    <div class="color_bar ${selectedColor} "></div>
    <div class="ticket_id">${id}</div>
    <div class="typing_area">${task}</div>
    <div class="lock"><i class="fa-solid fa-lock"></i></div>
    `
    
const ticketContainer=  document.createElement("div");
ticketContainer.setAttribute("class" ,"ticket_cont");
ticketContainer.innerHTML=ticket;
mainContainer.appendChild(ticketContainer)


 const ticketTypingArea =ticketContainer.querySelector(".typing_area");
 const lock =ticketContainer.querySelector(".fa-solid");

 handelLock(ticketTypingArea ,lock);
}
let isLockedOpen =false;
function handelLock(ticketTypingArea , lock){
 lock.addEventListener("click" ,(e) =>{
    if(isLockedOpen){
        isLockedOpen=false;
        ticketTypingArea.setAttribute("contenteditable","true");
        lock.classList.remove("fa-lock");
        lock.classList.add("fa-lock-open");
    }else{
        isLockedOpen=true;
        ticketTypingArea.setAttribute("contenteditable","false");
        lock.classList.remove("fa-lock-open");
        lock.classList.add("fa-lock");
    }
 })
}