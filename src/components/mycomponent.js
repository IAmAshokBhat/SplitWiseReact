import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class MyComponent extends Component{
    constructor(props){
        super(props);    
        this.state = {
            name:"",  
            itemsPurchased:{
                "lunch":{
                        "cost":500,
                        "users":["A"]                     
                        }
                },
            users:{},
            userCopy:{},
            perPersonCost:{},
            toGet:{},
            itemName:"",
            itemPrice:0,
            paidAmount:0,
            selectedUser:"Select a user"

        }   
    }
      
    inputChange(event){      
        this.setState({[event.target.name]:event.target.value});
    }  
    
    addUser(){
        this.setState({users : {[this.state.name]:0, ...this.state.users},name:"",userCopy : {[this.state.name]:0, ...this.state.users}})
    }
    submitUser(event){       
        if(event.which==13 && this.state.name!="")
           {
            this.addUser();
           }
    }
    addItem(){
        this.setState({itemsPurchased : {[this.state.itemName]:{"cost":this.state.itemPrice}, ...this.state.itemsPurchased},itemName:"",itemPrice:"",userCopy :this.state.users})
    }

    paidAmountAdd(item){
        if(!this.state.itemsPurchased[item]["users"]){
            this.state.itemsPurchased[item]["users"] = [];
        }
        console.log(this.state.paidAmount)
        let amount = this.state.users[this.state.selectedUser]+this.state.paidAmount;
        console.log(amount)
        let currUsers = (this.state.itemsPurchased[item]["users"]).push(this.state.selectedUser)
        this.setState({users : {[this.state.selectedUser]:amount, ...this.state.users}});
        console.log(this.state.itemsPurchased)
        this.setState({itemsPurchased : {[item]:{"users":currUsers,"cost":this.state.itemsPurchased[item].cost}, ...this.state.itemsPurchased},selectedUser:""})
        console.log(this.state.itemsPurchased)
        let temp = this.state.userCopy;
      
        delete temp[this.state.selectedUser];
       
        this.setState({userCopy:temp});
        console.log(this.state.users)
    }
    selectChange(event){
        if((event.target.value != "Select a user") && event.target.value != ""){            
            this.setState({selectedUser:event.target.value})
        }
    }
    render(){
        return(
            <div >
                <input 
                    type="text"
                    onChange={event =>this.inputChange(event)}
                    onKeyPress={event =>this.submitUser(event)}
                    value={this.state.name}
                    name="name"/>
                <button onClick={this.addUser.bind(this)}>Add User</button>              
                <table >
                    <thead>
                    <tr>
                        <th>Name</th>                        
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.users).map(user=>{
                        return ( <tr key={user}>
                                <td>{user}</td>                        
                                </tr>
                            )
                    })}
                    </tbody>
                    </table>
                    <input 
                    type="text"
                    value={this.state.itemName}
                    placeholder="item name..."
                    onChange={event =>this.inputChange(event)}
                    name="itemName"/>
                    <input 
                    type="text"
                    value={this.state.itemPrice}
                    placeholder="item Price..."
                    onChange={event =>this.inputChange(event)}
                    name="itemPrice"/>
                    <button onClick={this.addItem.bind(this)}>Add Item</button>            
                    <table >        
                    <thead>
                    <tr>
                        <th>Item</th>        
                        <th>Price</th> 
                        <th>Split with user</th> 
                        <th>Users paid</th>                  
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(this.state.itemsPurchased).map((item,i)=>{
                        console.log(item.cost + " : " + i)
                        return ( <tr key={item}>
                                <td>{item}</td>      
                                <td>{this.state.itemsPurchased[item].cost}</td>   
                                <td>
                                     <select value={this.state.selectedUser}  onChange={event =>this.selectChange(event)}>  
                                        <option value="Select a user">Select a user</option>                                      
                                         {Object.keys(this.state.userCopy).map(user=>{
                                            return ( 
                                                     <option key={user}>{user}</option>
                                                )
                                        })}
                                     </select>  
                                     <input type="text" value={this.state.paidAmount}
                                     onChange={event =>this.inputChange(event)} name="paidAmount"/>
                                      <button onClick={this.paidAmountAdd.bind(this,item)}>Add Amount</button> 

                                    </td>
                                    <td>{this.state.itemsPurchased[item]['users']}<br/></td>                 
                                </tr>
                            )
                    })}
                    </tbody>
                    </table>
            </div>
        )
    }
}
 