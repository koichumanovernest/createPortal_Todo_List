import React, { useState } from "react";
import TodoList from "./components/TodoList";
import { Snowfall } from "react-snowfall";

const App = () => {
  

	return (
    <div>
  

			
			<TodoList/>
			<Snowfall color="#FF00FF" style={{position: "fixed", top:0,left:0,width:"100%", height:"100%",zIndex:"200"}}/>
		</div>
	);
};

export default App;






