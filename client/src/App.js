import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import ResponsiveAppBar from './components/AppBar';

function App() {
  return (
    <div className="App">
      <header className="">
        <ResponsiveAppBar />
      </header>
    </div>
  );
}

export default App;
