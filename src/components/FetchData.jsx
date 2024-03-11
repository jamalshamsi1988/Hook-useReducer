import { useReducer , useEffect} from "react";

const initialState = {
  isLoading: true,
  data: [],
  error: "",
};

const reducer = (state, action) => {
    console.log(state)
    switch(action.type){
        case "SUCCESS" :
        return {isLoading : false ,data:action.payload ,error:""}
        case "FAILED" : 
        return {isLoading : false , data:[], error:action.payload}
    }
};

const FetchData = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((json) => dispatch( { type:"SUCCESS", payload: json}))
      .catch(error => dispatch({type:"FAILED", payload:error.message}))
  }, []);

  return <div>
    {state.isLoading && <h1>Loading</h1>}
    <div>
        {state.data.map(post=> <p key={post.id}>{post.title}</p>)}
    </div>
    {
        !!state.error && <h3>{state.error}</h3>
    }
  </div>;
};

export default FetchData;
