import React from 'react';
import './App.css';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Form, Input, Button, Table,Divider } from 'antd';
import { Query, Mutation } from 'react-apollo'
import { GETLIST,GETUSER, create_user,update_user,delete_user } from './model/index'

const client = new ApolloClient({
  uri: 'http://localhost:8001/graphql'
})

const columns = [
  {
    title: "ID",
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: "姓名",
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: "年龄",
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: "操作",
    key: "action",
    render: (text, row) => (
      <span>
        <Button type="link">添加</Button>
        <Divider type="vertical" />
        <Button type="link">修改</Button>
        <Divider type="vertical" />
        <Mutation mutation={delete_user} 
          update = {(cache,{data: {deleteUser} }) => {
            const { getList } = cache.readQuery({query: GETLIST})
            const idx = getList.findIndex(item => item.id === deleteUser.id)
            cache.writeQuery({
              query: GETLIST,
              data: {getList: getList.splice(idx,1)}
            })
          }}
        >
          {(deleteUser, {data}) => (
            <Button type="link" onClick={e => deleteUser({variables: {id: row.id}})}>删除</Button>
          )}
        </Mutation>
      </span>
    )
  }
]

class App extends React.Component {

  onSubmit(e,method, name, age) {
    e.preventDefault();
    method({variables: {name,age} })
  }
  render() {
    const { getFieldDecorator,getFieldValue } = this.props.form;
    const inputNameVal = getFieldValue('name')
    const inputAgeVal = parseInt(getFieldValue('age'))
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <div className="form-area">
            <Mutation 
              mutation={create_user}
              update={(cache, { data: { createUser } }) => {
                const { getList } = cache.readQuery({query: GETLIST})
                cache.writeQuery({
                  query: GETLIST,
                  data: {getList: getList.concat([createUser])}
                })
              }}
            >
              {(createUser) => (
              <Form layout="inline"  onSubmit={e => this.onSubmit(e,createUser,inputNameVal,inputAgeVal)}>
                <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input placeholder="请输入用户名"/>,
                )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('age')(
                    <Input placeholder="请输入年龄" type="number"/>
                  )}
                </Form.Item>
              <Form.Item>
                <Button htmlType="submit" type="primary">确认</Button>
                <Button htmlType="reset">重置</Button>
              </Form.Item>
              </Form>
              )}
            </Mutation>
          </div>
          <div className="table-area">
            <Query query={GETLIST}>
            {({ loading, error, data }) => {
              return <Table dataSource={data.getList} rowKey="id" columns={columns}></Table>
            }}
            </Query>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(App);

export default WrappedNormalLoginForm;
