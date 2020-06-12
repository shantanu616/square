import React from 'react';
import Authentication from './Authentication';
import routes from './routes';
import SearchComponent from '../../Component/searchcomponent';
import {Link} from 'react-router-dom';
import {GETRECRUITERJOBS} from '../../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../../Component/Loader/main_loader';
class Home extends React.Component
{
	state={jobList:[],isLoading:false,loading_msg:'Please Wait',categoryList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
	componentDidMount()
	{
		this.getData(1,'')
	}
	getData=(page,keyword)=>{
	    axios.post(`${GETRECRUITERJOBS}?page=${page}`,{
	    	'searchKeyword':keyword
	    },this.props.HEADER).then((res)=>{
	        if(res.data.success==1)
	        {
	          var response=res.data.data;
	          this.setState({currentPage:response.current_page,jobList:response.data,total:response.total});
	          setTimeout(()=>this.setState({isLoading:true}),1000)
	        }
	    }).catch((error)=>{

	    })
  	}
	render()
	{
		const {jobList,isLoading,loading_msg,total}=this.state
		if(isLoading)
		{
			return(<section class="wrapper">
				   <div class="container">
					<div class="d-flex flex-column justify-content-between">
						<div class="row mt-3 d-flex justify-content-end">
						<SearchComponent getData={this.getData} class="mr-3" currentPage={this.state.currentPage} placeholder="Search Jobs"/>
						<Link to="/recruiter/createjob" class="btn btn-primary float-right">Create Job</Link></div>
						<div class="row mt-3 p-2" style={{}}>
							{jobList.length==0 && <div class="col-lg-4 d-flex align-items-stretch p-2">No Jobs Created Yet</div>}
				            {jobList.length>0 && jobList.map((res,key)=>{
				                return(
				                <div class="col-lg-4 d-flex align-items-stretch p-2" key={key}>
				                 <div class="card">
				                    <div class="card-body">
				                        <h5 class="card-title">{res.title}</h5>
				                        <p class="card-text">{res.description}</p>
				                	</div>
				               		<div class="card-footer">
					                     <p class="font-weight-bold">Salary:<span class="label label-default "><i class="fa fa-rupee"></i>{res.salary}</span></p>
					                     <Link to={`/recruiter/jobstatus/${res.id}`} class="btn btn-primary">Check Applications</Link>
				                    </div>
				                </div>
				            </div>)
			            })}
        				</div>
        			</div>
        			  {total>1 && <div class="float-right mt-3"><Pagination
	                    activePage={this.state.currentPage}
	                    itemsCountPerPage={this.state.itemsCountPerPage}
	                    totalItemsCount={this.state.total}
	                    pageRangeDisplayed={this.state.pageRangeDisplayed}
	                    onChange={this.getData}
	                    itemClass='page-item'
	                    linkClass="page-link bold"
		                 /></div>}
          	 	</div>
          	 </section>)
		}
		else
		{
			 return(<Loader message={loading_msg}/>)
		}
		
	}
}
export default Authentication(Home)