const BTN1 = document.getElementById("button1");
const ADDRESS = document.getElementById("address");

//fetch('http://localhost:3000/?address=chunpara');




BTN1.addEventListener('click',(event)=>{
    event.preventDefault();
    const input = ADDRESS.value;
    console.log(input);
    fetch('http://localhost:3000/?address=' + location).then((response) => {
        console.log(response.body);
    })
})