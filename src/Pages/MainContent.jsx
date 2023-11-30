




// import React from 'react';
// import { Layout } from 'antd';

// const { Content } = Layout;

// const MainContent = () => {
//   return (
//     <Content
//       className="site-layout-background"
//       style={{
//         padding: 24,
//         margin: 0,
//         minHeight: 280,
//       }}
//     >
//       {/* Add content for the main section */}
//       Main Content
//     </Content>
//   );
// };

// export default MainContent;











import React, { useEffect, useState } from 'react';
import { Layout, Table, Button, Space, Input, Modal,} from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import axios from 'axios';


import { useNavigate } from 'react-router-dom';


const { Content } = Layout;

const MainContent = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState(null);

 
  useEffect(() => {
    // Fetch the posts when the component mounts
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



  const fetch = async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      setSelectedPost(response.data.post);
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };
  


  const handleDelete = async (postId) => {
    Modal.confirm({
      title: 'Confirm Deletion',
      content: 'Are you sure you want to delete this post?',
      okText: 'Yes',
      cancelText: 'No',
     
      onOk: async () => {
        try {
          await axios.delete(`http://localhost:3000/posts/${postId}`);
          fetchPosts(); // Refresh the posts after deletion
          // Modal.success({
          //   title: 'Post Deleted',
          //   content: 'The post has been successfully deleted.',
          // });
          setSelectedPost(null);
        } catch (error) {
          console.error('Error deleting post:', error);
          Modal.error({
            title: 'Error',
            content: 'An error occurred while deleting the post.',
          });
        }
      },
    });
  };

 


  const handleSearch = async (value) => {
    setSearchText(value);
  
    try {
      const response = await axios.get(`http://localhost:3000/posts/search/${value}`);
      setPosts(response.data.posts || []); // Use response.data.posts
     fetchPosts();
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };



  const columns = [
    // ... your existing columns
    // (other column definitions)

            { title: 'Title', dataIndex: 'title', key: 'title' , align:'center'},
    { title: 'Start Date', dataIndex: 'startDate', key: 'startDate', align:'center' },
    { title: 'End Date', dataIndex: 'endDate', key: 'endDate', align:'center' },
    { title: 'Time Limit', dataIndex: 'hasTimeLimit', key: 'hasTimeLimit', align:'center' },
  
    
    { title: 'Need Proof', dataIndex: 'needProof', key: 'needProof', align:'center' },
    { title: 'Site Link Hidden', dataIndex: 'siteLinkHidden', key: 'siteLinkHidden', align:'center' },
   
    
    {
      title: <span style={{ color: 'white' }}></span>,
      dataIndex: 'id',
      key: 'actions',
      render: (id, post) => (
        <Space size="middle">
          <Button
            style={{ borderColor: 'white' }}
            icon={<EditOutlined />}
            onClick={() => {
              // navigate("/update");
              navigate("/update", { state: { postData: post } });
            }}
          ></Button>
          <Button
            style={{ borderColor: 'white' }}
            icon={<DeleteOutlined />}
            onClick={(event) => {
              event.stopPropagation(); // Prevent row click action
              handleDelete(id);
            }}
          ></Button>
        </Space>
      ),
    },
    
  ];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
       <Content
        className="site-layout-background"
        style={{
          padding: 24,
          margin: 0,
          minHeight: 280,
          // display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // backgroundColor:'#EBEEF5'
          overflow: "auto",
        }}
      >
        <h3>Tasks Management</h3>
        <></>
   


<div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
    <Input
      placeholder="Search"
      suffix={<SearchOutlined />}
      style={{ height: 35, borderRadius: 10, maxWidth: 300 }} 
      onChange={(e) => setSearchText(e.target.value)}
      onPressEnter={(e) => handleSearch(e.target.value)}
     
    />
    
    <Button
      icon={<PlusOutlined />}
      className='button'
      onClick={() => navigate('/create-task')}
    >
      Create New
    </Button>
  </div>




<div className="heading-container ">
  {filteredPosts.length === 0 ? (
    <p>No results found.</p>
  ) : (
    <Table
      dataSource={filteredPosts}
      columns={columns}
      pagination={false}
      scroll={{ x: 'max-content' }}
      className="custom-table"
      onRow={(record) => ({
        onClick: () => {
          fetch(record.id); 
        },
      })}
    />
  )}
</div>





      



<Modal
  visible={selectedPost !== null}
  onCancel={() => setSelectedPost(null)}
  footer={null}
  centered 
 
>
  {selectedPost !== null && (
    <div className="modal-content">
      
  

<div className="modal-header">
        <h3>View Task:</h3>
        <Button className="delete-button" onClick={() => handleDelete(selectedPost.id)}>
        <DeleteOutlined />  Delete Opeartion
        </Button>
      </div>
     
      <div className="modal-data">
        <div className="modal-values">
          <p><strong>Title</strong></p>
          <p><strong>Start Date</strong></p>
          <p><strong>End Date</strong></p>
          <p><strong>Time Limit</strong></p>
          <p><strong>Site Link</strong></p>
          <p><strong>Description</strong></p>
          <p><strong>Remarks</strong></p>
          <p><strong>Need Proof</strong></p>
          <p><strong>Site Link Hidden  </strong></p>
          <p><strong>Time Limit</strong></p>

        
        </div>
        <div className="modal-values">
          <p> :    {selectedPost.title}          </p>
          <p> :    {selectedPost.startDate}      </p>
          <p> :    {selectedPost.endDate}        </p>
          <p> :    {selectedPost.timeLimitValue} </p>
          <p> :    {selectedPost.siteLink}       </p>
          <p> :    {selectedPost.description}    </p>
          <p> :    {selectedPost.remarks}        </p>
          <p> :    {selectedPost.needProof}      </p>
          <p> :    {selectedPost.siteLinkHidden} </p>
          <p> :    {selectedPost.hasTimeLimit}   </p>
        </div>
      </div>
    </div>
  )}
</Modal>




      </Content>

    </div>
  );
};


export default MainContent;

































































  // const handleDelete = async (postId) => {
  //   try {
  //     await axios.delete(`http://localhost:3000/posts/${postId}`);
  //     fetchPosts(); // Refresh the posts after deletion
  //   } catch (error) {
  //     console.error('Error deleting post:', error);
  //   }
  // };

 // const handleSearch = (value) => {
  //   setSearchText(value);
  // };


  
  // const handleSearch = async (value) => {
  //   setSearchText(value);
  
  //   try {
  //     const response = await axios.get(`http://localhost:3000/posts/search/${value}`);
  //     setPosts(response.data.post ? [response.data.post] : []);
  //     console.log('set posts',setPosts)
  //   } catch (error) {
  //     console.error('Error fetching posts:', error);
  //   }
  // };




//         {/* <div className="heading-container ">
        
      
//  <Table
//   dataSource={filteredPosts}
//   columns={columns}
//   pagination={false}
//   scroll={{ x: 'max-content' }}
//   className="custom-table"
//   onRow={(record) => ({
//     onClick: () => {
//       fetch(record.id); 
//     },
  
//   })}

 
// />   
// </div> */}

  // {/* <Table dataSource={filteredPosts} columns={columns} 
  //           pagination={false} scroll={{ x: 'max-content' }} 
  //           className="custom-table"
  //         /> */}


      // {/* <h3>View Task: </h3>
      // <Button  onClick={() => handleDelete(selectedPost.id)}>
      //       Delete
      //     </Button> */}


      
//         {/* <Modal
       
//   visible={selectedPost !== null}
//   onCancel={() => setSelectedPost(null)}
//   footer={null}
 

 
// >
//   {selectedPost !== null && (
//     <div >
//       <h3>View Task:</h3>
    
//  <div className="modal-data">
//         <div className="modal-values">
//           <p><strong>Title</strong>        :  {selectedPost.title}</p>
//           <p><strong>Start Date</strong>   :  {selectedPost.startDate}</p>
//           <p><strong>End Date</strong>     :  {selectedPost.endDate}</p>
//           <p><strong>Time Limit</strong>   :  {selectedPost.timeLimitValue}</p>
//           <p><strong>Site Link</strong>    : {selectedPost.siteLink}</p>
//           <p><strong>Description</strong>  : {selectedPost.description}</p>
//           <p><strong>Remarks</strong>      :  {selectedPost.remarks}</p>
//           <p><strong>Need Proof</strong>   : {selectedPost.needProof}</p>
//     <p><strong>Site Link Hidden</strong>   : {selectedPost.siteLinkHidden}</p>
//           <p><strong>Time Limit</strong>   :  {selectedPost.hasTimeLimit}</p>
//         </div>
//       </div>
    
//     </div>
//   )}
// </Modal>  
//  */}

