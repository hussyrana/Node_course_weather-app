const form = document.querySelector('form');
const input = document.querySelector('input');
const pLocation = document.querySelector('#message-1');
const pForecast = document.querySelector('#message-2');
form.addEventListener('submit', (e)=>{
 e.preventDefault();
 pLocation.textContent = 'Loading...';
 const location  = input.value;
 fetch('/weather?address='+location).then(res=>{
    res.json().then(data=>{
        if(data.error){
            pLocation.textContent=data.error;
        }else{
            pLocation.textContent = data.location;
            pForecast.textContent = data.forecast;
        }
    })
});
})
