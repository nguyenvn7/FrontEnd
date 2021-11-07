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
                            body: JSON.stringify({                        
                                name,
                                pass
                            }),
                          });
  return res;
}
export async function signup(name,pass){
  // const res = await fetch("http://localhost:3001/apiTaikhoan/signup",{
  //                           method: "POST",
  //                           headers: {
  //                             "Content-Type": "application/json",
  //                           },
  //                           body: JSON.stringify({
  //                               name,
  //                               pass
  //                           }),
  //                         });
  // const res = await fetch("http://localhost:3001/apiTaiKhoan/api/session",{
  //      method: 'POST',
  //      'credentials': 'include'
  // }).then(res => res.text()).then(data => console.log(data))
  const res1 = await fetch("http://localhost:3001/get/session",{
    'credentials': 'include'
  }).then(res => res.text()).then(data => console.log(data))
  // return res;                          
}
export async function validationName(name){
  const res = await fetch("http://localhost:3001/apiTaikhoan/validationName",{
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
