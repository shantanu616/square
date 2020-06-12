import React from 'react';
import {Link} from 'react-router-dom';
const Header=()=>
{
   return(
        <header>
            <div class="shadow-sm ">
                <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'rgb(240, 245, 251)'}}>
                  <a class="navbar-brand" href="#"><img src="images/logo.png" width="40" height="40" alt=""/></a>
                  {/*<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>*/}
                </nav>
            </div>
        </header>)
}
export default Header