import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import styled from 'styled-components'

const CategoriesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-left: 300px;
    border-left: 1px #39af98;
`;

const CategoriesItem = styled.div`
    width: 300px;
    height: 300px;
    ${'' /* border: 1px solid black; */}
    margin: 10px 10px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    
`;

const ImageContainer = styled.img`
    
  width: 300px;
  height: 200px;
  object-fit: cover;
`



class CategoriesPage extends React.Component {
    state = {
        showAgentBoard: false,
        showAdminBoard: false,
        currentUser: undefined,
        categories: [],
    }

    getCategoriesByUsername = async (username) => {
        const data = await axios.post("http://localhost:8000/getCategories" , {username}).then((res) => {
            return res.data;
        })
        console.log(data);
        this.setState({categories: [...data.categories]} , () => console.log(this.state))
    }


    async componentDidMount() {
        const {currentUser} = this.props;
        console.log(currentUser);
        if(currentUser) {
            this.setState({
                currentUser: currentUser,
                showAgentBoard: currentUser.userType == "Agent " ? true : false,
                showAdminBoard: currentUser.userType == "Admin" ? true : false
            },() =>  console.log(this.state))
            await   this.getCategoriesByUsername(currentUser.username);
        }
    }

    render() {
        const {categories} = this.state;
        return(
        <CategoriesContainer>
            {categories.map((key , index) => {
                return (
                    <CategoriesItem>
                        <ImageContainer src={categories[index].image.trim().toLowerCase()}>
                            
                        </ImageContainer>
                        {categories[index].Name}
                        <br/>
                        {categories[index].description}
                    </CategoriesItem>
                )
            })}
        </CategoriesContainer>
        )
    }
}

const mapStateToProps = (state) => ({
    currentUser: state.user.user
})



export default connect(mapStateToProps)(CategoriesPage);