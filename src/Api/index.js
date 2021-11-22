export async function getProduct(searchParams) {
  const res = await fetch(
    `http://localhost:3001/apiProducts/${searchParams || ""}`
  );
  if (!res.ok) {
    throw new Error(res.status);
  }
  const data = await res.json().catch((e) => console.log(e));
  return data;
}

export async function queryProduct(nameQuery, value) {
  const res = await fetch(
    `http://localhost:3001/apiProducts/?${nameQuery}=${value}`
  );
  const data = await res.json();
  return data;
}
// fix 2 cai tren

export async function getProductUpdate(idProduct){
  const query = await fetch(`http://localhost:3001/apiProducts/product`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({                        
        idProduct
    })
  });
  const product = await query.json();
  const query2 = await fetch(
    `http://localhost:3001/apiProducts/genres `
  );
  const genres = await query2.json();
  return {product,genres};
}

export async function login(name, pass) {
  const res = await fetch("http://localhost:3001/apiTaikhoan/login", {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            credentials: 'include',
                            body: JSON.stringify({                        
                                name,
                                pass
                            }),
                          });
  return res;
}
export async function signup(name,pass,fullname){
  const res = await fetch("http://localhost:3001/apiTaikhoan/signup",{
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                pass,
                                fullname
                            }),
                          });
  return res;           
           
}
export async function logout(name,pass){
  const res = await fetch("http://localhost:3001/apiTaiKhoan/logout",{
    method: "DELETE",
    credentials: 'include'
  })  
  return res;
}
export async function checkLogged(){
  const res = await fetch("http://localhost:3001/apiTaiKhoan/checklogged",{
    credentials: 'include'
  });
  const data = await res.json();
  return data;
}
export async function validationName(name){
  const res = await fetch("http://localhost:3001/apiTaiKhoan/validationName",{
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name
                            }),
                          });
  return res.status;
}
export async function GetInfor({username}){
  const res = await fetch("http://localhost:3001/apiTaiKhoan/GetInfor",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
        username
    }),
    credentials: 'include'
  })
  return res;
}
export async function addCart(username,idsp,quantity){
    const res = await fetch("http://localhost:3001/apiProducts/addCart",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        idsp,
        quantity
      }),
      credentials: 'include'
    })
    return res;
}
export async function getCart(username){
  const res = await fetch("http://localhost:3001/apiProducts/getCart",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
    credentials: 'include'
  })
  return res;
}
export async function getLengthCart(username){
  const res = await fetch("http://localhost:3001/apiProducts/getLengthCart",{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
    }),
    credentials: 'include'
  })
  return res;
}
export async function updateQtyCart(idsp,quantity,username){
  const res = await fetch("http://localhost:3001/apiProducts/updateQty",{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idsp,
      username,
      quantity
    }),
    credentials: 'include'
  })
  return res;
}
export async function deleteItemCart( username,idsp){
  const res = await fetch("http://localhost:3001/apiProducts/deleteItem",{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      idsp
    }),
    credentials: 'include'
  })
  return res;
}
export async function deleteItemsCart(listItem){
  const res = await fetch("http://localhost:3001/apiProducts/deleteItems",{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      listItem
    }),
    credentials: 'include'
  })
  return res;
}
export async function updateInformationUser(username,value,column){
  const res = await fetch("http://localhost:3001/apiTaiKhoan/updateInformationUser",{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      value,
      column
    }),
    credentials: 'include'
  })
}
export async function updateAvatar(formData){
  const res = fetch("http://localhost:3001/apiTaiKhoan/updateAvatar",{
    method: "POST",
    body: formData,
    credentials: 'include'
  })
  return res;
}