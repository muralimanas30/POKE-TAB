const search_bar = document.getElementById("pokemon-input");
const fetch_button = document.getElementById("fetch-button");
const pokemon_details_p = document.getElementById("pk-text");
const details_frame = document.querySelector(".pokemon-detail");
const reset_button = document.getElementById("reset-button");
const copy_button = document.getElementById("copy-button");
const music = document.getElementById("music");

copy_button.style.display="none";
reset_button.style.display="none";


const form = document.getElementById("for-pokemon");
const pokemon_image = document.getElementById("pokemon-image");

form.addEventListener("submit" , (event)=>{
    event.preventDefault();
});

// details_frame.style.display="none";
let details;













async function poko_fetch(pokemon_name){

        try{
            

            const url="https://pokeapi.co/api/v2/pokemon/";
            const response = await fetch(`${url}${pokemon_name}`);
            
            console.log
            (`response status ${response.status}\nresponse ok? ${response.ok}`);
            
            if(!response.ok){
                throw new Error("COULD NOT FETCH DATA");
                
                return;
            }
            else{
                return response.json();
            }
        }
        catch(error){
            throw new Error("COULD NOT FETCH DATA")
        }
    }

async function main(){
    try{
        
        reset_button.style.display="none";
        if(search_bar.value==""){
            window.alert("PLESE ENTER POKEMON NAME")
            throw new Error("PLEASE ENTER POKEMON NAME");
        }


        reset_button.style.display="block";
        pokemon_name = search_bar.value.toLowerCase().trim();

        pokemon_details_p.innerHTML=` FETCHING DETAILS FOR A POKEMON
                                        NAMED "${pokemon_name.toUpperCase()}"
                                        <br>Please Wait 😌🙏`
        console.log(pokemon_name);
        recieved_json = await poko_fetch(pokemon_name);
        console.log(` TYPE : ${typeof recieved_json}`);
        // console.log(JSON.stringify(recieved_json,null,2));
        object_pokemon = recieved_json;
        console.log(object_pokemon);
        
        image_url = object_pokemon.sprites.front_default;
        pokemon_image.src=image_url;


        detail_setter(object_pokemon);
    
    }    
    catch(error){

        if(search_bar.value!=""){
            copy_button.style.display="none";
            reset_button.style.display="inline";
            pokemon_details_p.innerHTML=`NO POKEMON EXISTS UNDER THE
            NAME " ${search_bar.value.toUpperCase()} "`;
        }
        
        console.error(error);
    }
}



function detail_setter(object_pokemon){
    
    
    function ability_types(){
        let ability_type="";
        Array.from(object_pokemon.abilities).forEach(element=>{
            ability_type+=` ${element.ability.name} ,`
            console.log(element.ability.name);
        });
        return ability_type.slice(0,ability_type.length-1)+" .";
    }
    
    
    function pokemon_types(){
        let pokemon_type="";
        Array.from(object_pokemon.types).forEach(element => {
        pokemon_type+=` ${element.type.name} ,`         
        console.log(element.type.name);                          
       });
       console.log(pokemon_type.trim(","));


       details_frame.style.display="block";
       copy_button.style.display="block";
       reset_button.style.display="inline";
       return pokemon_type.slice(0,pokemon_type.length-1)+" .";
    }


    
    pokemon_details_p.innerHTML=
            "<br><br>NAME   : "+object_pokemon.name+
            "<br><br>TYPE   : "+pokemon_types()+
            "<br><br>ID     : "+object_pokemon.id+
            "<br><br>ABILITIES   : "+ability_types()+
            "<br><br>WEIGHT : "+object_pokemon.weight/10+" Kgs"+
            "<br><br>HEIGHT : "+object_pokemon.height/10+" m";

            
    pokemon_details_p.innerHTML=pokemon_details_p.innerHTML.toUpperCase();   
    copy_button.style.display="block";    
    reset_button.style.display="inline"; 
}
function reset_field(){
    pokemon_details_p.innerHTML=" FETCH FOR A POKEMON ";
    search_bar.value="";
    reset_button.style.display="none";
}

function copy_field(){
    navigator.clipboard.writeText(pokemon_details_p.textContent).then(() => {
        console.log('Content copied to clipboard');
        window.alert("COPIED TO CLIPBOARD");
        navigator.vibrate();
        /* Resolved - text copied to clipboard successfully */
      },() => {
        console.error('Failed to copy');
        /* Rejected - text failed to copy to the clipboard */
      });  

}