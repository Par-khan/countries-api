const countryName=new URLSearchParams(location.search).get('name')
const flagImage=document.querySelector('.country-details img')
const countryNameH1=document.querySelector('.country-details h1')
const NativeName=document.querySelector('.native-name')
const population=document.querySelector('.Population')
const Region=document.querySelector('.Region')
const subRegion=document.querySelector('.sub-Region')
const Capital=document.querySelector('.Capital')
const topLevelDomain=document.querySelector('.topLevelDomain')
const Currencies=document.querySelector('.Currencies')
const Language=document.querySelector('.Language')
const bordercountries=document.querySelector('.border-countries')
const themechanger=document.querySelector('.theme-changer')
const themechangerlight=document.querySelector('.theme-changer-light')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{



    // console.log(country);
    flagImage.src=country.flags.svg
    countryNameH1.innerText=country.name.common
    if(country.name.nativeName){
        NativeName.innerText=Object.values(country.name.nativeName)[0].common
    }
    else{
        NativeName.innerText=country.name.common
    }
    population.innerText=country.population.toLocaleString()
    Region.innerText=country.region
    if(country.subregion){
        subRegion.innerText=country.subregion
    }
    
    if(country.capital){
    Capital.innerText=country.capital.join(', ')
    }
    topLevelDomain.innerText=country.tld.join(', ')
    if(country.currencies){
    Currencies.innerText=Object.values(country.currencies).map((currency)=>currency.name).join(', ')
    }
    if(country.languages){
       Language.innerText=Object.values(country.languages).join(', ') 
    }

    if(country.borders){
        country.borders.forEach((border)=> {
            // console.log(border);
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res)=>res.json())
            .then(([bordercountry])=>{
                // console.log(bordercountry);
                const bordercountrytag=document.createElement('a')
                bordercountrytag.innerText=bordercountry.name.common
                bordercountrytag.href=`/country.html?name=${bordercountry.name.common}`
                // console.log(bordercountrytag);
                bordercountries.append(bordercountrytag)
            })
        });
    }
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

