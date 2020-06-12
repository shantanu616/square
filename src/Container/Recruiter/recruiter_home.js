import React from 'react';
import Authentication from './Authentication';
import Header from './Component/header';
import routes from './routes';
import Footer from '../../Component/footer';
import Parent from '../../Component/Parent'
import {Switch,Route} from 'react-router-dom';
import LoadingGif from '../../Component/Loader/main_loader';
class RecruiterHome extends React.Component
{
	state={isLoading:false,loading_msg:'Please Wait'}
	componentDidMount()
	{	
		setTimeout(()=>{this.setState({isLoading:true})},1000)
	}
	render()
	{
		const {isLoading,loading_msg}=this.state;
		if(isLoading)
		{
		return(<Parent>
	          <Header {...this.props} />
	          <Switch>
	            {routes.map((route,idx)=>{
	              return(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
	                    <route.component {...props} {...this.props} />
	                  )} />)
	                  : (null))
	            })}
	          </Switch>  
	          <Footer/>
          </Parent>)
        }
        else
        {
        	return(<LoadingGif message={loading_msg}/>)
        }
	}
}
export default Authentication(RecruiterHome)