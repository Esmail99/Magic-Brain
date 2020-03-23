import React,{Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Header from './Components/Header/Header';
import Signin from './Components/Signin/Signin';
import Registration from './Components/Registration/Registration';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import InputForm from './Components/InputForm/InputForm';
import InputImage from './Components/InputImage/InputImage';
import Hints from './Components/Hints/Hints';

const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: 2
    },
    line_linked: {
      enable_auto: true,
      distance: 180,
      opacity: 0.5
    },
    move: {
      speed: 3,
      out_mode: 'out'
    }
  },
  interactivity: {
    detect_on: "window",
    events: {
      onhover: {
        enable: true,
        mode: 'repulse'
      }
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedin: false,
  userCanUseIt: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
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

  calculateFaceBox = (response) => {
    const boxBorders = response.outputs[0].data.regions[0].region_info.bounding_box;
    const inputImg = document.getElementById('inputImg');
    const width = Number(inputImg.width);
    const height = Number(inputImg.height);
    return{
      left: boxBorders.left_col * width,
      top: boxBorders.top_row * height,
      right: width-(boxBorders.right_col * width),
      bottom: height-(boxBorders.bottom_row * height)
    }
  }

  displayBox = (bordersObj) =>{
    this.setState({box: bordersObj})
  }

  inputOnChange = (event) => {
    this.setState({input: event.target.value});
  }

  btnOnClick = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://evening-savannah-93967.herokuapp.com/imageurl/',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response => {
      if(response.outputs[0].id)    // to make sure it responded with data not error!
      {
        fetch('https://evening-savannah-93967.herokuapp.com/image/',{
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(data => {
          this.setState({userCanUseIt: true});
          this.setState(Object.assign(this.state.user,{ entries: data }));
          //Object.assign instead of setState to update only the entries and leave everything else as it is..
        })
      }
      this.displayBox(this.calculateFaceBox(response));
      this.setState({input: ''});
    })
    .catch(err => console.log(err))
  }

  changeRoute = (route) => {
    this.setState({ route: route });
    if(route === 'signin')
      this.setState(initialState)
    if(route === 'home')
      this.setState({ isSignedin: true });
    else{
      this.setState({ isSignedin: false });
    }
  }
  
  render() {
    return(
      <div className='App'>
        <Particles className='particles' params={particlesOptions} />
        <Header changeRoute={this.changeRoute} isSignedin={this.state.isSignedin} />
        { this.state.route === 'signin'                                         // if(condition)
        ? <Signin loadUser={this.loadUser} changeRoute={this.changeRoute} />    // ? means true
        : (                                                                     // : means else
            this.state.route === 'register'            
            ? <Registration loadUser={this.loadUser} changeRoute={this.changeRoute}  />
            : <div>
                <Logo />
                <Rank name={this.state.user.name} entries={this.state.user.entries} />
                <InputForm inputOnChange={this.inputOnChange} btnOnClick={this.btnOnClick} />
                <InputImage imageURL={this.state.imageUrl} box={this.state.box} />
                {
                  this.state.userCanUseIt === false
                  ? <Hints></Hints> 
                  : <span></span>
                }
              </div>
          )
        }
      </div>
    )
  }
}

export default App;