import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, 
    Button,Modal, ModalHeader, ModalBody, FormGroup, Label} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.toggleModal = this.toggleModal.bind(this);
      this.state = {
        isModalOpen: false
      };
    }
  
    toggleModal() {
      this.setState({
        isModalOpen: !this.state.isModalOpen
      });
    }
  
    handleSubmit(values) {
      this.toggleModal();
      this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
  }
  
    render() {
      return (
        <div>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg" /> Submit Comment
          </Button>
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
            <ModalHeader toggle={this.toggleModal}>Submit comment</ModalHeader>
            <ModalBody>
              <LocalForm onSubmit={values => this.handleSubmit(values)}>
                <FormGroup>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    type="select"
                    model=".rating"
                    name="rating"
                    id="rating"
                    className="form-control"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </Control.select>
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    name="author"
                    id="author"
                    model=".author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(2),
                      maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less"
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="text">Comment</Label>
                  <Control.textarea
                    rows="6"
                    name="text"
                    id="text"
                    model=".text"
                    className="form-control"
                  />
                </FormGroup>
                <Button color="primary" type="submit">
                  Submit
                </Button>
              </LocalForm>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

  function RenderCampsite({campsite}) {
    return (
        <div className="col-md-5 m-1">
        <Card>
            <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
            <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );
}


function RenderComments({comments, postComment, campsiteId}) {
    if(comments){
        return (
            <div className="col-md-5 m-1">
                <h4>comments</h4>
                {
                    comments.map( comment => {
                        return (
                            <div key={comment.id}>
                            <p>
                                {comment.text}
                            <br/>
                                {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>    
                        )
                    })
                }
                 <CommentForm campsiteId={campsiteId} postComment={postComment} /> 
            </div>
        )
    }
}

function CampsiteInfo(props) {
  if (props.isLoading) {
      return (
          <div className="container">
              <div className="row">
                  <Loading />
              </div>
          </div>
      );
  }
  if (props.errMess) {
      return (
          <div className="container">
              <div className="row">
                  <div className="col">
                      <h4>{props.errMess}</h4>
                  </div>
              </div>
          </div>
      );
  }
  if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments
                        comments={props.comments}
                        postComment={props.postComment}
                        campsiteId={props.campsite.id}
                    />
                </div>
            </div>
        );
    }
    return (<div />)
}


export default CampsiteInfo;