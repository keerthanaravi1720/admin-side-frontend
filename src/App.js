




import React from 'react';
import { Layout } from 'antd';
import { Route, Routes } from 'react-router-dom';
import Sidebar from './Pages/SideBar';
import AppHeader from './Pages/AppHeader';
import MainContent from './Pages/MainContent';
import './App.css';
import Crud from './Pages/Crud';
import Update from './Pages/Update';
// import Assign from './components/Assign';
// import Assign from './components/Assign';




const { Content, Sider } = Layout;

const App = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} className="site-layout-background">
        <Routes>
          <Route path="/" element={<Sidebar />} />
          <Route path="/create-task" element={<Sidebar />}/>
         <Route path='/update' element={<Sidebar/>}/>
          {/* <Route path="/header" element={<AppHeader />} />
          // <Route path="/main" element={<MainContent />} /> */}
          
         
          
        
        </Routes>
      </Sider>
      <Layout>
        <AppHeader />
        <Content>
      {/* <MainContent /> */}
      <Routes>
             <Route path="/" element={<MainContent />} />
        
                    <Route path="/create-task" element={<Crud/>} />
                <Route path='/update' element={<Update/>}/>
               
                  </Routes>
      </Content>
     
      </Layout>
     
    </Layout>
  );
};

export default App;



// App.js

// import React from 'react';
// import { Layout } from 'antd';
// import { Route, Routes } from 'react-router-dom';
// import Sidebar from './Pages/SideBar';
// import AppHeader from './Pages/AppHeader';
// import MainContent from './Pages/MainContent';
// // import CreateTask from './Pages/CreateTask';

// import './App.css';
// import Crud from './Pages/Crud';

// const { Content, Sider } = Layout;

// const App = () => {
//   return (
//     <Layout style={{ minHeight: '100vh' }}>
//       <Sider width={200} className="site-layout-background">
//         <Routes>
//           <Route path="/" element={<Sidebar />} />
//           <Route path="/create-task" element={<Sidebar />} /> {/* Share the same sidebar */}
//         </Routes>
//       </Sider>
//       <Layout>
//         <AppHeader />
//         <Content >
//               <MainContent />
//           <Routes>
//             <Route path="/" element={<MainContent />} />
        
//             <Route path="/create-task" element={<Crud/>} />
            
//           </Routes>
//         </Content>
//       </Layout>
//     </Layout>
//   );
// };

// export default App;
