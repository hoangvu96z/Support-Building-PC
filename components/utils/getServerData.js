export async function getData(address) {
    try {
        let response = await fetch(address);
        let responseJson = await response.json();
        // console.log(responseJson);
        // let stringJson = JSON.stringify(responseJson)  // chuyen JSON thanh string
        return responseJson.Model;
    } catch (error) {
        console.log(error);
    }
}

export async function getData2(address) {
    try {
        let response = await fetch(address);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

export function convertObjectToArray(object) {
    let index = 0;
    let array = []
    while(index < object.length) {
        array.push(object[index]);
      index++;
    }
    return array;
}

// export function Test() {
    
//     return 'RA0004';
// }


export function postData(sotien, linhkien, macpu, magpu, maram, mamain) {

    let test='';
    try {
        const baseURL = "http://doancn.azurewebsites.net/api/calculate/update";

    let serviceUrl =`${baseURL}/${sotien}/${linhkien}`;
      // kiem tra o day  
    return fetch(serviceUrl,{
                method: "POST",          
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
            body: JSON.stringify({
                MaCPU: macpu,
                MaGPU: magpu,
                MaRam: maram,
                MaMain: mamain,
            })
      
    })
        //   .then(response => alert(response.json()))
          .then(response => response.json())
          .then(response => {test= response[0]; 
            return test;
        });
            
            
            
    } catch (error) {
        console.log(error);
    }

    

}

