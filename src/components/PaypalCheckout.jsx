//import { CLIENT_ID } from '../../Config/config.jsx'
import React, { useState, useEffect, useContext } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router";
import { SEARCH_PAGE } from "../routes/Url";
import { productContext } from "../firebase models/ProductContext";
import { CHAT } from "../routes/Url";
import { addOrderToUserHistory, addPurchased, reduceAvailableQuantity, searchChat, setChats } from "../firebase models/user-service";
import { addNewHistory } from "../firebase models/user-service";
import { useUser } from "../firebase models/userContext";


export function PaypalCheckout({price}) {
    const selectProduct = useContext(productContext);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const navigate = useNavigate();
    const { user, isLoading } = useUser();

    // creates a paypal order
    const createOrder = (data, actions) => {
        console.log(selectProduct.finalPrice);
        console.log("Precio " + price);
        return actions.order.create({
            purchase_units: [
                {
                    description: "Compra",
                    amount: {
                        currency_code: "USD",
                        value: selectProduct.finalPrice,
                    },
                },
            ],
        }).then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    // check Approval
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
    };

    const setChat = async () => {
        const combinedID =
          user?.uid > selectProduct.selectedProduct.supplierId
            ? user?.uid + selectProduct.selectedProduct.supplierId
            : selectProduct.selectedProduct.supplierId + user?.uid;
        const res = await searchChat(combinedID);
        // try{
        if (!res.exists()) {
          //crea el chat
          await setChats(combinedID, user, selectProduct.selectedProduct);
        }
      };
    useEffect(() => {
        if (success) {
            reduceAvailableQuantity(selectProduct.selectedProduct, selectProduct.quantity)
            const newData = {
                "id": orderID,
                "price": selectProduct.finalPrice,
                "productName": selectProduct.selectedProduct.name,
                "category": selectProduct.selectedProduct.category,
                "quantity": selectProduct.quantity,
                "supplier": selectProduct.selectedProduct.supplierName,
                "date" : new Date().toLocaleString(),
                "photo": selectProduct.selectedProduct.photos,
            }
            console.log(newData);
            addNewHistory(orderID, newData);
            addOrderToUserHistory(orderID, user);
            addPurchased(selectProduct.selectedProduct.id,user)
            setChat();
            navigate(CHAT);
        }
        
    },[success]);

    return (
    
        <div>
        {selectProduct &&
            <PayPalScriptProvider options={{ "client-id": "AY4b3NkjpyjDvNiwFBM8Zg9ka-BDgnW-l9yX82lZBrYZl4L89y9NQ2Ucbl1Nx5Ru8TNyxl6oa0Aw3Qls" }}>
            <div>
                <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={createOrder}
                    onApprove={onApprove}
                />
            </div>
        </PayPalScriptProvider>
    }
    {selectProduct == null && 
    navigate(SEARCH_PAGE)}
    </div>
        
    );
}