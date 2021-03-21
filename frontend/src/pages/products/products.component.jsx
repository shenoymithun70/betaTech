import axios from 'axios';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';

const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 300px;
`;

const CategoriesItem = styled.div`
    width: 300px;
    height: 300px;
    ${'' /* border: 1px solid black; */}
    margin: 10px 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
`;

const ImageContainer = styled.img`
    width: 200px;
    height: 200px;
`


class ProductsPage extends React.Component {
    state = {
        showAgentBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
        products: [],
    }

    

    getProducts = async ( username) => {
        const data = await axios.post("http://localhost:8000/getProducts", {username} ).then((res) => {
            return res.data
        })
        console.log(data);
        this.setState({products: [...data.products]} , () => console.log(this.state))
    }


    componentDidMount() {
        const {currentUser} = this.props;
        
        if(currentUser) {
            this.setState({
                currentUser: currentUser,
                showAgentBoard: currentUser.userType == "User" ? true : false,
                showAdminBoard: currentUser.userType == "Admin" ? true : false
            },() =>  console.log(this.state))
            this.getProducts(currentUser.username)
        }
    }   
    

    render() {
        const {products} = this.state;
        return(
        <CategoriesContainer>
            {products.map((key , index) => {
                return (
                    
                    <CategoriesItem>
                        <ImageContainer src={`./images/${products[index]._id.replace(' ','').toLowerCase()}.jpg`}>
                        
                        </ImageContainer>
                        <br/><br/>
                        {products[index]._id.replace(' ','').toLowerCase()} 
                        {`Name: ${products[index]._id}`}
                        <br/>
                        {`Count: ${products[index].count}`}
                    </CategoriesItem>
                )
            })}
        </CategoriesContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.user,
})

export default  connect(mapStateToProps)(ProductsPage)