import {API} from "../../backend"

export const createOrder = (userId,token,orderData) => {
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Cotent-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body:JSON.stringify({order:orderData})

    }).then((response) => {
        return response.json()
    }).catch(err => console.log(err);)
}