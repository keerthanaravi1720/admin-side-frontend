


import React, { useState } from 'react';
import { Input, Button, message, Layout, Card, DatePicker, Select } from 'antd';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import './Update.css'

const { Content } = Layout;


const UpdatePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const postData = location.state?.postData || {};

 
const initialData = {
    id: postData.id,
    title: postData.title || '',
   
  };
 
  const [updatedData, setUpdatedData] = useState(initialData);

  const handleInputChange = (fieldName, value) => {
    setUpdatedData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

 


const handleUpdate = async () => {
    try {
      // Convert dates to ISO format before sending to backend
      const isoStartDate = toISODate(updatedData.startDate);
      const isoEndDate = toISODate(updatedData.endDate);

      // Construct updatedData object with the converted dates
      const updatedDataWithISO = {
        ...updatedData,
        startDate: isoStartDate,
        endDate: isoEndDate,
        timeLimitValue: `${updatedData.timeLimitValue} hours`, // Add " hours" string
      };

      await axios.put(`http://localhost:3000/posts/${updatedDataWithISO.id}`, updatedDataWithISO);
      message.success('Post updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating post:', error);
      message.error('An error occurred while updating the post');
    }
  };

  function toISODate(dateString) {
    return moment(dateString, 'DD/MM/YYYY').format('YYYY-MM-DD');
  }


  const handleCancel = () => {
    setUpdatedData(initialData); // Reset input fields to initial values
  };

  
  return (


<Content
className="site-layout-background"
style={{
  padding: '24px',
  margin: 0,
  minHeight: '100vh',
}}
>
    <div>
      <h3>Update Task</h3>
      <div className='cont'>
      <div>
        <label className='label'>Title:</label>
        <Input 
          value={updatedData.title}
          onChange={(e) => handleInputChange('title', e.target.value)}
        />
          
       

<label>Start Date:</label>
<DatePicker
  value={updatedData.startDate ? moment(updatedData.startDate, 'DD/MM/YYYY') : null}
  onChange={(date, dateString) => handleInputChange('startDate', dateString)}
  format="DD/MM/YYYY"
/>


<label>End Date:</label>


<DatePicker
  value={updatedData.endDate ? moment(updatedData.endDate, 'DD/MM/YYYY') : null}
  onChange={(date, dateString) => handleInputChange('endDate', dateString)}
  format="DD/MM/YYYY"
/>


       
  </div>








<div style={{ marginTop: 50 }}>
  <label>Time Limit:</label>
  <Select
   className='select'
    value={updatedData.timeLimitValue}
    onChange={(value) => handleInputChange('timeLimitValue', value)}
  >
    <Select.Option value="1">1 hours</Select.Option>
    <Select.Option value="2">2 hours</Select.Option>
    <Select.Option value="3">3 hours</Select.Option>
    <Select.Option value="4">4 hours</Select.Option>
    <Select.Option value="5">5 hours</Select.Option>
    <Select.Option value="6">6 hours</Select.Option>
    <Select.Option value="7">7 hours</Select.Option>
    <Select.Option value="8">8 hours</Select.Option>
    <Select.Option value="9">9 hours</Select.Option>
    <Select.Option value="10">10 hours</Select.Option>
    </Select>  
 

     
      <label>Site Link:</label>
          <Input  className='site'
          value={updatedData.siteLink}
          onChange={(e) => handleInputChange('siteLink', e.target.value)}
        />

<label>description:</label>
          <Input   className='des'
          value={updatedData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
        />

<label>remarks:</label>
          <Input   className='re'
          value={updatedData.remarks}
          onChange={(e) => handleInputChange('remarks', e.target.value)}
        />
</div>
       
     
 
  

<Card  className='cardd'>
  <div  >
        <label>Need Proof :</label>
        <input style={{marginLeft: 50}}
          type="checkbox"
          checked={updatedData.needProof}
          onChange={(e) => handleInputChange('needProof', e.target.checked)}
        />
      </div>
      
      <div>
        <label> Time Limit :</label>
        <input  style={{marginLeft: 56}}
          type="checkbox"
          checked={updatedData.hasTimeLimit}
          onChange={(e) => handleInputChange('hasTimeLimit', e.target.checked)}
        />
      </div>
      
      <div>
        <label>Site Link Hidden :</label>
        <input  style={{marginLeft: 20}}
          type="checkbox"
          checked={updatedData.siteLinkHidden}
          onChange={(e) => handleInputChange('siteLinkHidden', e.target.checked)}
        />
      </div>
      </Card>
      </div>

  

      <Button className='top' onClick={handleUpdate}
      style={{marginLeft:'350px', marginTop: 60}} classNames="but">Update</Button>
  
    <Button className='cancel' style={{marginLeft: 20}} 
    onClick={handleCancel}>Cancel</Button>





   
 
</div>

    </Content>
  
    
  );
};

export default UpdatePage;


  