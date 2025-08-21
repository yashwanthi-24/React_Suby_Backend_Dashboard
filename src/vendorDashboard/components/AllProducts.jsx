import React,{useState,useEffect} from 'react'
import {API_URL} from '../data/apiPath';

const AllProducts = ()=>{
    const[products,setProducts]= useState([]);

    const productsHandler = async()=>{
        const firmId = localStorage.getItem('firmId');
        try {
            console.log(`${API_URL}/product/${firmId}/products`)
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData);
            console.log(newProductsData);
        } catch (error) {
            console.error("failed to fetch products",error);
            alert('failed to fetch products')
        }
    }
    useEffect(()=>{
        productsHandler()
    },[])
    
    const deleteProductById = async(productId)=>{
        try {
            console.log(`Deleteting the product with id ${productId}`)
            const url = `${API_URL}/product/${productId}`;
            console.log(url)
            const response = await fetch(`${API_URL}/product/${productId}`,{
                method: 'DELETE'
            })
            if(response.ok){
                setProducts(products.filter(product => product._id !== productId));
                confirm("are you sure you want to delete")
                alert("product deleted successfully")

            }
        } catch (error) {
            console.error('failed to delete product')
            alert('failed to delete product')
        }
    }

    return(
       <div>
        {!products.length ?(
           <p>No products added</p>
        ):(
           <table className="product-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Image</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {products.map((item)=>{
                    return(
                        <>
                        <tr key={item._id}>
                          <td>{item.productName}</td>
                          <td>{item.price}</td>
                          <td>
                            {item.image && (
                                <img src={`${API_URL}/uploads/${item.image}`} alt={item.productName} style={{width:'50px',height: '50px'}} />
                            )}
                          </td>
                          <td>
                            <button onClick={()=>deleteProductById(item._id)}>Delete</button>
                          </td>
                        </tr>
                        </>
                    )
                })}
            </tbody>
           </table>
        )}
       </div>
    )
}
export default AllProducts;