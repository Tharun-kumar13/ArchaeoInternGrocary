import React, { useContext, useEffect, useState } from 'react'
import { Firestore } from 'firebase/firestore'
import { auth, firestore } from './Firebase/Firebase';
import { collection, getDocs, addDoc, getDoc, doc, DocumentReference, query, where } from 'firebase/firestore'
import { Database, get } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { StoreContext } from '../../context/Storecon';
import { useNavigate } from 'react-router-dom';
import './user.css'
import { setDoc, updateDoc } from "firebase/firestore";


export default function User() {







    var obj = {}
    const { userId, userDetails, DBCart, DbCart } = useContext(StoreContext)


    async function add(userId) {
        const user = auth.currentUser

        const querySnapshot = await getDocs(collection(firestore, "Data"));
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            if (doc.data().Name == user.email) {
                console.log(doc.data())
                console.log("CART ITEMS : ", doc.data())
                console.log("CART ITEMS IN DB :", doc.data().cartItems)
            }

        });
    }



    add()
    //console.log(userId)
    //console.log(userDetails)


    const { cartItems, food_list, cartList, addList } = useContext(StoreContext)

    const [cartId, setCartId] = useState([])
    const [Cartitems, setCartItems] = useState({})

    /*food_list.map((items, index) => {
        if (cartItems[items._id] > 0) {
            addList(c)

        }

    })
    /* food_list.forEach(items => {
         cartId.forEach(ids => {
             if (items._id === ids) {
                 addList(items)
             }
         })
 
     });*/
    console.log(cartId, "cartList", cartItems)

    console.log("user in carts : ", cartList)


    /*
function create1(uid, username, email, password) {
    const data = collection(firestore, "Data")

    var userDetails = {
        id: uid,
        Name: username,
        email: email,
        password: password
    }
    try {
        const decref = addDoc(data, userDetails);
        console.log(decref)
        alert("Sucessly user data Saved")
    }
    catch (error) {
        alert(error)
    }
*/

    /* function createData() {
         const data = collection(firestore, "Data")
 
         var details = {
             email: userDetails.email,
             cartItems: cartList,
         }
         try {
             const docref = addDoc(data, details);
 
         }
         catch (error) {
             console.log(error)
         }
     }
     createData()
     */



    async function setdoc() {

        const frankDocRef = doc(firestore, "Data", userDetails.email);

        await setDoc(frankDocRef, {
            Name: userDetails.email,
            cartItems: cartItems,

        });

    }
    if (Object.keys(cartItems).length > 0) {
        //setdoc()
        console.log("Cart is not empty : ", cartItems)

    }
    else {
        console.log("Cart is EMpty : ", cartItems)
    }


    return (
        <div>
            <div className='user-detaills'>
                <p> User Name :<h5>{userDetails.Name}</h5></p>
                <hr></hr>
                <p> ID  :<h5>{userId}</h5></p>
                <hr></hr>
                <p>E-mail : <h5>{userDetails.email}</h5></p>
                <hr></hr>

            </div>

            <div className='history'>
                <div>
                    <h2>History</h2>
                    <div className='cart-items'></div>
                    <div className='cart-items-title'>
                        <p>items</p>
                        <p>title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Xprice</p>
                    </div>
                    <br></br>

                </div>
                {food_list.map((items, index) => {
                    if (cartList[items._id] > 0) {
                        return (
                            <div>
                                <div className='cart-items-title cart-items-items' key={items.id}>
                                    <img src={items.image} />
                                    <p>{items.name}</p>
                                    <p>${items.price}</p>
                                    <p>{cartList[items._id]}</p>
                                    <p>${items.price * cartList[items._id]} </p>
                                </div>
                                <hr></hr>
                            </div>



                        )
                    }
                }
                )}


            </div>

        </div >
    )
}
