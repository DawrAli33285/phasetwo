import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import JobCategory from './jobCategory';
import JobListing from './jobListing';
import CreateResume from './createResume';
import SignIn from './signIn';
import {store,persistor} from './redux/store/storenew'
import SignUp from './signup';
import JobDetail from './jobDetail';
import { PersistGate } from 'redux-persist/integration/react'
import Contact from './contact';
import Privacy from './privacypolicy';
import Message from './messagePage';
import Terms from './termsPolicy';
import CvTemplate from './cvTemplate';
import {Provider} from 'react-redux';
import Profile from './profile'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
    <Header />
     <Routes>
        <Route path="/" element={ <App />} />
        <Route path="/Job-Category" element={ <JobCategory/>} />
        <Route path="/Job-Listing" element={ <JobListing/>} />
        <Route path="/Create-Cv" element={<CreateResume />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Job-Detail" element={ <JobDetail/>} />
        <Route path="/Contact" element={ <Contact/>} />
        <Route path="/PrivacyPolicy" element={ <Privacy/>} />
        <Route path="/Message" element={ <Message/>} />
        <Route path="/Terms&Condition" element={ <Terms/>} />
        <Route path="/Your-Cv" element={ <CvTemplate/>} />
        <Route path="/UserProfile" element={ <Profile/>} />

     </Routes>
     <Footer/>
    </BrowserRouter>
    </PersistGate>
     </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
