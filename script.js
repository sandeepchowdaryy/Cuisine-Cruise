    
    const parent = React.createElement("div",{id:"parent"},[React.createElement("div",{id:"chid"},
    React.createElement("h1",{id:"heading"},"hello world from react"))],
    [React.createElement("div",{id:"chid2"},
    React.createElement("h1",{id:"heading2"},"hello world from react"))])
    
   
    
    
    console.log(parent)
    




    const root = ReactDOM.createRoot(document.getElementById("root"))
    root.render(parent)