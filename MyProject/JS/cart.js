// Đàm Trọng Nhân MSSV:B1910113
// ham kiem tra phan tu moi da ton tai trong gio hang chua
function isExistedInCart(item, arrCart)
{
    let myIndex = -1;
    arrCart.forEach
    ( (itemCard, index) => 
        {
            if(item.id == itemCard.id) myIndex = index;
        }
    );
    return myIndex;
}
// ---------------
function loadShopingCart()
{
    let updatedCart = []; //Chua cac mat hang hien co cua gio hang
    const selectedItems = (evt) => 
    {
        const linkClicked = evt.target;
        alert("Item-id:" + linkClicked.previousElementSibling.children[0].textContent);
        if (typeof Storage !== undefined)
        {
            let newItem =
            {
                id: linkClicked.previousElementSibling.children[0].textContent,
                name: linkClicked.previousElementSibling.children[1].textContent,
                price: linkClicked.previousElementSibling.children[2].textContent,
                quantity:1
            };


// Kiem tra gio hang, cartItems da ton tai trong localstorage chua
if ( JSON.parse ( localStorage.getItem('cartItems') ) === null )
{
    updatedCart.push(newItem);
    localStorage.setItem('cartItems',JSON.stringify(updatedCart));
    window.location.reload();
} else
{
    const updatedCart = JSON.parse(localStorage.getItem('cartItems'));
    if ( ( index = isExistedInCart(newItem, updatedCart) ) >=0 )
    {
        updatedCart[index].quantity++;
    } else
    {
        updatedCart.push(newItem);
    }
}
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    window.location.reload();
} else 
{
    alert('Local storage is not working on your browser');
}
}

const attachingEvent  = evt => evt.addEventListener('click', selectedItems);

const add2CartLinks = document.getElementsByClassName('add-cart');
let arrCartLinks=Array.from(add2CartLinks);
arrCartLinks.forEach(attachingEvent);

const shoppingCard = document.querySelector('.shopping-card');
shoppingCard.addEventListener ("click", function()
    {
        location.href="../html/showcart.html";
    }
);

if (localStorage.cartItems != undefined)
{
    const numberOrderedItems = document.querySelector (
        '.shopping-card .no-ordered-items');
        let numberOfItems = 0;
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
        custommerCart.forEach (item =>  
            {
                numberOfItems += item.quantity;
            });
        numberOrderedItems.innerHTML = numberOfItems;
} 
}

function showCart ()
{
    if (localStorage.cartItems == undefined)
    {
        alert('Your cart is empty');
        // -------------
        location.href="../html/sanpham.html";
    } else 
    {
        let custommerCart = JSON.parse(localStorage.getItem('cartItems'));

        const tblHead = document.getElementsByTagName('thead')[0];
        const tblBody = document.getElementsByTagName('tbody')[0];
        const tblHFoot = document.getElementsByTagName('tfoot')[0];

        let headColumns = bodyRows = footColumns = '';
    
        headColumns += '<tr><th>NO</th> <th>Item Id></th> <th>Item Name></th> <th>Quantity></th> <th>Item Price></th> <th>Delete></th> </tr>';
       
        tblHead.innerHTML = headColumns;
        
        vat = total = amountPaid = 0 ;
        no = 0;
    if( custommerCart[0] === null) 
    {
        bodyRows += '<tr><td colspan="5">No items found</td></tr>'
    } else
    {
        custommerCart.forEach(item =>
            {
                total += Number(item.quantity) * Number(item.price.replace(/[^0-9]/g,""));
                bodyRows += '<tr> <td>'+ ++no +'</td> <td>' + item.id + '</td> <td>' + item.name
                + '</td> <td>' + item.quantity + '</td> <td>' + formatCurrency(
                item.price.replace(/[^0-9]/g, ""))+ '</td> <td> <a href="#" onclick=deleteCart(this);>Delete</a> </td> </tr>';
            });
    } 
    tblBody.innerHTML=bodyRows;
    footColumns += '<tr> <td colspan="4">Total:</td> <td>' +formatCurrency(total)+
                    '</td> <td rowspan="3"> </td> </tr>';
    footColumns += '<tr> <td colspan="4">VAT (10%):</td> <td>' +formatCurrency(
        Math.floor(total*0.1))+'</td> </tr>';
    footColumns += '<tr> <td colspan="4">Amount paid:</td> <td>' +formatCurrency(
        Math.floor(1.1*total))+'</td> </tr>';
        tblHFoot.innerHTML = footColumns;
    }
}
function deleteCart(evt)
{
    let updatedCart=[];
    let custommerCart = JSON.parse(localStorage.getItem('cartItems'));
    custommerCart.forEach(item =>
        {
            if(item.id != evt.parentElement.parentElement.children[1].textContent)
            {
                updatedCart.push(item);
            }
        });
        localStorage.setItem('cartItems',JSON.stringify(updatedCart));
        window.location.reload();
};
// -----------------
const formatPercentage = (value, locale = "en-US") => 
{
    return new Intl.NumberFormat(locale, 
        {
            style: "percent",
            minimumFractionDigits: 0,
            maximumFractionDigits: 1
        }).format(value);
};

const formatCurrency = (amount, locale = "vi-VN") => 
{
    return new Intl.NumberFormat(locale, 
        {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0,
            maximumFractionDigits: 2 
        }).format(amount);
};

