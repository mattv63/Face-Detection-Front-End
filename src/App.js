import React, {Component} from 'react';
import Navigation from './Components/Navigation/Navigation';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import './App.css';
import Particles from 'react-particles-js';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';
import LeaderBoard from './Components/LeaderBoard/LeaderBoard';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}
const initialState = {
  input: ' ',
  imageUrl: ' ',
  box: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: '',
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ' ',
      imageUrl: ' ',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: '',
        joined: ''
      },
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {

    console.log('HELLO');
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  displayFaceBox = (newEntry) => {
    let newBox = this.state.box.slice(0);
    newBox.push(newEntry);
    console.log(newBox);
    this.setState({box: newBox});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    let myNode = document.getElementById("boxy");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
    this.setState({imageUrl: this.state.input});
      fetch('https://rocky-refuge-82156.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response){
          fetch('https://rocky-refuge-82156.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
              entry_count: response.outputs[0].data.regions.length
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, {entries: count}))
            })
            .catch(console.log)
        }
        let x = response.outputs[0].data.regions;
        let i = 0;
        console.log(response);
        for (i; i < x.length; i++){
          this.displayFaceBox(this.calculateFaceLocation(x[i]));
        }
        console.log(this.state.box);
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout'){
      this.setState(initialState)
    } else if (route==='home'){
      this.setState({isSignedIn: true, imageUrl: ''})
    } 
    this.setState({route: route});
  }


  render(){
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation route={route} onRouteChange={this.onRouteChange}/>
         { route === 'home'
          ? <div> 
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
              <FaceRecognition box={box} imageUrl={imageUrl}/>
            </div>
          : (
            route === 'signin' || route ==='signout' 
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : (
              route ==='leaderboard'
              ? <LeaderBoard />
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            ) )
        }
        </div>
    );
  }
}
export default App;
