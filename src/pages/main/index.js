import React, {Component} from 'react';
import  {Link} from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default class Main extends Component{
  state ={
    products:[],
    productInfo:{},
    page:1,
  }
  componentDidMount(){
    this.loadProducts();
  }
  loadProducts = async (page = 1)=>{
    const response = await api.get(`/products?page=${page}`);
    const {docs, ...productInfo} = response.data;
    this.setState({products:docs, productInfo,page});
  }
  prevPage = async ()=>{
    const {page} = this.state;
    if(page===1) return;
   
    const newPage = page - 1;
    this.loadProducts(newPage);
  }
  nextPage = async()=>{
    const {page, productInfo} = this.state;
    if(page===productInfo.pages) return;
   
    const newPage = page + 1;
    this.loadProducts(newPage);

  }
  render(){
    const {products, productInfo, page} = this.state;

    return (
      <div className="product-list">
       {products.map(product =>(
         <article key={product._id}>
           <strong>{product.title}</strong>
           <p>{product.description}</p>
           <Link to={`/products/${product._id}`}>acessar</Link>
           
           </article>
       ))}
       <div className="actions"> 
        <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
        <button disabled={page===productInfo.pages} onClick={this.nextPage}>Próxima</button>
      </div>
      </div>
      
    );
  }
}