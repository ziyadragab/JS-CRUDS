let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let create=document.getElementById('create');
let mood='create';
let item;


function getTotal(){
       if(price.value!=''){
        let result=(+price.value+ +taxes.value+ +ads.value)- +discount.value;
        total.style.background='green';
        total.innerHTML=result;
       }
       else{
        total.innerHTML='';
        total.style.background='red';
       }
}
let dataProduct;

if(localStorage.product !=null){
    dataProduct=JSON.parse(localStorage.product);
}
else{
    dataProduct=[];
}



create.onclick=function(){
    
    let newProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
   
  
    if(title.value !='' && price.value !='' &&category.value !='' && count.value<100){

    if(mood=='create'){
        
     
        if(count.value >1)
        {
            for (let i = 0; i < count.value; i++) {    
            dataProduct.push(newProduct);
             
            }
        }
        else{
            dataProduct.push(newProduct);
        
        }
    }else{
        dataProduct[item]=newProduct;
        create.innerHTML='CREATE';
        count.style.display='block';
    }
    
    clearData();

}
        
        localStorage.setItem('product',JSON.stringify(dataProduct));
        showData();
}


function showData(){
    getTotal();
 let table='';

    for (let i = 0; i < dataProduct.length; i++) {
         table+=`
        <tr>
          <td>${i+1} </td>
          <td>${dataProduct[i].title} </td>
          <td>${dataProduct[i].price} </td>
          <td>${dataProduct[i].taxes} </td>
         
          <td>${dataProduct[i].discount} </td>
          <td>${dataProduct[i].total}</td>
          <td>${dataProduct[i].category} </td>
          <td><button class="btn btn-outline-primary"  onclick="updateData(${i})" id="edit">Update</button></td>
          <td><button class="btn btn-outline-danger" onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
          
        `;
        
    }
    
    document.getElementById('tbody').innerHTML=table;
    let btnDeleteAll=document.getElementById('deleteAll');
  if(dataProduct.length>0){

    btnDeleteAll.innerHTML=`
    <button class="btn btn-danger mt-2" onclick="deleteALL()" id="delete">Delete ALL (${dataProduct.length})</button>
    `;
}else{
    btnDeleteAll.innerHTML=``;
}

}

showData();

function clearData(){
    title.value='';
    price.value='';
    ads.value='';
    taxes.value='';
    discount.value='';
    count.value='';
    category.value='';


}

function deleteALL(){
    dataProduct='';
    localStorage.clear();
    showData();
}

function updateData(i){
    item=i;
    title.value=dataProduct[item]['title'];
    price.value=dataProduct[item]['price'];
    taxes.value=dataProduct[item]['taxes'];
    ads.value=dataProduct[item]['ads'];
    discount.value=dataProduct[item]['discount'];
    category.value=dataProduct[item]['category'];
    total.innerHTML=dataProduct[item]['total'];
    total.style.background='green';
    create.innerHTML='UPDATE';
    mood='update';
    count.style.display='none';
    scroll({
        top:0,
        behavior:"smooth"
    })

}

function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product=JSON.stringify(dataProduct);
    showData();

}

let searchMood='Title';

function getSearchMode(id){
    let search=document.getElementById('search');

    if(id==='searchByTitle'){
        searchMood='Title';
    }
    else{
        searchMood='Category';
    }
    search.focus();
    search.placeholder="Search By "+searchMood;
    search.value='';
    showData();
}

function searchData(value){
  let table='';
  for (let i = 0; i < dataProduct.length; i++){
    if(searchMood==='Title'){
         {
            if(dataProduct[i].title.includes(value.toLowerCase())){
                    table+=`
                            <tr>
                            <td>${i+1} </td>
                            <td>${dataProduct[i].title} </td>
                            <td>${dataProduct[i].price} </td>
                            <td>${dataProduct[i].taxes} </td>
                            
                            <td>${dataProduct[i].discount} </td>
                            <td>${dataProduct[i].total}</td>
                            <td>${dataProduct[i].category} </td>
                            <td><button class="btn btn-outline-primary"  onclick="updateData(${i})" id="edit">Update</button></td>
                            <td><button class="btn btn-outline-danger" onclick="deleteData(${i})" id="delete">delete</button></td>
                            </tr>
                            
                            `;
                            
            }
            
        }
    }
    else{
        if(dataProduct[i].category.includes(value.toLowerCase())){
            table+=`
                    <tr>
                    <td>${i+1} </td>
                    <td>${dataProduct[i].title} </td>
                    <td>${dataProduct[i].price} </td>
                    <td>${dataProduct[i].taxes} </td>
                    
                    <td>${dataProduct[i].discount} </td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category} </td>
                    <td><button class="btn btn-outline-primary"  onclick="updateData(${i})" id="edit">Update</button></td>
                    <td><button class="btn btn-outline-danger" onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>
                    
                    `;
                    
    }
    
    }
}
    document.getElementById('tbody').innerHTML=table;

}


