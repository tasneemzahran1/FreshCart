import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = createContext()
export default function CartContextProvider(props) {
    const [productCount, setproductCount] = useState(0)
    const [cartID, setcartID] = useState(null)
    let headers = { token: localStorage.getItem("userToken") }
    function addProductTocart(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { productId: id }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    async function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers: { token: localStorage.getItem("userToken") } })
            .then((res) => {
                setproductCount(res.data.numOfCartItems)
                setcartID(res.data.cartId)
                return res
            })
            .catch((err) => err)
    }
    function updateCart(id, newCount) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { count: newCount }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function deleteItem(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function clearCart(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    return <cartContext.Provider value={{ addProductTocart, getLoggedUserCart, updateCart, deleteItem, clearCart, productCount, setproductCount }}>
        {props.children}
    </cartContext.Provider>
}