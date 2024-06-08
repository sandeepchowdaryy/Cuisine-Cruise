import React from "react";

class UserClass extends React.Component {
   constructor(props){
    super(props)

    this.state={
        count:0,
        count2:2,
    };
    console.log(props);
   }

   componentDidMount() {

   }

   render() {
    return(
       <div>
        <h2>Count: {this.state.count}</h2>
        <button onClick={()=> {
           this.setState({
            count:this.state.count +1,
           });
        }}>click</button>
           <h3>Name :{this.props.name}</h3>
       </div>
    );
   }
}

export default UserClass;