const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');


//function for form reloading(form ko auto submit hone se rokta hai)
form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(form.elements[0].value);

});
const getWordInfo = async (word) =>{
    try {
      
       const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];

    // resultDiv.innerHTML = `<h2>${data[0].meanings[0].definitions[0].definition}</h2>`;
     resultDiv.innerHTML = `
     <h2><strong>Word:</strong>${data[0].word}</h2>
     <p>${data[0].meanings[0].partOfSpeech}</p>
     <p><strong>Meaning:</strong>${definitions.definition === undefined ? "not found" :
     definitions.definition}</p>
     </p><strong>Example:</strong>${definitions.definition === undefined ? "not found" :
     definitions.definition}</p>
     <p><strong>Antonyms</strong></p>
     
     `;
    // alert("word:" + word);
    //for loop condition
    // fetching antonyms 
    if(definitions.antonyms.length === 0){
        resultDiv.innerHTML += `<span> "not found"</span>`;
    }
    else{
        for(let i=0; i<definitions.antonyms.length; i++){
            resultDiv.innerHTML += `<li>${definitions.antonyms[i]}</li>`
    }
        
    }


    // adding read more button

    resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">read More</a></div>`;
} 
catch (error) {
    resultDiv.innerHTML = `<p>Sorry, the word could not be found.</p>`;
}
    console.log(data);
}