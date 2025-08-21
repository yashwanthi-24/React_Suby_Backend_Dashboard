import React, {useState} from 'react'
import {API_URL} from '../../data/apiPath'
const AddProduct = () => {
  const [productName,setProductName] = useState("");
  const [price,setPrice] = useState("");
  const [category,setCategory] = useState([]);
  const [BestSeller,setBestSeller] = useState(false);
  const [image,setImage]= useState(null);
  const [description, setDescription]= useState(""); 
  
  const handleCategoryChange=(event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item!==value));
    }else{
      setCategory([...category,value])
    }
  }
  const handleBestSeller = (event)=>{
    const value = event.target.value == 'true'
    setBestSeller(value)
  }
  const handleImageUpload=(event)=>{
    const selectedImage=event.target.files[0];
    setImage(selectedImage)
  }

   const handleAddProduct = async(e)=>{
        e.preventDefault()
        try{  
              const loginToken = localStorage.getItem('loginToken');
              const firmId = localStorage.getItem('firmId')
              if(!loginToken || firmId){
                console.error("user not authenticated")
              }
              const formData = new FormData();
              formData.append('productName', productName);
              formData.append('price',price);
              formData.append('description',description);
              formData.append('image',image)

              category.forEach((value)=>{
                formData.append('category',value)
              })
              const response = await fetch(`${API_URL}/product/add-product/${firmId}`,{
                method:'POST',
                body: formData
              })
              const data = await response.json()

              if(response.ok){
                alert("Product added successfully")
                setProductName("");
             setPrice("");
             setCategory([]);
             setDescription("");
             setBestSeller(false);
             setImage(null); 
              }
        }catch(error){
              alert('Failed to add product'); 
        }
   }
  return (
    <div className = 'firmSection'>
        <form className="tableForm" onSubmit={handleAddProduct}>
            <h3>Product Name</h3>
            <label>Product Name</label>
            <input type='text' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
            <label>Price</label>
            <input type='text' value={price} onChange={(e)=>setPrice(e.target.value)}/>
            {/* <label>Category</label>
            <input type='text'/> */}
            <div className="checkInp">
            <label>Category</label>
              <div className="inputsContainer">
            <div className="checkboxcontainer">
              <label>Veg</label>
              <input type="checkbox" value="veg" checked={category.includes('veg')} onChange={handleCategoryChange}/>
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input type="checkbox" value="non-veg" checked={category.includes('non-veg')} onChange={handleCategoryChange}/>
            </div>
            </div>
            </div>
            <div className="checkInp">
            <label>BestSeller</label>
              <div className="inputsContainer">
            <div className="checkboxcontainer">
              <label>yes</label>
              <input type="radio" value="true" checked= {BestSeller===true} onChange={handleBestSeller}/>
            </div>
            <div className="checkboxcontainer">
              <label>no</label>
              <input type="radio" value="false" checked={BestSeller===false} onChange={handleBestSeller}/>
            </div>
            </div>
            </div>
            {/* <label>BestSeller</label> 
            <input type='text'/> */}

            <label>Description</label>
            <input type='text' value={description} onChange={(e)=>setDescription(e.target.value)}/>
            <label>Firm Image</label>
            <input type='file' onChange={handleImageUpload} />
            <br/>
            <div className="btnSubmit">
              <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AddProduct