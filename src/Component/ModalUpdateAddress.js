import { useEffect, useState } from "react";
import { getAds } from "../Api";

function UpdateAddress({ setModal, iddc, handle }) {
  const [state, setState] = useState({
    name: '',
    sdt: '',
    city: {
      nameCity: '',
      idCity: '',
    },
    district: {
      nameDistrict: '',
      idDistrict: '',
    },
    ward: {
      nameWard: '',
      idWard: '',
    },
  });
  const [cities, setCities] = useState();
  const [districts, setDistricts] = useState();
  const [wards, setWards] = useState();
  const [address, setAddress] = useState({
    type: '',
    code: ''
  })
  const [check, setCheck] = useState();
  const [checkSDT, setCheckSDT] = useState()
  // can fix lai cach lay giu lieu dia chi 64tinh 

  useEffect(() => {
    if(!state?.username){
        getAds(iddc)
      .then((data) => data.json())
      .then((data) => {
          data.city = data.city && JSON.parse(data.city);
          data.district = data.district && JSON.parse(data.district);
          data.ward = data.ward && JSON.parse(data.ward);

        setState(data);
        setAddress({
          type: 'default',
          code: data?.city?.idCity
        })
      })
    }
   
    if(address.type){
      switch (address.type) {
        case 'city':
          fetch(`https://provinces.open-api.vn/api/`).then(res => res.json()).then(data => setCities(data))
          break;
        case 'districts':
          fetch(`https://provinces.open-api.vn/api/p/${address.code}?depth=2`).then(res => res.json()).then(data => setDistricts(data.districts))
          break;
        case 'wards':
          fetch(`https://provinces.open-api.vn/api/d/${address.code}?depth=2`).then(res => res.json()).then(data => setWards(data.wards))
          break;
        default: 
        fetch(`https://provinces.open-api.vn/api/`).then(res => res.json())
        .then(C => {
          fetch(`https://provinces.open-api.vn/api/p/${state?.city?.idCity}?depth=2`).then(res => res.json())
          .then(D => {
            fetch(`https://provinces.open-api.vn/api/d/${state?.district?.idDistrict}?depth=2`).then(res => res.json())
            .then(W => {
              setCities(C)
              setDistricts(D.districts)
              setWards(W.wards)
            })
          })
        })
          break;
      }
    }
  }, [address.code]);


  return (
    <>
      {state?.username && (
        <div className="addAddress-wrap">
          <div className="addAddress">
            <div className="addAddress-list">
              <div className="addAddress-item">
                <label>Họ tên: </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setState({
                      ...state,
                      fullname: e.target.value,
                    })
                  }
                  value={state?.fullname}
                />
              </div>
              <div className="addAddress-item">
                <label>SDT : </label>
                <input
                  type="number"
                  onChange={(e) =>
                    setState({
                      ...state,
                      sdt: e.target.value,
                    })
                  }
                  value={state?.sdt}
                />
              </div>
              <div className="addAddress-item">
                <label>Địa Chỉ : </label>
                <select onChange={(e) => {
                  const obj = JSON.parse(e.target.value);
                  setAddress({
                    type: 'districts',
                    code: obj.idCity
                  });
                  setState({
                    ...state,
                    city: obj
                  })
                }}
                value={`{"nameCity": "${state?.city?.nameCity}", "idCity": "${state?.city?.idCity}"}`}
                >
                  {cities?.map(value => <option key={value.code} value={`{"nameCity": "${value.name}", "idCity": "${value.code}"}`} >{value.name}</option>)}
                </select>

                <select onChange={(e) => {
                  const obj = JSON.parse(e.target.value)
                  setAddress({
                    type: 'wards',
                    code: obj.idDistrict
                  })
                  setState({
                    ...state,
                    district: obj
                  })
                }}
                  value={`{"nameDistrict": "${state?.district?.nameDistrict}", "idDistrict": "${state?.district?.idDistrict}"}`}
                  >
                  {districts?.map(value => <option key={value.code} value={`{"nameDistrict": "${value.name}", "idDistrict": "${value.code}"}`}  >{value.name}</option>)}
                </select>

                <select onChange={(e) => {
                  const obj = JSON.parse(e.target.value)
                  setState({
                    ...state,
                    ward: obj
                  })
                }}
                value={`{"nameWard": "${state?.ward?.nameWard}", "idWard": "${state?.ward?.idWard}"}`}
                >
                  {wards?.map(value => <option key={value.code} value={`{"nameWard": "${value.name}", "idWard": "${value.code}"}`}  >{value.name}</option>)}
                </select>

              </div>

              {state?.state === "0" && (
                <div className="addAddress-item state">
                  <label>Địa Chỉ Mặc Định : </label>
                  <input
                    type="checkbox"
                    onChange={(e) => setCheck((e.target.checked && "1") || "0")}
                  />
                </div>
              )}
            </div>
            <div className="addAddress-btn">
              <button
                className="u"
                onClick={() => {
                  handle({
                    ...state,
                    state: check,
                  });
                }}
              >
                Cập Nhật
              </button>
              <button className="c" onClick={() => setModal(false)}>
                Huỷ
              </button>
            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default UpdateAddress;
