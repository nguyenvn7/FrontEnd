import { useEffect, useState } from "react";

function AddAddress({ setModal, handleAdd }) {
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
    type: 'city',
    code: ''
  })
  const [checkSDT, setCheckSDT] = useState()
  
  useEffect(() => {
    console.log("effect")
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
        break;
    }
  }, [address.code])


  return (
    <div className="addAddress-wrap">
      <div className="addAddress">
        <div className="addAddress-list">
          <div className="addAddress-item">
            <label>Họ tên: </label>
            <input type="text" onChange={(e) => setState({
              ...state,
              name: e.target.value
            })} />
          </div>
          <div className="addAddress-item">
            <label>SDT : </label>
            <input type="text" onChange={(e) => setState({
              ...state,
              sdt: e.target.value
            })} 
            onBlur={(e)=>{
              if(e.target.value.length !== 10 && e.target.value !== ""){
                setCheckSDT(true)
              }else setCheckSDT(false)
            }}
            />
            {checkSDT && <p className="error">Số điện thoại không hợp lệ</p>}
          </div>
          <div className="addAddress-item">
            <label>Địa Chỉ : </label>
            <select onChange={(e) => {
              const obj = JSON.parse(e.target.value)
              setAddress({
                type: 'districts',
                code: obj.idCity
              });
              setState({
                ...state,
                city: obj
              })
            }}
              defaultValue="default"
            >
              <option value="default" disabled hidden>
                Chọn Tỉnh/Thành Phố
              </option>
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
              defaultValue="default">
              {districts && <option value="default" hidden >
                Chọn Quận/Huyện
              </option>}
              {districts?.map(value => <option key={value.code} value={`{"nameDistrict": "${value.name}", "idDistrict": "${value.code}"}`}  >{value.name}</option>)}
            </select>

            <select onChange={(e) => {
              const obj = JSON.parse(e.target.value)
              setState({
                ...state,
                ward: obj
              })
            }}
              defaultValue="default"
            >
              {wards && <option value="default"  hidden>
                Chọn Xã/Phường
              </option>}
              {wards?.map(value => <option key={value.code} value={`{"nameWard": "${value.name}", "idWard": "${value.code}"}`}  >{value.name}</option>)}
            </select>

          </div>
        </div>
        <div className="addAddress-btn">
          <button className={(state.name && !checkSDT && state.city.nameCity && state.district.nameDistrict && state.ward.nameWard) && 'u' || 'u no-drop'} onClick={() => {
            if (state.name && !checkSDT && state.city.nameCity && state.district.nameDistrict && state.ward.nameWard) {
              handleAdd(state)
            }
          }} >Thêm</button>
          <button className="c" onClick={() => setModal(false)}>Huỷ</button>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
