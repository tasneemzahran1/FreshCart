import axios from "axios";
import { createContext } from "react";
export let wishlistContext = createContext()
export default function WishlistContextProvider(props) {
    let headers = { token: localStorage.getItem("userToken") }
    function addToList(id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: id }, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function getLoggedUserWishlist() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    function deleteFromList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            .then((res) => res)
            .catch((err) => err)
    }
    
    return <wishlistContext.Provider value={{ addToList, getLoggedUserWishlist, deleteFromList }}>
        {props.children}
    </wishlistContext.Provider>
}