
import React, { useState } from 'react';
import { Layout, Form, Input, Button,  DatePicker,  Select, Card, Switch, message,  } from 'antd';
import axios from 'axios';
import './Crud.css'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const { Content } = Layout;

const { Option } = Select;

const timeOptions = [
  '1 hours',
  '2 hours',
  '3 hours',
  '4 hours',
  '5 hours',
  '6 hours',
  '7 hours',
  '8 hours',
  '9 hours',
  '10 hours',
  // Add more options as needed
];

const MainContent = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
  const [needProof, setNeedProof] = useState(false);
  const [siteLinkHidden, setSiteLinkHidden] = useState(false);
  const [hasTimeLimit, setHasTimeLimit] = useState(false);

 
  const handleCreate = async (values) => {
    try {
      setLoading(true);

      // Convert date strings to ISO format using Moment.js
      values.startDate = moment(values.startDate).format('YYYY-MM-DD');
      values.endDate = moment(values.endDate).format('YYYY-MM-DD');
    
     
      // Send the POST request using Axios
     const response= await axios.post('http://localhost:3000/posts', values);
      console.log("rsp",response);
      if(response.status===200){
        message.success("Created Sucessfully");
       navigate("/");
      }
      setLoading(false);
      form.resetFields();
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
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
<h3>Create Tasks</h3>
<div className="input-container" style={{ maxWidth: '900px', margin: '0 auto', overflow: 'auto' }}>


<Form
  form={form}
  onFinish={handleCreate}
  labelCol={{ span: 8 }}
  wrapperCol={{ span: 8 }}
>   
       <div className="input-row">
         <div className="input-field">
         <label style={{color:'#363636'}}>Title:</label>
  <Form.Item  name="title" rules={[{ required: true, message: 'Please input a title' }]}>
    <Input />
  </Form.Item>
  </div>
  <div className="input-field">
  <label style={{color:'#363636'}}>Start Date:</label>
   <Form.Item  name="startDate" rules={[{ required: true, message: 'Please input a start date' }]}>
  <DatePicker format="DD/MM/YYYY" />
 
  </Form.Item> 

  </div>
  <div className="input-field">
  <label style={{color:'#363636'}}>End Date</label>
  <Form.Item name="endDate" rules={[{ required: true, message: 'Please input an end date' }]}>
  <DatePicker format="DD/MM/YYYY" />

  </Form.Item> 

  </div>
  </div>
  <div className="input-row">

  <div className="input-field">
  <label style={{color:'#363636'}}>Site Link</label>
  <Form.Item  name="siteLink" rules={[{ required: true, message: 'Please input a site link' }]}
  >
    <Input  placeholder='www.test.com'/>
  </Form.Item>
  </div>
  


        
<div className="input-row">
            <div className="input-field">
              <label style={{color:'#363636'}}>Time Limit</label>
              <Form.Item
                name="timeLimitValue"
                rules={[{ required: true, message: 'Please select a time limit' }]}
              >
                <Select placeholder="Select a time limit" style={{width:'170px', 
                marginTop:'28px'}}>
                  {timeOptions.map(option => (
                    <Option key={option} value={option}>
                      {option}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </div>

 
  <div className="input-field">
 
  <label>Description</label>
  <Form.Item  name="description" rules={[{ required: true, message: 'Please input a description' }]}>
    <Input style={{height:'80px'}} />
  </Form.Item>
  </div>
 
  <div className="input-field">
  <label>Remarks</label>
  <Form.Item  name="remarks" rules={[{ required: true, message: 'Please input remarks' }]}>
    <Input  style={{height:'80px'}} />
  </Form.Item>
  </div>
  </div>




<Card style={{ width: '250px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
       

<div className="input-field" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div className="toggle-container">
            <div className="toggle-label">Time Limit</div>
          </div>
          <div className="toggle-switch">
            <Form.Item name="hasTimeLimit" valuePropName="checked">
              <Switch
                className="custom-switch"
                checked={hasTimeLimit}
                onChange={(checked) => setHasTimeLimit(checked)}
                style={{ backgroundColor: hasTimeLimit ? '#13A487' : '#D6DBE7' }}
              />
            </Form.Item>
          </div>
        </div>


        
        <div className="input-field" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div className="toggle-container">
            <div className="toggle-label">Need Proof</div>
          </div>
          <div className="toggle-switch">
            <Form.Item name="needProof" valuePropName="checked">
              <Switch
                className="custom-switch"
                checked={needProof}
                onChange={(checked) => setNeedProof(checked)}
                style={{ backgroundColor: needProof ? '#13A487' : '#D6DBE7' }}
              />
            </Form.Item>
          </div>
        </div>


        <div className="input-field" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <div className="toggle-container">
            <div className="toggle-label">Site Link Hidden</div>
          </div>
          <div className="toggle-switch">
            <Form.Item name="siteLinkHidden" valuePropName="checked">
              <Switch
                className="custom-switch"
                checked={siteLinkHidden}
                onChange={(checked) => setSiteLinkHidden(checked)}
                style={{ backgroundColor: siteLinkHidden ? '#13A487' : '#D6DBE7' }}
              />
            </Form.Item>
          </div>
        </div>


       
      </Card>


   
  <Form.Item wrapperCol={{ span: 16, offset: 10 }} className='ton'>
    <Button  htmlType="submit" loading={loading} className='top'>
      Create
    </Button>

    <Button onClick={() => form.resetFields()} className='cancel' style={{ marginLeft: 24 }}>
    Cancel
  </Button>
  </Form.Item>
  
</Form>
</div>

{/* <div style={{color: 'greenyellow'}}>Home</div> */}
</Content>
  );
};

export default MainContent;



