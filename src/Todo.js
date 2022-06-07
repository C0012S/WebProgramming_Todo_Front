import { ListItem, ListItemText, InputBase, Checkbox,
    ListItemSecondaryAction, IconButton } from "@material-ui/core";
import React from 'react';
import DeleteOutlined from "@material-ui/icons/DeleteOutlined";

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: props.item, readOnly: true };
        this.delete = props.delete;
        this.update = props.update;
    }

    offReadOnlyMode = () => {
        console.log("Event!", this.state.readOnly);
        this.setState({readOnly: false}, () => {
            console.log("ReadOnly?", this.state.readOnly);
        });
    };

    enterKeyEventHandler = (e) => {
        if(e.key === "Enter") {
            this.setState({readOnly:true});
            this.update(this.state.item);
        }
    };

    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({item:thisItem});
    };

    deleteEventHandler = () => {
        this.delete(this.state.item);
    };

    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        console.log(thisItem.done);
        this.setState({ item: thisItem });
        this.update(this.state.item);
    }

    render() { //Todo가 정의하는 User Interface
        const item = this.state.item;

        return (
            <ListItem>
                <Checkbox checked={item.done} onChange={this.checkboxEventHandler} />
                <ListItemText>
                    <InputBase
                        inputProps = {{ 
                            "aria-label": "naked",
                            readOnly: this.state.readOnly,
                        }}
                        onClick={this.offReadOnlyMode}
                        onKeyPress={this.enterKeyEventHandler}
                        onChange={this.editEventHandler}
                        type = "text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    ></InputBase>
                </ListItemText>
                <ListItemSecondaryAction>
                    <IconButton 
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
/*  //2022.04.06.수 - 0323 보강
        return (
        <div className="Todo">
            <input 
                type="checkbox" 
                id={this.state.item.id} 
                name={this.state.item.id} 
                checked={this.state.item.done}
            ></input>
            <label id={this.state.item.id}>{this.state.item.title}</label>
        </div>
//        <div></div> //return 해 줄 때는 부모가 하나여야 한다. 이렇게 2 개는 안 된다. 부모 하나 안에 넣어 주는 것은 가능하다.
        );
*/
    }
}

export default Todo; //export : 다른 곳에 사용하게 해 준다.