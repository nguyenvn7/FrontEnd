function modalConfirm({cb,setModal,title,confirm,unConfirm}) {
    return ( 
        <section className="modalConfirm">
          <div className="modalConfirm-wrap">
              <p className="modalConfirm-tittle">{title}</p>
              <div className="modalConfirm-btn">
                  <button
                  onClick={()=>{
                    cb();
                  }}
                  className='confirm'
                  >{confirm}</button>
                  <button
                  className='unConfirm'
                  onClick={()=> setModal()}
                  >{unConfirm}</button>
              </div>
          </div>
        </section>
     );
}

export default modalConfirm;