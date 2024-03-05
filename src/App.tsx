import './App.css';
import LifiWidgetReact from './components/LifiWidgetReact';
function App() {
  const config = {
        containerStyle: {
          border: `1px solid rgb(234, 234, 234)`,
          borderRadius: '16px',
        },
      }
  return (
    <LifiWidgetReact
      config={config}
      integrator="cra-example"
    />
  );
}

export default App;
