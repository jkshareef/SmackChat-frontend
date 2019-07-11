import React, { Component } from 'react'
import { API_ROOT } from '../constants/index';
import { Divider } from 'semantic-ui-react';
// import { Button, Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

export default class Thread extends Component {

    constructor() {
        super()

        this.state = {
            user_img_url: null,
            content:null,
            user_name:null,
            created_at:null
        }

       
    }
    

    getToken = () => {
        return localStorage.getItem('jwt')
    } 


    handleImage = () => {
        let token = this.getToken()
        fetch(`${API_ROOT}/users/${this.props.message.user_id})`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })        
        .then(resp => resp.json())
        .then(data => {
            this.setState({
                user_img_url: data.img_url
            })
        })
        }

    componentDidMount() {
        console.log(this.props)

        this.handleImage()
        if (this.props.message){
            this.setState({
            content: this.props.message.content,
            user_name: this.props.message.user_name,
            created_at: this.props.convertTime(this.props.message.created_at)
            })
        }
    }


    render(){
        return (
            <div className="ui feed feed-window segment">
                <div className="event" >
                    <div className="label">
                        {this.state.user_img_url? <img className="ui medium circular image" src={this.state.user_img_url} alt=''/>: <i className ="user icon"> </i>} 
                    </div>
                    <div className="content">
                        <div className="summary">
                            <a>{this.state.user_name}</a>
                            <div className="date">
                                {this.state.created_at}
                            </div>
                            <div className="extra text">
                                {this.state.content}
                            </div>
                        </div>
                        <div className="extra images"> </div>
                      
                    </div>
                </div>
                {/* loop through replies of this.state.message and map to these divs */}
                    <>
                    <div className="ui segment right floated">

                        <div className="summary">
                            <a>Test User  </a>
                            <div className="date inline">
                                Today at 12:34
                            </div>
                            <div className="extra text right align">
                                Hello 1
                            </div>
                        </div>
                    </div>
                    <div className="ui segment right floated">
                        <div className="summary">
                            <a>Test User 2  </a>
                            <div className="date inline">
                                Today at 12:34
                            </div>
                            <div className="extra text right align">
                                This is a much longer message meant to stretch the container segment
                            </div>
                        </div>

                    </div>
                    </>
            </div>
        
        )
    }
              
    
    }
