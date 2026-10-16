let menu_icon=document.querySelector(".fa-bars");
let side_list=document.querySelector(".side-list");
let menu_item=document.querySelectorAll(".list-item");
let dashboard=document.querySelector(".dashboard");
let dashboard_title=document.querySelector(".dashboard h1");


let view_btn=document.querySelector(".view-btn");
let description=document.querySelector(".description");

let add_note=document.querySelector(".add-btn");
let model_layout=document.querySelector(".model-layout");

let close=document.querySelector(".fa-file-circle-xmark");

let form=document.querySelector(".form");
let preview_notes=document.querySelector(".preview-notes");

let card_details=[];

let categoryLogo={
    Study:"🎓",
    Work:"💼",
    Personal:"✨"
}

let edit_btn=document.querySelector(".edit-btn");

let editId=null;


// menu icon hide and show
menu_icon.addEventListener("click", function(){
    side_list.classList.toggle("show");
});

// page render based on the list item
menu_item.forEach((item)=>{
    item.addEventListener("click", function(){
        for(let i of menu_item){
            i.classList.remove("active");
        }
        item.classList.add("active");
        // 
        // render(item.textContent);

        let selectedCategory=item.textContent.trim()
            .replace("📜", "")
            .replace("🎓", "")
            .replace("💼", "")
            .replace("✨", "");
        console.log("choosed:", selectedCategory);
        dashboard_title.textContent=`Note List- ${item.textContent}`;
        
        render(selectedCategory);
    });
});

//card description expand
// view_btn.addEventListener("click", function(){
//     description.classList.toggle("show");
// });

//add note click event
add_note.addEventListener("click", function (){
    model_layout.style.display = 'flex';
});
//close the form
close.addEventListener("click", function(){
    model_layout.style.display="none";
});

// Get the input via form
// form.addEventListener("submit", function(e){
//     e.preventDefault();
//     let category=e.target.category.value;
//     let priority=e.target.priority.value;
//     let title=e.target.title.value;

//     let description=e.target.description.value;
//     console.log(category);
//     console.log(priority);
//     console.log(title);
//     console.log(description);

//     addNote(category,priority,title,description)

//     e.target.category.value="";
//     e.target.priority.value="";
//     e.target.title.value="";
//     e.target.description.value="";
// });


// function addNote(category,priority,title,description){
// let dummyCard = preview_notes.querySelector(".notes-card").outerHTML;

//   preview_notes.innerHTML = dummyCard;

//     preview_notes.innerHTML +=`
//         <div class="notes-card">

//             <div class="card-top">
//                 <span class="category">${category}</span>
//                 <span class="priority ${priority}">${priority}</span>
//             </div>

//             <h2>${title}</h2>

//             <p class="description">${description}</p>

//             <button class="view-btn">View</button>

//         </div>
//     `;
// }

form.addEventListener("submit", function(e){
    e.preventDefault();
    let id=e.target.id.value;
    let category=e.target.category.value;
    let priority=e.target.priority.value;
    let title=e.target.title.value;
    let description=e.target.description.value;

    if(editId !== null){
        let detail=card_details.find((item) => item.id==editId);
        detail.category=category;
        detail.priority=priority;
        detail.title=title;
        detail.description=description
    }
    else{
        card_details.push({
        id:id,
        category:category,
        priority:priority,
        title:title,
        description:description
    });
    }

    
    localStorage.setItem("cards",JSON.stringify(card_details));
    render();

    e.target.id.value="";
    e.target.category.value="";
    e.target.priority.value="";
    e.target.title.value="";
    e.target.description.value="";

});

function render(selectedCategory="All"){
    let dummyCard = preview_notes.querySelector(".notes-card").outerHTML;
    preview_notes.innerHTML = dummyCard;
    
    card_details=JSON.parse(localStorage.getItem("cards"))||[];
    
     
    // filter card based on the list

        let filtercards=card_details.filter((detail) =>{
            if(selectedCategory =="All"){
                return true;
            }
            return detail.category === selectedCategory;
        });

        filtercards.forEach((detail)=>{

            let logo=categoryLogo[detail.category];

             preview_notes.innerHTML +=`
         <div class="notes-card">

            <div class="card-top">
                 <span class="category">${logo}${detail.category}</span>
                 <span class="unique">ID:${detail.id}</span>
                <span class="priority ${detail.priority}">${detail.priority}</span>
            </div>

             <h2>${detail.title}</h2>

            <p class="description">${detail.description}</p>

            <div class="fun-btn">
                <button class="view-btn">View</button>
                <button class="edit-btn">Edit</button>
            </div>

        </div>
     `;
        });
}
render();

//after dom interaction implement view button hide and show logic then edit logic

preview_notes.addEventListener("click", function(e){

    if(e.target.classList.contains("view-btn")){
        let card=e.target.parentElement.parentElement;
        console.log(card);
        
        let des=card.querySelector(".description");
        console.log(des);
        
        des.classList.toggle("show");
    }

    if(e.target.classList.contains("edit-btn")){

        let card=e.target.parentElement.parentElement;
        let id=card.querySelector(".unique").textContent.replace("ID:","").trim();
        console.log("Edit ID:", id);
        console.log(card_details);
        
        let detail= card_details.find((item)=>item.id == id);
        console.log(detail);

        if(detail){
            editId=detail.id;
            form.id.value=detail.id;
            form.category.value=detail.category;
            form.priority.value=detail.priority;
            form.title.value=detail.title;
            form.description.value=detail.description;

            model_layout.style.display="flex";
        }
        
    }
});


