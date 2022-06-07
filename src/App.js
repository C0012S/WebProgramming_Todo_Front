import React from 'react';
import './App.css';
import Todo from './Todo'
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import AddTodo from "./AddTodo.js";
import { call, signout } from './service/ApiService';

class App extends React.Component { //부모 컴포넌트 - 자식 컴포넌트 : <Todo />
  constructor(props) {
    super(props);
    this.state = {
      items: [ ],
      // (1) 로딩 중이라는 상태를 표현할 변수 생성자에 상태 변수를 추가한다.
      loading: true,
    };
  }

  componentDidMount() {
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );

/*    
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:8080/todo", requestOptions)
      .then((r) => r.json())
      .then((r) => {
        console.log(r.data);
        this.setState( {items: r.data} )
      });

      // ... ...
*/      
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
/*
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    thisItems.push(item);
    this.setState({ items: thisItems });
    console.log("items : ", this.state.items);
*/    
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
/*    
    const thisItems = this.state.items;
    console.log("Before delete Items : ", this.state.items)

    const newItems = thisItems.filter(e => e.id !== item.id);

    this.setState({ items: newItems }, () => {
      //디버깅 콜백
      console.log("After delete Items : ", this.state.items);
    });
*/    
  };

  update = (item) => {
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    // <Todo> 컴포넌트 배열
    var todoItems = this.state.items.length > 0 && (
      <Paper>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete} update={this.update} />
          ))}
        </List>
      </Paper>
    );

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant="h6">오늘의 할일</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={ signout }>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // 로딩 중이 아닐 때 렌더링할 부분
    var todoListPage = (
      <div>
        { navigationBar } {/* 내비게이션 바 렌더링 */}
        <Container maxWidth="md">
          <AddTodo add={ this.add } />
          <div className="TodoList">{ todoItems }</div>
        </Container>
      </div>
    );

    // 로딩 중일 때 렌더링할 부분
    var loadingPage = <h1> 로딩 중... </h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      // 로딩 중이 아니면 todoListPage를 선택
      content = todoListPage;
    }

//    return <div className="App">{todoItems}</div>;

/*  //2022.04.06.수 - 0323 보강
    // <Todo> 컴포넌트 배열 
    var todoItems = this.state.items.map((item, idx) => (
      <Todo item={item} key={item.id} />
    ));

    return <div className="App">{todoItems}</div>;
*/    

//    return (
//      <div className="App">
{/*        { navigationBar }
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>;
        </Container>
      </div>
    );
*/}    
    // 2022.05.16.월 - 선택한 content 렌더링
    return <div className="App">{ content }</div>;
  }
}
//App 컴포넌트는 Todo 컴포넌트를 자식 컴포넌트로 생성하는데, 그때 item에 위의 item의 객체를 담아서 보내 주면 Todo가 전달받은 후에, 그걸 가지고 이용한다.
//주목해서 봐야 될 건, 부모와 자식 컴포넌트 둘이 어떻게 데이터를 전달해 주고 전달받는지 하고, 이때 state 변수가 어떻게 사용되는지를 보면 된다.

export default App;
