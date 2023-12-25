import React, {useEffect} from 'react';
import ProductList from '../../components/ProductList/ProductList';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../store/productSlice';
import { fetchCategories, fetchProductsByCategory } from '../../store/categorySlice';
import "./HomePage.scss";
import Sidebar from '../Dashboard/Sidebar';
import Header from '../../components/header/header';
import Navbar from '../../components/Navbar/Navbar';
const HomePage = () => {
  const dispatch = useDispatch();
  const {data: categories, status: categoryStatus} = useSelector((state) => state.category);
  const {data: products, status: productStatus} = useSelector((state) => state.product);
  const {catProductAll: productsByCategory, catProductAllStatus} = useSelector((state) => state.category);
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
    dispatch(fetchProductsByCategory(1, 'all'));
    dispatch(fetchProductsByCategory(2, 'all'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className = "home-page">
        <Header/>
      <Sidebar/>
      <Navbar/>
  
    </div>
  )
}


export default HomePage;