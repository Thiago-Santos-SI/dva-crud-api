import React from "react";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { connect } from "dva";

class RegistrationPostForm extends React.Component {

  state = {};

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll(( err, values ) => {
      if (!err) {
        //console.log("Received values of form: ", values);
        this.props.dispatch({
          type: "postsAPI/postItem",
          payload: values,
        });
        console.log(values)

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 20 },
        sm: { span: 4

        }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 20,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please input a UserID"
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="body">
          {getFieldDecorator("body", {
            rules: [
              {
                required: true,
                message: "Please input a title!",
                whitespace: true
              }
            ]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>

          <Button type="primary" htmlType="submit">
            Register
          </Button>


        </Form.Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create({ name: "register" })(
  RegistrationPostForm
);

const mapStateToProps = state =>{
  return{
    postItem:state.posts.postItem,
    currentItems:state.posts.items
  }
}
export default connect(mapStateToProps)(WrappedForm);
