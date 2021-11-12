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
export async function signup(name,pass,firstname,lastname){
  const res = await fetch("http://localhost:3001/apiTaikhoan/signup",{
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                name,
                                pass,
                                firstname,
                                lastname
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
