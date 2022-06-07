import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core"

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: {title: "" } }; // 사용자의 입력을 저장할 오브젝트
        this.add = props.add;
    }

    onInputChange = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log(thisItem);
    } // 키보드 입력될 때마다 실행

    onButtonClick = () => {
        this.add(this.state.item);
        this.setState({ item: { title:"" } });
    }

    enterKeyEventHandler = (e) => {
        if(e.key === 'Enter') { //동일한지 검사할 때 = 3 개
            this.onButtonClick();
        }
    };

    render() {
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField 
                            placeholder="Add Todo here" 
                            fullWidth
                            onChange={this.onInputChange}
                            onKeyPress = {this.enterKeyEventHandler}
                            value = {this.state.item.title} />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button fullWidth color="secondary" variant="contained"
                            onClick = {this.onButtonClick}>
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;