import React,{Component} from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Header from './Components/Header/Header';
import Signin from './Components/Signin/Signin';
import Registration from './Components/Registration/Registration';
import Logo from './Components/Logo/Logo';
import Rank from './Components/Rank/Rank';
import InputForm from './Components/InputForm/InputForm';
import InputImage from './Components/InputImage/InputImage';

const app = new Clarifai.App({
  apiKey: '2a8ca79659244665ae8fc31213770e6a'
});

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    shape: {
      type: 'circle'
    },
    size: {
      value: 3
    },
    line_linked: {
      enable_auto: true,
      distance: 200,
      opacity: 0.7
    },
    move: {
      speed: 6,
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

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedin: false
    }
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
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayBox(this.calculateFaceBox(response)))
      .catch(err => console.log(err))
  }

  changeRoute = (route) => {
    this.setState({ route: route });
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
        { this.state.route === 'signin'               // if(condition)
        ? <Signin changeRoute={this.changeRoute} />   // ? means true
        : (                                           // : means else
            this.state.route === 'register'            
            ? <Registration changeRoute={this.changeRoute}  />
            : <div>
                <Logo />
                <Rank />
                <InputForm inputOnChange={this.inputOnChange} btnOnClick={this.btnOnClick} />
                <InputImage imageURL={this.state.imageUrl} box={this.state.box} />
              </div>
          )
        }
      </div>
    )
  }
}

export default App;