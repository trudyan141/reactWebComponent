import r2wc from "@r2wc/react-to-web-component";
import Widget from "./components/LifiWidgetReact";
import "./index.css";
import { reportWebVitals } from "./reportWebVitals";

const wcWidget = r2wc(Widget, {
  props: { config: "json", integrator: "string" },
});

customElements.define("r2w-lifi-widget", wcWidget);

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement,
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
