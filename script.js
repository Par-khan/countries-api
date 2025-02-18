const contriesContainer = document.querySelector('.main-container')
const filterregion = document.querySelector('.filter-by-region')
const searchInput=document.querySelector('.search-box input')
const themechanger=document.querySelector('.theme-changer')
const themechangerlight=document.querySelector('.theme-changer-light')


let AllcountriesData

fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data)=>{
        rendercountries(data)
        AllcountriesData=data
    })
        

filterregion.addEventListener('change', (e) => {
    // console.log(filterregion);

    fetch(`https://restcountries.com/v3.1/region/${filterregion.value}`)

        .then((res) => res.json())
        .then(rendercountries)

})

function rendercountries(data){
    contriesContainer.innerHTML = ''
    data.forEach(country => {
        // console.log(country);
        const countrycard = document.createElement('a')
        countrycard.classList.add('container-content')
        countrycard.href = `/country.html?name=${country.name.common}`
        countrycard.innerHTML = `
         <img src="${country.flags.svg}" alt="">            
        <div class="country-data"> 
            <h3 class="title">${country.name.common}</h3>              
            <p><b>Population:</b>${country.population.toLocaleString()}</p>
            <p><b>Region:</b>${country.region}</p>
            <p><b>Capital:</b>${country.capital?.[0]}</p>
        </div>`



        contriesContainer.append(countrycard)
    });
}


searchInput.addEventListener('input',(e)=>{
    // console.log(e.target.value);
    // console.log(AllcountriesData);
   const filterCountries= AllcountriesData.filter((country)=> country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
//    console.log(filterCountries);
   rendercountries(filterCountries)
})




const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark');
    themechanger.classList.add('dark');
    themechangerlight.classList.add('dark');
} else {
    document.body.classList.remove('dark');
    themechanger.classList.remove('dark');
    themechangerlight.classList.remove('dark');
}



themechanger.addEventListener('click', (e) => {
    document.body.classList.add('dark');
    themechanger.classList.add('dark');
    themechangerlight.classList.add('dark');
    localStorage.setItem('theme', 'dark');
});

themechangerlight.addEventListener('click', (e) => {
    document.body.classList.remove('dark');
    themechanger.classList.remove('dark');
    themechangerlight.classList.remove('dark');
    localStorage.setItem('theme', 'light');
});