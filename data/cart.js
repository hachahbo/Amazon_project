export let cart =  JSON.parse(localStorage.getItem('cart'));
if(!cart)
{
    cart =[{
            pID : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 2,
            deliveryOptionId:'1'
        },
        {
            pID : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
            quantity: 1,
            deliveryOptionId:'3'
        }
    ];
}

export function saveStorage()
{
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productID)
    {

    let matchingItem;
    cart.forEach((item) =>
    {
          if(productID == item.pID)
            matchingItem = item;
    });
    if(matchingItem)
          matchingItem.quantity += 1;
      else
      {
        cart.push({
          pID : productID,
          quantity: 1,
          deliveryOptionId: '2'
        })
      }
      saveStorage();
    };
    
    export function removefromCart(productId)
    {
        const newCart = [];
        cart.forEach((cartItem) =>
        {
            if(cartItem.pID !== productId)
                {
                newCart.push(cartItem);
            }
        });
        cart = newCart;
        saveStorage();
    }
            

    
    export function updateDeliveryOption(productId, deliveryOptionId) 
    {
      let matchingItem;
      cart.forEach((item) =>
      {
            if(productId == item.pID)
              matchingItem = item;
      });
      matchingItem.deliveryOptionId =  deliveryOptionId
      saveStorage();
    }