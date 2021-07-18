const URL = 'http://localhost:8080';


    export const fetch1 = async (setToDoList) => {
        console.log("Fetching All Records");

        let response = await fetch(`${URL}/api/todo/`)
        response = await response.json()
        setToDoList(response);
    }

    export const create = async (body)=> {
        await fetch(`${URL}/api/todo`,
            {
                method: 'POST',        
                headers: {
                    'Content-Type': 'application/json',  
                },
                body: JSON.stringify(body)
            }
        )
    }

    export const update = async (id, body)=> {
        console.log("Updating a record")
        await fetch(`${URL}/api/todo/${id}`,
            {
                method: 'PUT',        
                headers: {
                    'Content-Type': 'application/json',
                    'mode': 'no-cors'
                },
                body: JSON.stringify(body)
            }
        )
    }

    export const del = async (set,setTitles, e)=> {
        const id = e.target.value;
        setTitles(undefined);
        console.log("deleting a record");

        await fetch (`${URL}/api/todo/${id}`,{method:'DELETE'})
        let response = await fetch(`${URL}/api/todo/`)
        response = await response.json()
        set(response);
    }
