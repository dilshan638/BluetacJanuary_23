const KEYS ={
    technoligy:'technoligy',
    technoligyId:'technoligyId',

}


export const getDepartment =()=>([

    {id:'1', title:'A'},
    {id:'2', title:'B'},
    {id:'3', title:'C'},
    {id:'4', title:'D'}
])


export function insertTechnoligy(data){
    let technoligy=getAllTechnoligy();
    data['id']= generateTechnoligyId()
    technoligy.push(data)
    localStorage.setItem(KEYS.technoligy,JSON.stringify(technoligy))
}

export function updateTechnology(data){
    let technoligy=getAllTechnoligy();
   let recordIndex =technoligy.findIndex(x=>x.id==data.id);
   technoligy[recordIndex]={...data}
    localStorage.setItem(KEYS.technoligy,JSON.stringify(technoligy))
}

export function deleteTechnology(id){
    let technoligy=getAllTechnoligy();
    technoligy =technoligy.filter(x=>x.id != id)
    localStorage.setItem(KEYS.technoligy,JSON.stringify(technoligy));
}



export function generateTechnoligyId(data){
    if(localStorage.getItem(KEYS.technoligyId)==null)
    localStorage.setItem(KEYS.technoligyId,'0')
    var id= parseInt(localStorage.getItem(KEYS.technoligyId))
    localStorage.setItem(KEYS.technoligyId,(++id).toString())
    return id;
}


export function getAllTechnoligy(){
    if(localStorage.getItem(KEYS.technoligy)==null)
     localStorage.setItem(KEYS.technoligy,JSON.stringify([]))
   let technoligy= JSON.parse(localStorage.getItem(KEYS.technoligy));
   let techno=getDepartment();
   return  technoligy.map(x =>({
       ...x,
        department : techno[x.venders-1]
    }))
}

      


