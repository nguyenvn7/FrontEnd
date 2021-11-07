export function formatPrice(price) {
    return (('' + price).replace(/(\d)(?=(?:\d{3})+(?:\.|$))/g,(m,p)=>
           {
             return p+','
           })
     );
}
