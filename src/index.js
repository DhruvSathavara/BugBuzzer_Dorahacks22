import React from 'react';
// import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { MoralisProvider } from 'react-moralis';
import { BrowserRouter } from 'react-router-dom';
import { BookContextProvider } from './Context/BookContext';
import 'react-toastify/dist/ReactToastify.css';
import { ChatBoxContextProvider } from './Context/ChatBoxContext';



// const root = ReactDOM.createRoot(document.getElementById("root"));
// const root = document.getElementById("root");
// const serverUrl = process.env.REACT_APP_MORALIS_SERVER;
// const appId = process.env.REACT_APP_MORALIS_KEY;
ReactDOM.render(

  <MoralisProvider appId={process.env.REACT_APP_MORALIS_KEY} serverUrl={process.env.REACT_APP_MORALIS_SERVER}>
    <BookContextProvider>
        <BrowserRouter>
          <ChatBoxContextProvider>
            <React.StrictMode>

              <App />
            </React.StrictMode>
          </ChatBoxContextProvider>

        </BrowserRouter>
    </BookContextProvider>
  </MoralisProvider>,
  document.getElementById('root')

);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { BrowserRouter } from 'react-router-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
//   document.getElementById('root')
// );