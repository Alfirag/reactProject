class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        bootcampName: "Nucamp"
      };
    }
    render() {
      return (
        <Welcome bootcampName={this.state.bootcampName} />
      );
    }
  }
  function Welcome({bootcampName}) {
    return (
      <h1>Welcome to {bootcampName}!</h1>
    );
  }
  ReactDOM.render(<App />, document.getElementById('root'));
 