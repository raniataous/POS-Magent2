import React, { useState, useEffect} from 'react';
import "./Navbar.scss";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { setModalData, setIsModalVisible } from '../../store/modalSlice';
import SingleProduct from '../SingleProduct/SingleProduct';

import { useSelector, useDispatch } from 'react-redux';


const Navbar = () => {
  const [isModalVisiblep, setIsModalVisiblep] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const viewModalHandlerp = (product) => {
    setSelectedProduct(product);
    setIsModalVisiblep(true);
  };

  const addToCartHandler = (product) => {
    if (product.type_id === 'simple') {
      axios.post('https://magento.test/V1/carts/mine/items', {
        cartItem: {
          sku: product.sku,
          qty: 1,
          quote_id: localStorage.getItem('magento_cart_id'),
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    } else {
      alert('Veuillez préciser la ou les options de produits.');
    }
  };
  const dispatch = useDispatch();
    const {isModalVisible} = useSelector((state) => state.modal);
  const viewModalHandler = (data) => {
    dispatch(setModalData(data));
    dispatch(setIsModalVisible(true));
}

 
  const [imageData, setImageData] = useState([]);
    const [activeSubCategoryId, setActiveSubCategoryId] = useState(null);
    const [activeSubSubCategoryId, setActiveSubSubCategoryId] = useState(null);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
      async function fetchCategories() {
        const response = await axios.get('https://magento.test/rest/all/V1/categories');
        setCategories(response.data.children_data);
      }
      fetchCategories();
    }, []);
    useEffect(() => {
      async function fetchProducts() {
        const response = await axios.get(`https://magento.test/rest/all/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${activeSubCategoryId}&searchCriteria[filter_groups][1][filters][0][field]=visibility&searchCriteria[filter_groups][1][filters][0][value]=4&searchCriteria[filter_groups][2][filters][0][field]=status&searchCriteria[filter_groups][2][filters][0][value]=1`);

        setProducts(response.data.items);
      }
      if (activeSubCategoryId) {
        fetchProducts();
      }
    }, [activeSubCategoryId]);
    const handleSubCategoryClickp = (subCategoryId) => {
      setActiveSubCategoryId(activeSubCategoryId === subCategoryId ? null : subCategoryId);
      setActiveSubSubCategoryId(null);
      setProducts([]);
    };
   
        
  
    const handleSubCategoryClick = (subCategoryId) => {
      setActiveSubCategoryId(activeSubCategoryId === subCategoryId ? null : subCategoryId);
      setActiveSubSubCategoryId(null);
    };
    useEffect(() => {
      async function fetchProducts() {
        const response = await axios.get(`https://magento.test/rest/all/V1/products?searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${activeSubSubCategoryId}&searchCriteria[filter_groups][1][filters][0][field]=visibility&searchCriteria[filter_groups][1][filters][0][value]=4&searchCriteria[filter_groups][2][filters][0][field]=status&searchCriteria[filter_groups][2][filters][0][value]=1`);
        setProducts(response => {
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
          })
      
      }
      if (activeSubSubCategoryId) {
        fetchProducts();
      }
    }, [activeSubSubCategoryId]);
  
    const handleSubSubCategoryClick = (subSubCategoryId) => {
      setActiveSubSubCategoryId(activeSubSubCategoryId === subSubCategoryId ? null : subSubCategoryId);
    };
    
   

    
    const renderCategories = (categoriesList) => {
      return categoriesList.map((category) => (
        <ul className="liste">
          <li key={category.id} className="liste">
          
              <ul  className='sous'>
                {category.children_data.map((subCategory) => (
                  <li key={subCategory.id} className="sous">
                    <div > <Link onClick={() => handleSubCategoryClickp(subCategory.id)}>{subCategory.name}</Link ><i className="fa-solid fa-chevron-down"  onClick={() => handleSubCategoryClick(subCategory.id)}></i></div>
                    {activeSubCategoryId === subCategory.id && subCategory.children_data && (
                      <ul style={{ display: "flex", flexDirection: "column" }}>
                        {subCategory.children_data.map((subSubCategory) => (
                          <li key={subSubCategory.id} >
                            <div  ><Link onClick={() => handleSubCategoryClickp(subSubCategory.id)}>
                              {subSubCategory.name}</Link> <i class="fa-solid fa-chevron-right" onClick={() => handleSubSubCategoryClick(subSubCategory.id)}></i>
                            </div>
                            {activeSubSubCategoryId === subSubCategory.id && subSubCategory.children_data && (
                              <ul style={{ display: "flex", flexDirection: "column" }} className="liste">
                                {subSubCategory.children_data.map((subSubSubCategory) => (
                                  <li key={subSubSubCategory.id}>{subSubSubCategory.name}</li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            
          </li>
        </ul>
        
      ));
    };
    const ProductList = ({ products }) => {
      return (
        <section className='product' id = "products">
      
      { isModalVisible && <SingleProduct />}
        
            <div className='container'>
                <div className='product-content'>
                    <div className='section-title'>
                        <h3 className='text-uppercase fw-7 text-regal-blue ls-1'>Our Products</h3>
                    </div>
                    
                    <div className='product-items grid'>
  {products.slice(0, 20).map((product) => (
    <div className='product-item bg-white' key={product.image} onClick={() => viewModalHandler(product)}>
      <div className='product-item-img'>
      <img src={`https://magento.test/pub/media/catalog/product${product.media_gallery_entries[0].file}`} alt='' />

      </div>
      <div className='product-item-body'>
        <h6 className='product-item-title text-pine-green fw-4 fs-15'>{product.name}</h6>
        <div className='product-item-price text-regal-blue fw-7 fs-18'>{product.price}</div>
        <button className='btn btn-primary' onClick={() => addToCartHandler(product)}>Add to Cart</button>

      </div>

    </div>
  ))}
</div>

        
        </div>
        </div>
        </section>
      );
    };
    
    
    return (
      <div className='categorie'>
        
        <ul style={{ display: 'flex', flexDirection: 'row' }} >{renderCategories(categories.slice(0, 1))}</ul>
        <ul className="categories">{renderCategories(categories.slice(1))}</ul>
        {activeSubCategoryId && <ProductList products={products} />}


    
      </div>
    )}
  export default Navbar;  