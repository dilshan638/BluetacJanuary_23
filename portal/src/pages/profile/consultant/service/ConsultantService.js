

//Certification

const KEYS ={
    consultant:'consultant',
    consultantId:'consultantId',

    certification:'certification',
    certificationId:'certificationId',

    employment:'employment',
    employmentId:'employmentId',

    education:'education',
    educationId:'educationId',

    language: 'language',
    languageId: 'languageId',

    yourIdentity:'yourIdentity',
    yourIdentityId:'yourIdentityId'

}



export function insertCertification(data){
    let consultant=getAllCertification();
    data['id']= generateCertificationId()
    consultant.push(data)
    localStorage.setItem(KEYS.consultant,JSON.stringify(consultant))
}

export function updateCertification(data){
    let consultant=getAllCertification();
   let recordIndex =consultant.findIndex(x=>x.id==data.id);
   consultant[recordIndex]={...data}
    localStorage.setItem(KEYS.consultant,JSON.stringify(consultant))
}

export function deleteCertification(id){
    let consultant=getAllCertification();
    consultant =consultant.filter(x=>x.id != id)
    localStorage.setItem(KEYS.consultant,JSON.stringify(consultant));
}


export function generateCertificationId(data){
    if(localStorage.getItem(KEYS.consultantId)==null)
    localStorage.setItem(KEYS.consultantId,'0')
    var id= parseInt(localStorage.getItem(KEYS.consultantId))
    localStorage.setItem(KEYS.consultantId,(++id).toString())
    return id;
}


export function getAllCertification(){
    if(localStorage.getItem(KEYS.consultant)==null)
     localStorage.setItem(KEYS.consultant,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.consultant));
 
}


//Employment

export function insertEmployment(data){
    let employment=getAllEmployment();
    data['id']= generateEmploymentId()
    employment.push(data)
    localStorage.setItem(KEYS.employment,JSON.stringify(employment))
}

export function updateEmployment(data){
    let employment=getAllEmployment();
   let recordIndex =employment.findIndex(x=>x.id==data.id);
   employment[recordIndex]={...data}
    localStorage.setItem(KEYS.employment,JSON.stringify(employment))
}

export function deleteEmployment(id){
    let employment=getAllEmployment();
    employment =employment.filter(x=>x.id != id)
    localStorage.setItem(KEYS.employment,JSON.stringify(employment));
}


export function generateEmploymentId(data){
    if(localStorage.getItem(KEYS.employmentId)==null)
    localStorage.setItem(KEYS.employmentId,'0')
    var id= parseInt(localStorage.getItem(KEYS.employmentId))
    localStorage.setItem(KEYS.employmentId,(++id).toString())
    return id;
}


export function getAllEmployment(){
    if(localStorage.getItem(KEYS.employment)==null)
     localStorage.setItem(KEYS.employment,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employment));
 
}


//Education

export function insertEducation(data){
    let education=getAllEducation();
    data['id']= generateEducationId()
    education.push(data)
    localStorage.setItem(KEYS.education,JSON.stringify(education))
}

export function updateEducation(data){
    let education=getAllEducation();
   let recordIndex =education.findIndex(x=>x.id==data.id);
   education[recordIndex]={...data}
    localStorage.setItem(KEYS.education,JSON.stringify(education))
}

export function deleteEducation(id){
    let education=getAllEducation();
    education =education.filter(x=>x.id != id)
    localStorage.setItem(KEYS.education,JSON.stringify(education));
}


export function generateEducationId(data){
    if(localStorage.getItem(KEYS.educationId)==null)
    localStorage.setItem(KEYS.educationId,'0')
    var id= parseInt(localStorage.getItem(KEYS.educationId))
    localStorage.setItem(KEYS.educationId,(++id).toString())
    return id;
}


export function getAllEducation(){
    if(localStorage.getItem(KEYS.education)==null)
     localStorage.setItem(KEYS.education,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.education));
 
}

//Language

 
export function insertLanguage(data){
    let language=getAllLanguage();
    data['id']= generateLanguageId()
    language.push(data)
    localStorage.setItem(KEYS.language,JSON.stringify(language))
}

export function updateLanguage(data){
    let language=getAllLanguage();
   let recordIndex =language.findIndex(x=>x.id==data.id);
   language[recordIndex]={...data}
    localStorage.setItem(KEYS.language,JSON.stringify(language))
}

export function deleteLanguage(id){
    let language=getAllLanguage();
    language =language.filter(x=>x.id != id)
    localStorage.setItem(KEYS.language,JSON.stringify(language));
}


export function generateLanguageId(data){
    if(localStorage.getItem(KEYS.languageId)==null)
    localStorage.setItem(KEYS.languageId,'0')
    var id= parseInt(localStorage.getItem(KEYS.languageId))
    localStorage.setItem(KEYS.languageId,(++id).toString())
    return id;
}


export function getAllLanguage(){
    if(localStorage.getItem(KEYS.language)==null)
     localStorage.setItem(KEYS.language,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.language));
 
}


//Your Identity

 
export function insertYourIdentity(data){
    let yourIdentity=getAllYourIdentity();
    data['id']= generateYourIdentityId()
    yourIdentity.push(data)
    localStorage.setItem(KEYS.yourIdentity,JSON.stringify(yourIdentity))
}

export function updateYourIdentity(data){
    let yourIdentity=getAllYourIdentity();
   let recordIndex =yourIdentity.findIndex(x=>x.id==data.id);
   yourIdentity[recordIndex]={...data}
    localStorage.setItem(KEYS.yourIdentity,JSON.stringify(yourIdentity))
}

export function deleteYourIdentity(id){
    let yourIdentity=getAllYourIdentity();
    yourIdentity =yourIdentity.filter(x=>x.id != id)
    localStorage.setItem(KEYS.yourIdentity,JSON.stringify(yourIdentity));
}


export function generateYourIdentityId(data){
    if(localStorage.getItem(KEYS.yourIdentityId)==null)
    localStorage.setItem(KEYS.yourIdentityId,'0')
    var id= parseInt(localStorage.getItem(KEYS.yourIdentityId))
    localStorage.setItem(KEYS.yourIdentityId,(++id).toString())
    return id;
}


export function getAllYourIdentity(){
    if(localStorage.getItem(KEYS.yourIdentity)==null)
     localStorage.setItem(KEYS.yourIdentity,JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.yourIdentity));
 
}

