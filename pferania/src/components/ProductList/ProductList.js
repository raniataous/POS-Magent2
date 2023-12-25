import "./ProductList.scss";
import SingleProduct from '../SingleProduct/SingleProduct';
import { useSelector, useDispatch } from 'react-redux';
import { setModalData, setIsModalVisible } from '../../store/modalSlice';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = ({status}) => {
    const dispatch = useDispatch();
    const {isModalVisible} = useSelector((state) => state.modal);

    const viewModalHandler = (data) => {
        dispatch(setModalData(data));
        dispatch(setIsModalVisible(true));
    }
    const [imageData, setImageData] = useState([]);

    const [products, setProducts] = useState([]);
    useEffect((categoryId) => {
         axios.get(`https://magento.test/rest/all/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${categoryId}`)

          .then(response => {
            const imageData = response.data.items.map(item => {
              const product = {
                name: item.name,
                price: item.price,
                image: `https://magento.test/pub/media/catalog/product${item.media_gallery_entries[0].file}`
              };
              return product;
            });
            setImageData(imageData);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);
 

    return (
        <section className='product py-5 bg-ghost-white' id = "products">
        { isModalVisible && <SingleProduct />}
         
        
            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products</h3>
                    </div>
                    <div className='product-items grid'>
                        {
                            imageData.slice(0, 20).map(product => (
                                     <div className='product-item bg-white' key={product.image} onClick = {() => viewModalHandler(product)}>
                                    <div className='product-item-img'>
                                    <img src={product.image} alt="" />
                                    </div>
                                    <div className='product-item-body'>
                                        <h6 className = "product-item-title text-pine-green fw-4 fs-15">{product.name}</h6>
                                        <div className = "product-item-price text-regal-blue fw-7 fs-18">{product.price}</div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            
        </section>
    )
                    }

export default ProductList