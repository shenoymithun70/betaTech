import React, { Component } from "react";
// import { Doughnut, Pie } from "react-chartjs-2";

import axios from 'axios';

import UserService from "../../services/user.service";

class AdminBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      categories: []
    };
  }

  getProductByCategory = async (category) => {
    const products = await axios.post("http://localhost:8000/getProductByCategory/Mobile", {category}).then((res) => {
        return res.json();
   }) 
   return products.length; 
  }

  async componentDidMount() {

    await axios({
      url:'http://localhost:8000/getCategories',
      method:'POST',
      headers:{'Content-Type':'application/json'},
      data: {
      }
  })
  .then(res => {
      console.log(res);
      this.setState({
        categories: res.data.categories
      } , () => console.log(this.state))
  }).catch((error) => {
      return error;
  })
    var productLength = [];
    // this.state.categories.map((category) => {
    //     var categoryName = category.Name;
    //     return(
    //     axios.post("http://localhost:8000/getProductByCategory" , {category : categoryName} ).then((res) => {
    //         res.data
    //     })
    //     )   
        
    // })
    var productLength = [];
    this.state.categories.map((category) => {
        var length =  this.getProductByCategory(category.Name)
    })
    console.log(productLength);

    // const data = await fetch("http://localhost:8000/getProductByCategory/Mobile").then((res) => {
    //     // return res.data;
    //     return res.json();
    // })
    // console.log(data);
    
    

    // UserService.getAdminBoard().then(
    //   response => {
    //     this.setState({
    //       content: response.data
    //     });
    //   },
    //   error => {
    //     this.setState({
    //       content:
    //         (error.response &&
    //           error.response.data &&
    //           error.response.data.message) ||
    //         error.message ||
    //         error.toString()
    //     });
    //   }
    // );

  }

  render() {
    const {categories} = this.state;
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{this.state.content}</h3>
        </header>
        <div>
          {categories.length!=0?
          categories.map((item)=>{
            return (
              <h5>{item.Name}</h5>
              
            )
          })  :null
        }
        </div>
      </div>
    );
  }
}

export default AdminBoard;