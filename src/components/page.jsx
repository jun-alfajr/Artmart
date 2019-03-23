import React, {Component} from 'react';
import {Jumbotron, Container} from 'react-bootstrap';
import SignUp from './sign-up.jsx';
import LogIn from './log-in.jsx';


class Page extends Component{

    render(){
        let page = this.props.match.params.page;

        switch(this.props.match.params.page){
            case "sign-up":
                page = <SignUp/>
                break;
            case "log-in":
                page = <LogIn/>
                break;
            default:
                page = this.props.params.page
                break;
        }

        return(
            <div>
                <Jumbotron fluid>
                    <Container>
                        <h1>{(this.props.match.params.page[0].toUpperCase() + this.props.match.params.page.slice(1)).replace("-"," ")}</h1>
                    </Container>
                </Jumbotron>
                <Container className="mb-4">
                    {page}
                </Container>
                <hr></hr>
            </div>
        )
    }
}

export default Page;