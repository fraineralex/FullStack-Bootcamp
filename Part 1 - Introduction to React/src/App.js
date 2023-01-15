import './App.css';
import Message from './Message';
const Description = () => {
  return <h3>This is the first react app of the midu bootcamp</h3>
  }

function App() {
  return (
    <div className="App">
      <Message color='red' message='We are working in a React curse' />
      <Message color='green' message='That is a incredible something' />
      <Message color='blue' message='Thanks midu' />
      <Description />
    </div>
  );
}

export default App;
