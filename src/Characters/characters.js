import React, {Component} from 'react';
import axios from 'axios';


import './characters.css';

let numberPage = 1;

class Character extends Component{
    render(){
        return(
            <div className="characters">
                <img src={this.props.image} alt='' className="img" />
                <h3>Name: {this.props.name}</h3>
            </div>
        )
    }
}


class Characters extends Component {
    constructor(props){
        super(props)
        this.state = {
            characters:'',
            valuePrev: '',
            valueNext: '',
            progress: 0,
            loading: true
        }
        this.getToCharacters();
    }
    
    getToCharacters = () => {
        if(numberPage === 1){
            axios.get(`https://rickandmortyapi.com/api/character`,{
                onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.setState({ progress: percentCompleted });
                }
            })
            .then(({data}) => {
                this.setState({pages: data.info.pages});
                this.setState({characters: data.results});
                if (this.state.progress === 100) { this.toggleLoading() };

            })
        } 

        else {
            axios.get(`https://rickandmortyapi.com/api/character/?page=${numberPage}`, {
                onDownloadProgress: (progressEvent) => {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    this.setState({ progress: percentCompleted });
                }
            })
            .then(({data}) => {
                this.setState({characters: data.results});
                if (this.state.progress === 100) { this.toggleLoading() };
            })
        }
    }

    prev = () => {
        
        this.toggleLoading();
        numberPage -=1;
        this.getToCharacters();
        if(numberPage === 1){
             this.setState({ valuePrev: '' }) 
        }
        if (numberPage < this.state.pages) { 
           this.setState({ valueNext: '' }) 
       }
    }
    next = () => {
        console.log(this.state.pages)
        this.toggleLoading();
        numberPage +=1;
        this.getToCharacters();
        if (numberPage > 1) { 
            this.setState({ valuePrev: 'You can click this button' }) ;
        };
       if (numberPage === this.state.pages) { 
           this.setState({ valueNext: 'You can click this button' }); 
       };
    }
   
    toggleLoading = (state) => {
        this.setState({
            loading: !this.state.loading
        })
    }
    
     LoadingWindow = () => (
        <div className="row"><span className="loading">Loading...</span></div>
    )

    CharWindow = () => (
        <div className="row">
            {this.state.characters ? this.state.characters.map(character => <Character {...character} key={character.id} />) : ''}
        </div>
    )
    
    render(){
        return(
            <div className="main">
                {this.state.loading && <this.LoadingWindow />}
                {!this.state.loading && <this.CharWindow />}
                <div className="btn">
                    <button  onClick = {this.prev} disabled={!this.state.valuePrev}>Prev</button>
                    <button onClick = {this.next} disabled={this.state.valueNext}>Next</button>
                </div>
            </div>
        )
    }
}

export default Characters;



